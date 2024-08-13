"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { DropdownMenu, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent } from "../ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { cn } from '../../lib/utils';
import styles from "../../app/styles/main.module.css"
import { getDropdownItems } from "@/util/dropwDownItems";
import { useTheme } from "next-themes";
import { Check } from "lucide-react";
import { ClassNameProps } from "@/interfaces/classNameProps";
import { useQueryClient } from "@tanstack/react-query";
import Links from "../layout/Links";

export default function UserButton({ className }: ClassNameProps) {
    const { user } = useSession()
    const userNameSession = user.username
    const { theme, setTheme } = useTheme()
    const queryClient = useQueryClient()
    const dropItems = getDropdownItems(userNameSession, theme, setTheme, queryClient)
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
                            <Links url={text.href}>
                                <DropdownMenuItem>
                                    {text.icon}
                                    {text.content}
                                </DropdownMenuItem>
                            </Links>
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