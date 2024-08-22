"use client";

import { formatedRelativeDate } from '../../lib/utils';
import styles from "../../app/styles/main.module.css"
import styles2 from "../../app/styles/rightMain.module.css"
import PostMoreButton from './PostMoreButton';
import { useSession } from "@/app/(main)/SessionProvider";
import { PostProps } from "@/interfaces/postProps";
import LinkiFy from "../linkify/LinkiFy";
import Links from "../layout/Links";
import { MediaPreviews } from './MediaPreviews';
import LikeButton from './like/LikeButton';
import BookMarkButton from './bookmark/BookMarkButton';
import { useState, useEffect } from 'react';
import Comments from './comments/Comments';
import { CommentButton } from './comments/CommentButton';
import { usePathname } from 'next/navigation';
import UserTooltip from '../users/UserTooltip';
import UserAvatar from '../users/UserAvatar';

export default function Post({ post }: PostProps) {
    const { user } = useSession()
    const [showComments, setShowComments] = useState(false)
    const pathName = usePathname()

    useEffect(() => {
        if (pathName === `/posts/${post.id}`) {
            return setShowComments(true)
        };
    }, [pathName, post.id])

    return (
        <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
            <div className={styles2.containerFollow}>
                <div className='flex gap-x-4'>
                    <UserTooltip user={post.user}>
                        <Links url={`/users/${post?.user.username}`}>
                            <UserAvatar avatarUrl={post?.user.avatarUrl} />
                        </Links>
                    </UserTooltip>
                    <div>
                        <Links className={styles.linkAvatarPost} url={`/users/${post?.user.username}`}>
                            {post.user.username}
                        </Links>
                        <p className={styles.linkUsernamePost}>
                            {formatedRelativeDate(post.createAd)}
                        </p>
                    </div>
                </div>
                {post.user.id === user?.id && (
                    <PostMoreButton post={post} className="group-hover/post:opacity-100 transition-opacity" />
                )}
            </div>
            {!post.attachments.length ? (
                <LinkiFy>
                    <Links url={`/posts/${post.id}`}>
                        <div className={styles.contentPost}>{post.content}</div>
                    </Links>
                </LinkiFy>
            ) : (
                <>
                    <div className={styles.contentPost}>{post.content}</div>
                    <Links url={`/posts/${post.id}`}>
                        <MediaPreviews attachments={post.attachments} />
                    </Links>
                </>
            )}
            <br />
            <div className='flex justify-between p-2'>
                <div className='flex items-center gap-5'>
                    <LikeButton postId={post.id} initialState={{
                        likes: post._count.likes,
                        isLikeByUser: post.likes.some((like) => like.userId === user.id)
                    }}
                    />
                    <CommentButton post={post} onClick={() => setShowComments(!showComments)} />
                </div>
                <BookMarkButton postId={post.id} initialState={{
                    isBookmarkByUser: post.bookmarks.some((bookmark) => bookmark.userId === user.id)
                }}
                />
            </div>
            {showComments && (
                <Comments post={post} />
            )}
        </article>
    )
}