import { PostData } from "@/lib/types";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import { formatedRelativeDate } from '../../lib/utils';
import styles from "../../app/styles/main.module.css"

export interface PostProps {
    post: PostData;
}

export default function Post({ post }: PostProps) {
    return (
        <article className={styles.containerPostContent}>
            <div className={styles.containerTextWrap}>
                <Link href={`/users/${post.user.username}`}>
                    <UserAvatar avatarUrl={post.user.avatarUrl} />
                </Link>
                <div>
                    <Link className={styles.linkAvatarPost} href={`/users/${post.user.username}`}>
                        {post.user.displayName}
                    </Link>
                    <Link className={styles.linkUsernamePost} href={`/users/${post.id}`}>
                        {formatedRelativeDate(post.createAd)}
                    </Link>
                </div>
            </div>
            <div className={styles.contentPost}>{post.content}</div>
        </article>
    )
}