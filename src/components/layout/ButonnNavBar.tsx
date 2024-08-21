import { childrenNormal } from "@/interfaces/ui";
import { Button } from "../ui/button";
import Links from "./Links";
import styles from "../../app/styles/main.module.css"
import { UrlProps } from "@/interfaces/urlProps";

interface ButtonNavbarProps extends childrenNormal, UrlProps {
    title: string;
}

export default function ButtonNavBar({ title, url, children }: ButtonNavbarProps) {
    return (
        <Button variant="defaultNotBg" className={styles.buttonMenuBar} title={title} asChild>
            <Links url={url}>
                {children}
                <span className={styles.responsiveTextTitle}>{title}</span>
            </Links>
        </Button>
    )
}