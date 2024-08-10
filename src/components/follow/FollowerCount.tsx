"use client"

import { useFollowerInfo } from "@/hooks/useFollowerInfo";
import styles from "../../app/styles/followers.module.css"
import { FollowCountProps } from "@/interfaces/followCount";

export default function FollowerCount({ userId, initialState }: FollowCountProps) {
    const { data } = useFollowerInfo(userId, initialState)

    return (
        <span>
            Followers: {""}
            <span className={styles.followersCount}>{data.followers}</span>
        </span>
    )

}
