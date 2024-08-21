import { UserResponse } from "stream-chat";
import { DefaultStreamChatGenerics } from "stream-chat-react";

export interface ResultChat {
    user: UserResponse<DefaultStreamChatGenerics>;
    onClick: () => void;
}

export interface UserResultProps extends ResultChat {
    selected: boolean;
}