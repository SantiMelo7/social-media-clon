import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import UserAvatar from "../users/UserAvatar";
import styles from "../../app/styles/rightMain.module.css"
import FollowButton from "../follow/FollowButton";
import { getUserDataSelect } from "@/lib/types";
import UserTooltip from "../users/UserTooltip";
import Links from "../layout/Links";

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
        take: 3,
    });

    return (
        <div className={styles.containerMainSideBar}>
            <div className={styles.titleCardSideBar}>Who to follow</div>
            {usersToFollow.map((text) => (
                <div key={text.id} className={styles.containerFollow}>
                    <UserTooltip user={text}>
                        <Links url={`/users/${text.username}`} className={styles.linkUserNameFollow}>
                            <UserAvatar avatarUrl={text.avatarUrl} className={styles.avatarFollow} />
                            <div>
                                <p className={styles.textPrincipal}>{text.displayName}</p>
                                <p className={styles.parragrafhCount}>@{text.username}</p>
                            </div>
                        </Links>
                    </UserTooltip>
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
