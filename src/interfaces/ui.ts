import React from "react"
import { type VariantProps } from "class-variance-authority"
import { buttonVariants } from "../cvaConfig"
import { DefaultValues, FieldValues, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from 'react';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

export interface LoadingButtonProps extends ButtonProps {
    loading: boolean;
}

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

export interface LayoutFormProps<TFieldValues extends FieldValues> {
    children: (form: UseFormReturn<TFieldValues> & { isPending: boolean }) => ReactNode;
    onSubmit: (values: TFieldValues) => Promise<void>;
    defaultValues: DefaultValues<TFieldValues>;
    resolver: ReturnType<typeof zodResolver>;
}

export interface childrenNormal {
    children: React.ReactNode;
}

export interface LayoutAuthProps extends childrenNormal {
    img: string;
}