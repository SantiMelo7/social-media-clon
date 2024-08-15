import { useToast } from "@/components/ui/use-toast";
import { useInfo } from "@/hooks/useInfo";
import kyInstance from "@/lib/ky";
import { BookmarksInfo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bookmark, Heart } from "lucide-react";

export interface LikeButtonProps {
    postId: string;
    initialState: BookmarksInfo;
}

export default function BookMarkButton({ postId, initialState }: LikeButtonProps) {
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const url = `/api/posts/${postId}/bookmark`
    const queryKey: QueryKey = ["bookmark-info", postId]

    const { data } = useInfo(url, "bookmark-info", postId, initialState)

    const { mutate } = useMutation({
        mutationFn: () => data.isBookmarkByUser ? kyInstance.delete(url) : kyInstance.post(url),
        onMutate: async () => {
            toast({
                description: `Post ${data.isBookmarkByUser ? "un" : ""}bookmarked`
            })
            await queryClient.cancelQueries({ queryKey })
            const previousState = queryClient.getQueryData<BookmarksInfo>(queryKey)
            queryClient.setQueryData<BookmarksInfo>(queryKey, () => ({
                isBookmarkByUser: !previousState?.isBookmarkByUser,
            }))
            return { previousState }
        },
        onError(error, variables, context) {
            queryClient.setQueryData(queryKey, context?.previousState)
            console.log(error);
            toast({
                variant: "destructive",
                description: "Something went wrong. Please try again"
            })
        },
    })
    return (
        <button
            className="flex items-center gap-3"
            onClick={() => mutate()}
        >
            <Bookmark
                className={cn("size-5", data.isBookmarkByUser && "fill-primary")}
            />
        </button>
    )
}