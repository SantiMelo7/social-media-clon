import UserButton from "@/components/UserButton";
import styles from "../styles/main.module.css";
import SearchField from "@/components/SearchField";
import Links from "@/components/Links";
import MenuBar from "./MenuBar";

export default function Navbar() {
    return (
        <header className={styles.containerNav}>
            <div className={styles.containerContentNav}>
                <Links url="/" className={styles.linkNav}>
                    bugbook
                </Links>
                <SearchField />
                <UserButton className={styles.buttonUser} />
            </div>
            <MenuBar className={styles.menuBarLayoutMobile} />
        </header>
    )
}