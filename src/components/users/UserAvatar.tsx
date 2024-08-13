import Image from "next/image";
import AvatarImg from "../../../public/assets/avatar-placeholder.png"
import { cn } from "@/lib/utils";
import { UserAvatarProps } from "@/interfaces/userAvatarProps";
import styles from "../../app/styles/main.module.css";

export default function UserAvatar({ avatarUrl, size, className }: UserAvatarProps) {
    return (
        <Image
            src={avatarUrl || AvatarImg.src}
            className={cn(styles.imgAvatarUlr, className)}
            width={size ?? 48}
            height={size ?? 48}
            alt="User Avatar"
        />
    )
}