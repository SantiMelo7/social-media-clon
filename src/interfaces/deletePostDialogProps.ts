import { PostData } from "@/lib/types";
import { ClassNameProps } from "./classNameProps";

export interface DeletePostDialogProps {
    post: PostData;
    open: boolean;
    onClose: () => void
}

export interface PostMoreButtonProps extends ClassNameProps {
    post: PostData;
}
