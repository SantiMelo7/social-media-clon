import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { userDataSelect } from "@/lib/types";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";
import styles from "../app/styles/rightMain.module.css"

export async function WhoToFollow() {
    const { user } = await validateRequest();
    if (!user) return null

    const usersToFollow = await prisma.user.findMany({
        where: {
            NOT: {
                id: user.id,
            },
        },
        select: userDataSelect,
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
                    <Button>Follow</Button>
                </div>
            ))}
        </div>
    )
}
