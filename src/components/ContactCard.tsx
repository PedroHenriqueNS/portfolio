import { cn } from "@/lib/utils"
import { Github, Linkedin, Mail, Phone } from "lucide-react"
import { useState } from "react"

interface ContactCardProps {
    logo: "GitHub" | "CellPhone" | "Email" | "LinkedIn"
    description: string
    href: string
}

const ContactCard = ({ logo, description, href }: ContactCardProps) => {

    const [isHover, setIsHover] = useState(false)

    return (
        <a
            className={cn(
                "flex-center flex-col gap-2 transition-transform duration-100",
                isHover && 'scale-125'
            )}
            href={href}
            target="_blank"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => setIsHover(false)}
        >
            <div className="flex-center bg-[#000012] p-4 size-max rounded-full shadow dark:bg-neutral-800 [&_svg]:size-8 [&_svg]:stroke-cyan-500">
                {logo === "GitHub" && <Github />}
                {logo === "CellPhone" && <Phone />}
                {logo === "Email" && <Mail />}
                {logo === "LinkedIn" && <Linkedin />}
            </div>

            <p className="font-jakarta text-xl font-bold">
                {logo === "GitHub" && "GitHub"}
                {logo === "CellPhone" && "Celular"}
                {logo === "Email" && "E-mail"}
                {logo === "LinkedIn" && "LinkedIn"}
            </p>

            <p className="font-jakarta text-sm text-neutral-700 font-semibold dark:text-neutral-500">{description}</p>
        </a>
    )
}

export default ContactCard