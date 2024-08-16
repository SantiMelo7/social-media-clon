import React, { ReactNode } from "react";
import { ClassNameProps } from "./classNameProps";

export interface DropDownMoreButtonProps extends ClassNameProps {
    actionComponent: (props: {
        show: boolean;
        setShow: React.Dispatch<React.SetStateAction<boolean>>;
    }) => ReactNode;
}
