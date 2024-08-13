import { PostsPage } from "@/lib/types";
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/components/ui/use-toast";
import { UpdateUserProfile } from "@/lib/validation";
import { updateUserProfile } from "./actions";
import { useRouter } from "next/navigation";

export function useUpdateProfileMutation() {
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const { startUpload } = useUploadThing("avatar")
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: async ({ values, avatar }: { values: UpdateUserProfile, avatar?: File }) => {
            return Promise.all([
                updateUserProfile(values),
                avatar && startUpload([avatar])
            ])
        },
        onSuccess: async ([updateUser, uploadResult]) => {
            const newAvatar = uploadResult?.[0].serverData.avatarUrl
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
                            posts: page.posts.map(post => {
                                if (post.user.id === updateUser.id) {
                                    return {
                                        ...post,
                                        user: {
                                            ...updateUser,
                                            avatarUrl: newAvatar || updateUser.avatarUrl
                                        }
                                    }
                                }
                                return post
                            })
                        }))
                    }
                }
            )
            router.refresh()
            toast({
                description: "Profile Update",
            })
        },
        onError(error) {
            console.log(error);
            toast({
                variant: "destructive",
                description: "Failed to update profile, Please try again"
            })
        },
    })
    return mutation
}