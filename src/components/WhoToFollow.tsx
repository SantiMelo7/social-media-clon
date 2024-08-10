import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import styles from "../app/styles/rightMain.module.css"
import FollowButton from "./follow/FollowButton";
import { getUserDataSelect } from "@/lib/types";

export async function WhoToFollow() {
    const { user } = await validateRequest();
    if (!user) return null

    const usersToFollow = await prisma.user.findMany({
        where: {
            NOT: {
                id: user.id,
            },
            followers: {
                none: {
                    followerId: user.id
                }
            }
        },
        select: getUserDataSelect(user.id),
        take: 5,
    });

    return (
        <div className={styles.containerMainSideBar}>
            <div className={styles.titleCardSideBar}>Who to follow</div>
            {usersToFollow.map((text) => (
                <div key={text.id} className={styles.containerFollow}>
                    <Link href={`/users/${text.username}`} className={styles.linkUserNameFollow}>
                        <UserAvatar avatarUrl={text.avatarUrl} className={styles.avatarFollow} />
                        <div>
                            <p className={styles.textPrincipal}>{text.displayName}</p>
                            <p className={styles.parragrafhCount}>@{text.username}</p>
                        </div>
                    </Link>
                    <FollowButton
                        userId={text.id}
                        initialState={{
                            followers: text._count.followers,
                            isFollowedByUser: text.followers.some((prev) => prev.followerId === user.id)
                        }}
                    />
                </div>
            ))}
        </div>
    )
}
