import { Channel, Window, ChannelHeader, MessageInput, MessageList } from "stream-chat-react";


export default function ChatChannel() {
    return (
        <div className="w-full">
            <Channel>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
            </Channel>
        </div>
    )
}