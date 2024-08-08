"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { DropdownMenu, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent } from "./ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { cn } from '../lib/utils';
import styles from "../app/styles/main.module.css"
import { getDropdownItems } from "@/util/dropwDownItems";
import { useTheme } from "next-themes";
import { Check } from "lucide-react";
import { ClassNameProps } from "@/interfaces/classNameProps";

export default function UserButton({ className }: ClassNameProps) {
    const { user } = useSession()
    const userNameSession = user.username
    const { theme, setTheme } = useTheme()
    const dropItems = getDropdownItems(userNameSession, theme, setTheme)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn(styles.buttonAvatar, className)}>
                    <UserAvatar avatarUrl={user?.avatarUrl} size={40} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {dropItems.map((text, index) => (
                    <div key={text.key}>
                        {!text.icon && !text.theme && (
                            <DropdownMenuLabel>
                                {text.content}
                            </DropdownMenuLabel>
                        )}
                        {text.href && !text.onClick && (
                            <Link href={text.href}>
                                <DropdownMenuItem>
                                    {text.icon}
                                    {text.content}
                                </DropdownMenuItem>
                            </Link>
                        )}
                        {!text.href && text.onClick && !text.theme && (
                            <DropdownMenuItem onClick={text.onClick}>
                                {text.icon}
                                {text.content}
                            </DropdownMenuItem>
                        )}
                        {text.theme && text.subMenu && (
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    {text.icon}
                                    {text.content}
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        {text.subMenu.map((item) => (
                                            <div key={item.key}>
                                                <DropdownMenuItem onClick={item.onClickSub}>
                                                    {item.iconSub}
                                                    {item.contentSub}
                                                    {item.checked && <Check className={styles.iconCheck} />}
                                                </DropdownMenuItem>
                                            </div>

                                        ))}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        )}
                        {index < dropItems.length - 1 && (
                            <DropdownMenuSeparator />
                        )}
                    </div>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}