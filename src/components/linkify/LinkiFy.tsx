import { childrenNormal } from "@/interfaces/ui";
import { LinkItUrl } from 'react-linkify-it';
import { LinkFyProps } from "./LinkFyProps";
import styles from "../../app/styles/main.module.css"

export default function LinkiFy({ children }: childrenNormal) {
    return (
        <LinkFyProps regex={/(@[a-zA-Z0-9_-]+)/} url="users">
            <LinkFyProps regex={/(#[a-zA-Z0-9_-]+)/} url="hasthag">
                <LinkItUrl className={styles.contentLinks}>
                    {children}
                </LinkItUrl>
            </LinkFyProps>
        </LinkFyProps>
    )
}
