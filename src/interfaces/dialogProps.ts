import { PostData } from "@/lib/types";
import { ClassNameProps } from "./classNameProps";
import { UserData } from '../lib/types';
import { PostProps } from "./postProps";

type OnCloseFunction = (open: boolean) => void | (() => void);

export interface DialogProps {
    data: UserData | PostData;
    open: boolean;
    onOpenChange: OnCloseFunction
}

export interface DialogEditProps extends DialogProps {
    onOpenChange: (open: boolean) => void
}

export interface DialogDeleteProps extends DialogProps {
    onOpenChange: () => void
}

export interface PostMoreButtonProps extends ClassNameProps, PostProps { }
