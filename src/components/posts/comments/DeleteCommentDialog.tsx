import DialogUi from "@/components/layout/DialogUi";
import LoadingButton from "@/components/layout/LoadingButton";
import { Button } from "@/components/ui/button";
import { DialogDeleteCommentProps } from "@/interfaces/dialogProps";
import styles from "../../../app/styles/main.module.css"
import { useDeleteCommentMutation } from "./mutations";
import { useDialogDelete } from "@/hooks/useDialog";

export default function DeleteCommentDialog({ data, open, onOpenChange: onClose }: DialogDeleteCommentProps) {
    const { mutation, handleOpenChange } = useDialogDelete(useDeleteCommentMutation, onClose)
    return (
        <DialogUi open={open} openChange={handleOpenChange} title="Delete comment?" dialogDesc dialogFooter
            description="Are you sure want to delete this comment? This action cannot be undone"
            childrenFooter={
                <div className={styles.containerDialogFooter}>
                    <LoadingButton variant="destructive" loading={mutation?.isPending} onClick={() => mutation?.mutate(data.id, { onSuccess: onClose })}>
                        Delete
                    </LoadingButton>
                    <Button className={styles.buttonCancel} variant="outline" onClick={onClose} disabled={mutation?.isPending}>Cancel</Button>
                </div>
            }
        >
            <></>
        </DialogUi>
    )
}