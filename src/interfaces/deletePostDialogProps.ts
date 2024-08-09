import { PostData } from "@/lib/types";
import { ClassNameProps } from "./classNameProps";

export interface DeletePostDialogProps {
    post: PostData;
    open: boolean;
    onClose: () => void
}

export interface PostMoreButton extends ClassNameProps {
    post: PostData;
}
