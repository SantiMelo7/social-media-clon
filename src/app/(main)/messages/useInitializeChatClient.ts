import { useEffect, useState } from "react";
import { useSession } from "../SessionProvider";
import { StreamChat } from "stream-chat";
import kyInstance from "@/lib/ky";

export default function useInitializeChatClient() {
    const { user } = useSession()
    const [chatClient, setChatClient] = useState<StreamChat | null>(null)

    useEffect(() => {
        const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!)
        client.connectUser(
            {
                id: user.id,
                displayName: user.displayName,
                name: user.username,
                image: user.avatarUrl,
            },
            async () => kyInstance.get("/api/get-token")
                .json<{ token: string }>()
                .then((data) => data.token)
        ).catch(error => {
            console.log(error);
        }).then(() => setChatClient(client))

        return () => {
            setChatClient(null)
            client.disconnectUser().catch(error => {
                console.log(error);
            }).then(() => {
                console.log("Connection");
            })
        }
    }, [user.id, user.username, user.displayName, user.avatarUrl,])

    return chatClient
}