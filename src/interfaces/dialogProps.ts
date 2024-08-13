import { PostData } from "@/lib/types";
import { ClassNameProps } from "./classNameProps";
import { UserData } from '../lib/types';
import { PostProps } from "./postProps";

type OnCloseFunction = () => void | ((type: boolean) => void);

export interface DialogProps {
    data: UserData | PostData;
    open: boolean;
    onOpenChange: OnCloseFunction
}

export interface PostMoreButtonProps extends ClassNameProps, PostProps { }
