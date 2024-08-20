import { ChannelList } from "stream-chat-react";
import { useSession } from "../SessionProvider";

export default function ChatSideBar() {
    const { user } = useSession()
    return (
        <div className="size-full flex flex-col border-b sm:border-b-0 sm:border-e w-72 md:ml-0 mx-auto">
            <ChannelList
                filters={{
                    type: "messaging",
                    members: { $in: [user.id] }
                }}
                showChannelSearch
            />
        </div>
    )
}