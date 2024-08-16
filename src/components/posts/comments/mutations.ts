import { useToast } from "@/components/ui/use-toast";
import { CommentsPage } from "@/lib/types";
import {
    InfiniteData,
    QueryKey,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { deleteComment, submitComment } from "./actions";

export function useCommentsPostMutation(postId: string) {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: submitComment,
        onSuccess: async (newComent) => {
            const queryKey: QueryKey = ["comments", postId]
            await queryClient.cancelQueries({ queryKey });
            queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
                queryKey,
                (oldData: any) => {
                    const firstPage = oldData?.pages[0];
                    if (firstPage) {
                        return {
                            pageParams: oldData.pageParams,
                            pages: [
                                {
                                    comments: [newComent, ...firstPage.comments],
                                    prev: firstPage.previousCursor,
                                },
                                ...oldData.pages.slice(1),
                            ],
                        };
                    }
                },
            );
            queryClient.invalidateQueries({
                queryKey,
                predicate(query) {
                    return !query.state.data
                },
            });
            toast({
                description: "Comment created",
            });
        },
        onError(error) {
            console.error(error);
            toast({
                variant: "destructive",
                description: "Failed to comment. Please try again.",
            });
        },
    });
    return mutation;
}

export function useDeleteCommentMutation() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteComment,
        onSuccess: async (deleteComent) => {
            const queryKey: QueryKey = ["comments", deleteComent.id];
            await queryClient.cancelQueries({ queryKey });
            queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
                queryKey,
                (oldData) => {
                    if (!oldData) return undefined;
                    return {
                        ...oldData,
                        pages: oldData.pages.map((page) => ({
                            ...page,
                            comments: page.comments.filter((r) => r.id !== deleteComent.id),
                        })),
                    };
                }
            );
            toast({
                description: "Comment deleted",
            });
        },
        onError: (error) => {
            console.error(error);
            toast({
                variant: "destructive",
                description: "Failed to delete comment. Please try again.",
            });
        },
    });
    return mutation;
}