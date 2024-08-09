import { PostsPage } from "@/lib/types";
import { useToast } from "../../ui/use-toast";
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { deletePost } from "./actions";

export function useDeletePostMutation() {
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const router = useRouter()
    const path = usePathname()

    const mutation = useMutation({
        mutationFn: deletePost,
        onSuccess: async (deletePost) => {
            const queryFilters: QueryFilters = { queryKey: ["post-feed"] }
            await queryClient.cancelQueries(queryFilters)

            queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
                queryFilters,
                (oldData) => {
                    if (!oldData) return;
                    return {
                        pageParams: oldData.pageParams,
                        pages: oldData.pages.map(page => ({
                            nextCursor: page.nextCursor,
                            posts: page.posts.filter((prev) => prev.id !== deletePost.id)
                        }))
                    }
                }
            )
            toast({
                description: "Post Delete",
            })
            if (path === `/post/${deletePost.id}`) {
                router.push(`/users/${deletePost.user.username}`)
            }
        },
        onError(error) {
            console.log(error);
            toast({
                variant: "destructive",
                description: "Failed to post, Please try again"
            })
        },
    })
    return mutation
}