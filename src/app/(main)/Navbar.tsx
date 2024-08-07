import UserButton from "@/components/UserButton";
import Link from "next/link";
import styles from "../styles/main.module.css";
import SearchField from "@/components/SearchField";

export default function Navbar() {
    return (
        <header className={styles.containerNav}>
            <div className={styles.containerContentNav}>
                <Link href="/" className={styles.linkNav}>
                    bugbook
                </Link>
                <SearchField />
                <UserButton className={styles.buttonUser} />
            </div>
        </header>
    )
}