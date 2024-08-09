import { PostMoreButton } from "../../interfaces/deletePostDialogProps";
import { useState } from "react";
import DeletePostDialog from "./delete/DeletePostDialog";
import { Button } from "../ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { DropdownMenuContent, DropdownMenuTrigger, DropdownMenu, DropdownMenuItem } from "../ui/dropdown-menu";
import styles from "../../app/styles/main.module.css"

export default function PostMoreButton({ className, post }: PostMoreButton) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" className={className}>
                        <MoreHorizontal className={styles.moreHorizontal} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                        <span className={styles.containerTrash}>
                            <Trash2 className={styles.trash} />
                            Delete
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DeletePostDialog
                post={post}
                open={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
            />
        </>
    )
}