"use client"

import { CommentMoreButtonProps } from "@/interfaces/dialogProps";
import DeleteCommentDialog from "./DeleteCommentDialog";
import DropDownMoreButton from "../DropwDownMoreButton";

export default function CommentMoreButton({ className, comments }: CommentMoreButtonProps) {
    return (
        <DropDownMoreButton
            className={className}
            actionComponent={({ show, setShow }) => (
                <DeleteCommentDialog
                    data={comments}
                    open={show}
                    onOpenChange={() => setShow(false)}
                />
            )}
        />
    )
}