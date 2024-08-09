import { LogOutIcon, Monitor, MonitorCog, Moon, Sun, UserIcon } from "lucide-react";
import { logout } from "@/app/(auth)/actions";
import styles from "../app/styles/main.module.css";
import { QueryClient } from "@tanstack/react-query";

export const getDropdownItems = (username: string, theme: string | undefined, setTheme: (theme: string) => void, queryClient: QueryClient) => [
    {
        key: 1,
        content: `Logged in @${username}`,
        theme: false,
        subMenu: null,
        icon: null,
        href: null,
        onClick: null,
    },
    {
        key: 2,
        content: 'Profile',
        theme: false,
        subMenu: null,
        icon: (
            <UserIcon className={styles.iconSize} />
        ),
        href: `/users/${username}`,
        onClick: null,
    },
    {
        key: 3,
        content: 'Theme',
        theme: true,
        icon: (
            <Monitor className={styles.iconSize} />
        ),
        href: null,
        onClick: () => logout(),
        subMenu: [
            {
                key: 1,
                contentSub: 'System Default',
                iconSub: <MonitorCog className={styles.iconTheme} />,
                onClickSub: () => setTheme('system'),
                checked: theme === 'system'
            },
            {
                key: 2,
                contentSub: 'Light',
                iconSub: <Sun className={styles.iconTheme} />,
                onClickSub: () => setTheme('light'),
                checked: theme === 'light'
            },
            {
                key: 3,
                contentSub: 'Dark',
                iconSub: <Moon className={styles.iconTheme} />,
                onClickSub: () => setTheme('dark'),
                checked: theme === 'dark'
            }
        ]
    },
    {
        key: 4,
        theme: false,
        subMenu: null,
        content: 'Logout',
        icon: (
            <LogOutIcon className={styles.iconSize} />
        ),
        href: null,
        onClick: () => {
            queryClient.clear()
            logout()
        },
    }
]