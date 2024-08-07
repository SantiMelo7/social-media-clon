"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { DropdownMenu, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { cn } from '../lib/utils';
import { UserButtonProps } from "@/interfaces/userAvatarProps";
import styles from "../app/styles/main.module.css"
import { dropwDownItems } from "@/util/dropwDownItems";

export default function UserButton({ className }: UserButtonProps) {
    const { user } = useSession()
    const userNameSession = user.username
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn(styles.buttonAvatar, className)}>
                    <UserAvatar avatarUrl={user?.avatarUrl} size={40} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {dropwDownItems.map((text, index) => (
                    <div key={text.key}>
                        {!text.icon ? (
                            <DropdownMenuLabel>
                                {text.content(userNameSession)}
                            </DropdownMenuLabel>
                        ) : text.href && !text.onClick ? (
                            <>
                                <Link href={text.href(userNameSession)}>
                                    <DropdownMenuItem>
                                        {text.icon}
                                        {text.content}
                                    </DropdownMenuItem>
                                </Link>
                            </>
                        ) : (
                            <DropdownMenuItem onClick={() => text.onClick}>
                                {text.icon}
                                {text.content}
                            </DropdownMenuItem>
                        )}
                        {index < dropwDownItems.length - 1 && (
                            <DropdownMenuSeparator />
                        )}
                    </div>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}