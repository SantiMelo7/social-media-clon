"use client"

import { useToast } from "@/components/ui/use-toast";
import kyInstance from "@/lib/ky";
import { QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useInfo<T extends object>(url: string, keyQuery: string, id: string, initialState: T) {
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const queryKey: QueryKey = [keyQuery, id]

    const query = useQuery({
        queryKey: [keyQuery, id],
        queryFn: () => kyInstance.get(url).json<T>(),
        initialData: initialState,
        staleTime: Infinity,

    })

    const { mutate } = useMutation({
        mutationFn: () => {
            const data = queryClient.getQueryData<T>(queryKey);
            return data ? kyInstance.delete(url) : kyInstance.post(url)
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey })
            const previousState = queryClient.getQueryData<T>(queryKey);
            queryClient.setQueryData<T>(queryKey, (oldData) => {
                if (!oldData) return initialState;
                return {
                    ...oldData
                };
            });
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

    return { ...query, mutate };
}