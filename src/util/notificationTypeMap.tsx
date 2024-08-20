import { NotificationData } from "@/lib/types";
import { Heart, MessageCircle, User2 } from "lucide-react";

export const getNotificationTypeMap = (notification: NotificationData) => {
    const { issuer, postId } = notification;

    return {
        FOLLOW: {
            message: `${issuer.displayName} followed you`,
            icon: <User2 className="text-primary size-7" />,
            href: `/users/${issuer.username}`,
        },
        COMMENT: {
            message: `${issuer.displayName} commented on your post`,
            icon: <MessageCircle className="text-primary size-7" />,
            href: `/posts/${postId}`,
        },
        LIKE: {
            message: `${issuer.displayName} liked your post`,
            icon: <Heart className="text-red-500 fill-red-500 size-7" />,
            href: `/posts/${postId}`,
        }
    };
};