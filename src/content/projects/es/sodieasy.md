---
summary: "App móvil para cotizar materiales de construcción de Sodimac por ID de producto, con una API en Node.js que obtiene los precios por web scraping."
---

Una aplicación móvil para armar cotizaciones de materiales de construcción con productos disponibles en **Sodimac**.

La aplicación hace solicitudes a una API que hace *web scraping* del sitio de Sodimac a partir del ID del producto, guardando los datos y actualizándolos cuando cambian en el sitio oficial.

El proyecto está pensado para un empleado que ya busca los productos por ID; por eso toda la búsqueda se basa en el ID del producto.

La aplicación está hecha en **React Native** con el framework **Expo**.
