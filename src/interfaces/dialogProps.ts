import { PostData } from "@/lib/types";
import { ClassNameProps } from "./classNameProps";
import { UserData } from '../lib/types';
import { PostProps } from "./postProps";
import { childrenNormal } from "./ui";

export interface DialogProps {
    open: boolean;
    openChange?: (open: boolean) => void;
}

export interface DialogEditProps extends DialogProps {
    data: UserData;
    onOpenChange: (open: boolean) => void
}

export interface DialogDeleteProps extends DialogProps {
    data: PostData;
    onOpenChange: () => void
}

export interface DialogUiProps extends childrenNormal, DialogProps {
    title: string;
    description?: string;
    dialogDesc?: boolean;
    dialogFooter?: boolean;
    childrenFooter?: React.ReactNode
}

export interface PostMoreButtonProps extends ClassNameProps, PostProps { }
