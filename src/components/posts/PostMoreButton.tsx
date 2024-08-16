"use client"

import { PostMoreButtonProps } from "../../interfaces/dialogProps";
import DeletePostDialog from "./delete/DeletePostDialog";
import DropDownMoreButton from "./DropwDownMoreButton";

export default function PostMoreButton({ className, post }: PostMoreButtonProps) {
    return (
        <DropDownMoreButton
            className={className}
            actionComponent={({ show, setShow }) => (
                <DeletePostDialog data={post} open={show} onOpenChange={() => setShow(false)} />
            )}
        />
    )
}