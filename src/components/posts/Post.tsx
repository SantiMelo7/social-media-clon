import Link from "next/link";
import UserAvatar from "../UserAvatar";
import { formatedRelativeDate } from '../../lib/utils';
import styles from "../../app/styles/main.module.css"
import PostMoreButton from './PostMoreButton';
import { useSession } from "@/app/(main)/SessionProvider";
import { PostProps } from "@/interfaces/postProps";

export default function Post({ post }: PostProps) {
    const { user } = useSession()
    return (
        <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
            <div className={styles.containerEndMain}>
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
                {post.user.id === user?.id && (
                    <PostMoreButton post={post} className="group-hover/post:opacity-100 transition-opacity" />
                )}
            </div>
            <div className={styles.contentPost}>{post.content}</div>
        </article>
    )
}