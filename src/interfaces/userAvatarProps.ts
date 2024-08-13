import { ClassNameProps } from "./classNameProps";

export interface UserAvatarProps extends ClassNameProps {
    avatarUrl: string | null;
    size?: number;
}
