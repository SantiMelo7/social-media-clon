import { LogOutIcon, UserIcon } from "lucide-react";
import { logout } from "@/app/(auth)/actions";
import styles from "../app/styles/main.module.css";

export const dropwDownItems = [
    {
        key: 1,
        content: (username: string) => `Logged in @${username}`,
        icon: null,
        href: null,
        onClick: null,
    },
    {
        key: 2,
        content: 'Profile',
        icon: (
            <UserIcon className={styles.iconSize} />
        ),
        href: (username: string) => `/users/${username}`,
        onClick: null,
    },
    {
        key: 3,
        content: 'Logout',
        icon: (
            <LogOutIcon className={styles.iconSize} />
        ),
        href: null,
        onClick: () => logout(),
    }
]