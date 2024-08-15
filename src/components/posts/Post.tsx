"use client";

import { formatedRelativeDate } from '../../lib/utils';
import styles from "../../app/styles/main.module.css"
import PostMoreButton from './PostMoreButton';
import { useSession } from "@/app/(main)/SessionProvider";
import { PostProps } from "@/interfaces/postProps";
import LinkiFy from "../linkify/LinkiFy";
import { getTooltip } from "@/util/getTooltip";
import Links from "../layout/Links";
import { MediaPreviews } from './MediaPreviews';
import LikeButton from './like/LikeButton';
import BookMarkButton from './bookmark/BookMarkButton';

export default function Post({ post }: PostProps) {
    const { user } = useSession()
    const dataTooltip = getTooltip({ post })

    console.log({ post });

    return (
        <Links url={`/posts/${post.id}`}>
            <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
                <div className={styles.containerEndMain}>
                    <div className={styles.containerTextWrap}>
                        {dataTooltip[0].component}
                        <div>
                            {dataTooltip[1].component}
                            <p className={styles.linkUsernamePost}>
                                {formatedRelativeDate(post.createAd)}
                            </p>
                        </div>
                    </div>
                    {post.user.id === user?.id && (
                        <PostMoreButton post={post} className="group-hover/post:opacity-100 transition-opacity" />
                    )}
                </div>
                <LinkiFy>
                    <div className={styles.contentPost}>{post.content}</div>
                </LinkiFy>
                {!!post.attachments?.length && (
                    <MediaPreviews attachments={post.attachments} />
                )}
                <br />
                <div className='flex justify-between p-2'>
                    <LikeButton
                        postId={post.id}
                        initialState={{
                            likes: post._count.likes,
                            isLikeByUser: post.likes.some((like) => like.userId === user.id)
                        }}
                    />
                    <BookMarkButton
                        postId={post.id}
                        initialState={{
                            isBookmarkByUser: post.bookmarks.some((bookmark) => bookmark.userId === user.id)
                        }}
                    />
                </div>
            </article>
        </Links>

    )
}
