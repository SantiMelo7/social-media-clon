"use client";

import kyInstance from "@/lib/ky";
import { UserData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { HTTPError } from "ky";
import UserTooltip from "./UserTooltip";
import styles from "../app/styles/main.module.css"
import Links from "./Links";
import { UserLinkWithTooltipProps } from "@/interfaces/userLinkWithTooltipProps";

export default function UserLinkWithTooltip({ username, children }: UserLinkWithTooltipProps) {
    const { data } = useQuery({
        queryKey: ["user-data", username],
        queryFn: () => kyInstance.get(`/api/users/username/${username}`).json<UserData>(),
        retry(failureCount, error) {
            if (error instanceof HTTPError && error.response.status == 404) {
                return false
            }
            return failureCount < 3;
        },
        staleTime: Infinity
    })

    const linkDefect = <Links className={styles.contentLinks} url={`/users/${username}`}>{children}</Links>

    if (!data) return linkDefect

    return (
        <UserTooltip user={data}>
            {linkDefect}
        </UserTooltip>
    )
}