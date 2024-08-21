import kyInstance from "@/lib/ky"
import { QueryKey, useQuery } from "@tanstack/react-query"

export default function useNotificationsButtons<T>(url: string, keyQuery: string, value: T) {
    const queryKey: QueryKey = [keyQuery]

    const { data } = useQuery({
        queryKey,
        queryFn: () => kyInstance.get(url).json<T>(),
        initialData: value,
        refetchInterval: 60 * 1000
    })

    return data
}