"use client"

import { useInfo } from "@/hooks/useInfo";
import styles from "../../app/styles/followers.module.css"
import { FollowCountProps } from "@/interfaces/followCount";

export default function FollowerCount({ userId, initialState }: FollowCountProps) {
    const url = `/api/users/${userId}/followers`
    const { data } = useInfo(url, "follower-info", userId, initialState)

    return (
        <span>
            Followers: {""}
            <span className={styles.followersCount}>{data.followers}</span>
        </span>
    )

}
