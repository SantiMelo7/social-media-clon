import { ClassNameProps } from "@/interfaces/classNameProps";
import { Loader2 } from "lucide-react";

export default function Loading({ className }: ClassNameProps) {
    return (
        <Loader2 className={`animateSpin ${className ? className : "my-3"}`} />
    )
}