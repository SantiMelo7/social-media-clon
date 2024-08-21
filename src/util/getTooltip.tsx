import UserAvatar from "@/components/users/UserAvatar";
import { PostProps } from "@/interfaces/postProps";
import styles from "../app/styles/main.module.css"
import UserTooltip from "@/components/users/UserTooltip";
import Links from "@/components/layout/Links";

export const getTooltip = ({ post }: PostProps) => [
    {
        key: 1,
        component: (
            <UserTooltip user={post.user}>
                <Links url={`/users/${post?.user.displayName}`}>
                    <UserAvatar avatarUrl={post?.user.avatarUrl} />
                </Links>
            </UserTooltip>
        )
    },
    {
        key: 2,
        component: (
            <UserTooltip user={post.user}>
                <Links className={styles.linkAvatarPost} url={`/users/${post?.user.username}`}>
                    {post.user.username}
                </Links>
            </UserTooltip>
        )
    }
]