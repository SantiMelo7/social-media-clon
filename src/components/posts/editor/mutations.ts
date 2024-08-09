import { useToast } from "@/components/ui/use-toast";
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { submitPost } from "./actions";
import { PostsPage } from "@/lib/types";

export function useSubmitPostMutation() {
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: submitPost,
        onSuccess: async (newPost) => {
            const queryFilters: QueryFilters = { queryKey: ["post-feed", "for-you"] }
            await queryClient.cancelQueries(queryFilters)

            queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
                queryFilters,
                (oldData) => {
                    const firstPage = oldData?.pages[0]
                    if (firstPage) {
                        return {
                            pageParams: oldData.pageParams,
                            pages: [
                                {
                                    posts: [newPost, ...firstPage.posts],
                                    nextCursor: firstPage.nextCursor,
                                },
                                ...oldData.pages.slice(1)
                            ]
                        }
                    }
                }
            )
            queryClient.invalidateQueries({
                queryKey: queryFilters.queryKey,
                predicate(query) {
                    return !query.state.data
                }
            })
            toast({
                description: "Post Created",
            })
        },
        onError(error) {
            console.log(error);
            toast({
                variant: "destructive",
                description: "Failed to delete, Please try again"
            })
        },
    })

    return mutation
}