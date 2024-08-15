import { PostProps } from "@/interfaces/postProps";
import CommentInput from "./CommentInput";
import { useInfiniteQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { CommentsPage } from "@/lib/types";
import Comment from "./Comment";
import { Button } from "@/components/ui/button";
import Loading from "@/app/loading";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";


export default function Comments({ post }: PostProps) {

    const { data, hasNextPage, status, isFetching, fetchNextPage } = useInfiniteQuery({
        queryKey: ["comments", post.id],
        queryFn: ({ pageParam }) =>
            kyInstance
                .get(
                    `/api/posts/${post.id}/comments`,
                    pageParam ? { searchParams: { cursor: pageParam } } : {},
                )
                .json<CommentsPage>(),
        initialPageParam: null as string | null,
        getNextPageParam: (firstPage) => firstPage.previousCursor,
        select: (data) => ({
            pages: [...data.pages].reverse(),
            pageParams: [...data.pageParams].reverse(),
        }),
    });

    const comments = data?.pages.flatMap(page => page.comments) || []

    return (
        <div className="space-y-5">
            <CommentInput post={post} />
            {hasNextPage && (
                <Button variant="link" className="mx-auto block"
                    disabled={isFetching} onClick={() => fetchNextPage()}
                >Load previous comment</Button>
            )}
            {status === "pending" && (
                <Loading className="text-primary" />
            )}
            {status === "error" && (
                <p className="text-center text-destructive">An error ocurred while loading comment</p>
            )}
            {status === "success" && !comments.length && !hasNextPage && (
                <p className="text-center text-primary font-bold">No one has comments anything yet.</p>
            )}
            {comments.map((text, index) => (
                <>
                    <Comment key={text.id} comments={text} />
                    {index < comments.length - 1 && (
                        <DropdownMenuSeparator className="border-[1.4px] dark:border-primary" />
                    )}
                </>
            ))}
        </div>
    )
}