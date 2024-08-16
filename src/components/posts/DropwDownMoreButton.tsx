import { DropdownMenuContent, DropdownMenuTrigger, DropdownMenu, DropdownMenuItem } from "../ui/dropdown-menu";
import styles from "../../app/styles/main.module.css"
import { Button } from "../ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { DropDownMoreButtonProps } from "@/interfaces/dropDownMoreButtonProps";

export default function DropDownMoreButton({ actionComponent: ActionComponent, className }: DropDownMoreButtonProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="defaultNotBg" className={className}>
                        <MoreHorizontal className={styles.moreHorizontal} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className={styles.containerDropwDownMenuItem} onClick={() => setShowDeleteDialog(true)}>
                        <div className={styles.containerTrash}>
                            <Trash2 className={styles.trash} />
                            <span className={styles.textDelete}>Delete</span>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <ActionComponent
                show={showDeleteDialog}
                setShow={() => setShowDeleteDialog(false)}
            />
        </>
    )
}