import { Button } from "@/components/ui/button"
import { menuBarData } from "@/util/menuBarData"
import styles from "../../app/styles/main.module.css"
import { ClassNameProps } from "@/interfaces/classNameProps"
import Links from "@/components/layout/Links"

export default function MenuBar({ className }: ClassNameProps) {
    return (
        <div className={className}>
            {menuBarData.map((text) => (
                <div key={text.key}>
                    <Button variant="defaultNotBg" className={styles.buttonMenuBar} title={text.title} asChild>
                        <Links url={text.href}>
                            {text.icon}
                            <span className={styles.responsiveTextTitle}>{text.title}</span>
                        </Links>
                    </Button>
                </div>
            ))}
        </div>
    )
}