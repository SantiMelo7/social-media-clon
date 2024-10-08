"use client";

import { useToast } from "@/components/ui/use-toast";
import kyInstance from "@/lib/ky";
import { LikesInfo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";

export interface LikeButtonProps {
    postId: string;
    initialState: LikesInfo;
}

export default function LikeButton({ postId, initialState }: LikeButtonProps) {
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const url = `/api/posts/${postId}/likes`
    const queryKey: QueryKey = ["like-info", postId]

    const { data } = useQuery({
        queryKey,
        queryFn: () => kyInstance.get(url).json<LikesInfo>(),
        initialData: initialState,
        staleTime: Infinity,
    })

    const { mutate } = useMutation({
        mutationFn: () => data.isLikeByUser ? kyInstance.delete(url) : kyInstance.post(url),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey })
            const previousState = queryClient.getQueryData<LikesInfo>(queryKey)
            queryClient.setQueryData<LikesInfo>(queryKey, () => ({
                likes: (previousState?.likes || 0) + (previousState?.isLikeByUser ? -1 : 1),
                isLikeByUser: !previousState?.isLikeByUser,
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
            <Heart
                className={cn("size-5", data.isLikeByUser && "fill-red-400 text-red-500")}
            />
            <span className="text-sm font-medium tabular-nums">
                {data.likes} <span className="hidden sm:inline">likes</span>
            </span>
        </button>
    )
}

/**
 *  if (previousState?.isLikeByUser) {
                toast({
                    description: 'He gave it like this post'
                })
            } else {
                toast({
                    description: `You liked a post.`
                })
            }
 */