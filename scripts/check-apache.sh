#!/usr/bin/env bash
# Sobe dist/ num Apache 2.4 de verdade (Docker) com o public/.htaccess e confere cada pedido
# da tabela (status, destino do redirect, corpo da 404, cache). Rode `yarn build` antes.
# Modo remoto: BASE_URL=https://staging.exemplo.com yarn check:apache pula o Docker e roda a mesma
# tabela nesse host (só GET/HEAD) mais as linhas de HTTPS e www. Nunca aponte para produção.
# dist/ é COPIADO para o contêiner, não montado: o disco do macOS ignora maiúsculas e a produção não.
set -u
cd "$(dirname "$0")/.."

NAME=portfolio-check-apache
PORT=8097
ROOT=/usr/local/apache2
REMOTE=${BASE_URL:+1}
BASE="${BASE_URL:-http://localhost:$PORT}"
BASE="${BASE%/}"

[ -f dist/index.html ] || { echo "dist/index.html não existe: rode 'yarn build' antes." >&2; exit 2; }
cmp -s public/.htaccess dist/.htaccess || { echo "dist/.htaccess difere de public/.htaccess (ou falta): rode 'yarn build'." >&2; exit 2; }
SLUGS=$(ls dist/projetos/*.html | wc -l | tr -d ' ')
[ "$SLUGS" -eq 17 ] || { echo "esperava 17 projetos em dist/projetos, achei $SLUGS" >&2; exit 2; }

TMP=$(mktemp -d)
cleanup() {  [ -n "$REMOTE" ] || docker rm -f "$NAME" >/dev/null 2>&1; rm -rf "$TMP"; }
trap cleanup EXIT
trap 'exit 130' INT TERM

if [ -z "$REMOTE" ]; then
  # Cópia do .htaccess sem o bloco só-produção (HTTPS e www não rodam em http://localhost).
  sed '/^# só-produção: início/,/^# só-produção: fim/d' dist/.htaccess > "$TMP/htaccess"
  if grep -q '%{HTTPS}' "$TMP/htaccess"; then echo "bloco só-produção não foi removido" >&2; exit 2; fi

  docker rm -f "$NAME" >/dev/null 2>&1
  docker run -d --name "$NAME" -p "$PORT:80" httpd:2.4 >/dev/null || exit 2
  docker cp scripts/apache/httpd.conf "$NAME:$ROOT/conf/check.conf" || exit 2
  docker exec "$NAME" sh -c "echo 'Include conf/check.conf' >> $ROOT/conf/httpd.conf" || exit 2
  docker cp dist/. "$NAME:$ROOT/htdocs/" || exit 2
  docker cp "$TMP/htaccess" "$NAME:$ROOT/htdocs/.htaccess" || exit 2
  docker exec "$NAME" httpd -k graceful >/dev/null 2>&1

  # Pronto = a config nova carregou: /index só dá 301 com o mod_rewrite e o .htaccess ativos.
  ready=
  for _ in $(seq 1 40); do
    [ "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/index")" = 301 ] && { ready=1; break; }
    sleep 0.5
  done
  [ -n "$ready" ] || { echo "Apache não carregou as regras (/index não deu 301)" >&2; exit 2; }
fi

FAILS=0
PASSES=0
row() { # $1 pedido, $2 resultado obtido, $3 esperado
  if [ "$2" = "$3" ]; then PASSES=$((PASSES+1)); printf 'ok    %-45s %s\n' "$1" "$2"
  else FAILS=$((FAILS+1)); printf 'FALHA %-45s obtido: %s | esperado: %s\n' "$1" "$2" "$3"; fi
}
# status e destino do redirect (só o caminho), sem seguir redirects
got() { curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$BASE$1" | sed "s#$BASE##; s/ *\$//"; }
# 404 com o HTML de um arquivo de dist/
not_found() { # $1 pedido, $2 arquivo de dist/
  curl -s -o "$TMP/body" -w '%{http_code}' "$BASE$1" > "$TMP/code"
  if cmp -s "$TMP/body" "dist/$2"; then body="corpo=$2"; else body="corpo-diferente-de=$2"; fi
  row "$1" "$(cat "$TMP/code") $body" "404 corpo=$2"
}

for p in / /en /es /sitemap.xml /llms.txt /robots.txt; do row "$p" "$(got "$p")" "200"; done
for f in dist/projetos/*.html; do
  s=$(basename "$f" .html)
  for p in "/projetos/$s" "/en/projects/$s" "/es/proyectos/$s"; do row "$p" "$(got "$p")" "200"; done
done
for p in /projeto-linkeza.html /projetos/linkeza.html /projetos/linkeza/; do row "$p" "$(got "$p")" "301 /projetos/linkeza"; done
for p in /en.html /en/; do row "$p" "$(got "$p")" "301 /en"; done
row /index.html "$(got /index.html)" "301 /"
row /index "$(got /index)" "301 /"
if [ -n "$REMOTE" ]; then
  for p in /en /es; do
    case "$(got "$p")" in "301 $p/") echo "      causa: o servidor ignorou DirectorySlash Off ($p -> $p/)";; esac
  done
fi
for p in /en/?a=1; do row "$p" "$(got "$p")" "301 /en?a=1"; done
row "/projetos/linkeza.html?x=1" "$(got "/projetos/linkeza.html?x=1")" "301 /projetos/linkeza?x=1"
for d in /es/ /projetos/ /en/projects/ /es/proyectos/ /_astro/ /og/; do row "$d" "$(got "$d")" "301 ${d%/}"; done
for d in /_astro /og; do not_found "$d" 404.html; done
not_found /es/proyectos es/404.html
for p in /en/404.html /es/404.html; do row "$p" "$(got "$p")" "200"; done
for p in /404 /en/404; do row "$p" "$(got "$p")" "404"; done
for p in /nada /projetos /projetos/nao-existe /EN; do not_found "$p" 404.html; done
for p in /en/nada /en/projects; do not_found "$p" en/404.html; done
not_found /es/nada es/404.html
row /assets-inexistente.js "$(got /assets-inexistente.js)" "404"
for p in / /curriculo_PedroHenrique.pdf; do
  row "Cache-Control de $p" "$(curl -sI "$BASE$p" | tr -d '\r' | sed -n 's/^[Cc]ache-[Cc]ontrol: //p')" "no-cache"
done

if [ -n "$REMOTE" ]; then
  H=${BASE#*://}
  row "http://$H/" "$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "http://$H/")" "301 https://$H/"
  if curl -s -o /dev/null "https://www.$H/" 2>/dev/null; then
    row "https://www.$H/" "$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "https://www.$H/")" "301 https://$H/"
  else echo "nota: www.$H não resolve; linha do www pulada"; fi
fi
echo "$PASSES ok, $FAILS com falha"
[ "$FAILS" -eq 0 ]
