import UserButton from "@/components/users/UserButton";
import styles from "../styles/main.module.css";
import SearchField from "@/components/layout/SearchField";
import Links from "@/components/layout/Links";
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