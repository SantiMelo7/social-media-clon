import { ReactNode } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

export interface ContainerFormProps<TFieldValues extends FieldValues> {
    form: {
        control: Control<TFieldValues>;
    };
    name: FieldPath<TFieldValues>;
    label: string;
    children: (field: any) => ReactNode;
}