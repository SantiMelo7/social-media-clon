import { ChannelHeaderProps } from "stream-chat-react";

export interface ChatProps {
    open: boolean;
    openSidebar: () => void;
}

export interface MenuHeaderSideBarProps {
    onClose: () => void
}

export interface CustomChannelHeaderProps extends ChannelHeaderProps {
    openSidebar: () => void
}