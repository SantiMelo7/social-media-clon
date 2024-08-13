import Link from "next/link";
import { formatedRelativeDate } from '../../lib/utils';
import styles from "../../app/styles/main.module.css"
import PostMoreButton from './PostMoreButton';
import { useSession } from "@/app/(main)/SessionProvider";
import { PostProps } from "@/interfaces/postProps";
import LinkiFy from "../linkify/LinkiFy";
import { getTooltip } from "@/util/getTooltip";
import Links from "../layout/Links";

export default function Post({ post }: PostProps) {
    const { user } = useSession()
    const dataTooltip = getTooltip({ post })

    return (
        <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
            <div className={styles.containerEndMain}>
                <div className={styles.containerTextWrap}>
                    {dataTooltip[0].component}
                    <div>
                        {dataTooltip[1].component}
                        <Links className={styles.linkUsernamePost} url={`/users/${post.id}`}>
                            {formatedRelativeDate(post.createAd)}
                        </Links>
                    </div>
                </div>
                {post.user.id === user?.id && (
                    <PostMoreButton post={post} className="group-hover/post:opacity-100 transition-opacity" />
                )}
            </div>
            <LinkiFy>
                <div className={styles.contentPost}>{post.content}</div>
            </LinkiFy>
        </article>
    )
}