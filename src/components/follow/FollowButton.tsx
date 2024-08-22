"use client"

import { FollowerInfo } from "@/lib/types";
import { QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import kyInstance from "@/lib/ky";
import { useToast } from "../ui/use-toast";
import { FollowCountProps } from "@/interfaces/followCount";

export default function FollowButton({ userId, initialState }: FollowCountProps) {
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const url = `/api/users/${userId}/followers`
    const queryKey: QueryKey = ["follower-info", userId]

    const { data } = useQuery({
        queryKey: queryKey,
        queryFn: () => kyInstance.get(url).json<FollowerInfo>(),
        initialData: initialState,
        staleTime: Infinity,
    })

    const { mutate } = useMutation({
        mutationFn: () => data.isFollowedByUser ? kyInstance.delete(url) : kyInstance.post(url),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey })
            const previousState = queryClient.getQueryData<FollowerInfo>(queryKey)
            queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
                followers: (previousState?.followers || 0) + (previousState?.isFollowedByUser ? -1 : 1),
                isFollowedByUser: !previousState?.isFollowedByUser,
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
        <Button onClick={() => mutate()} variant={data.isFollowedByUser ? "secondary" : "ghost"} >
            {data.isFollowedByUser ? "Unfollow" : "Follow"}
        </Button>
    )
}