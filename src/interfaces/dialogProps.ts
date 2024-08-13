import { PostData } from "@/lib/types";
import { ClassNameProps } from "./classNameProps";
import { UserData } from '../lib/types';
import { PostProps } from "./postProps";

type OnCloseFunction = (open: boolean) => void | (() => void);

export interface DialogProps {
    open: boolean;
    onOpenChange: OnCloseFunction
}

export interface DialogEditProps extends DialogProps {
    data: UserData;
    onOpenChange: (open: boolean) => void
}

export interface DialogDeleteProps extends DialogProps {
    data: PostData;
    onOpenChange: () => void
}

export interface PostMoreButtonProps extends ClassNameProps, PostProps { }
