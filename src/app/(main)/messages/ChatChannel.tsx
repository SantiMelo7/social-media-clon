import { cn } from "@/lib/utils";
import { Channel, Window, MessageInput, MessageList } from "stream-chat-react";
import CustomChannelHeader from "./CustomChannelHeader";
import { ChatProps } from "@/interfaces/chat";

export default function ChatChannel({ open, openSidebar }: ChatProps) {
    return (
        <div className={cn("w-full md:block", !open && "hidden")}>
            <Channel>
                <Window>
                    <CustomChannelHeader openSidebar={openSidebar} />
                    <MessageList />
                    <MessageInput />
                </Window>
            </Channel>
        </div>
    )
}