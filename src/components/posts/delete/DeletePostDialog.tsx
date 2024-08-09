import { useDeletePostMutation } from "./mutation";
import { Dialog, DialogFooter, DialogHeader, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { DeletePostDialogProps } from "@/interfaces/deletePostDialogProps";
import styles from "../../../app/styles/main.module.css"

export default function DeletePostDialog({ post, open, onClose }: DeletePostDialogProps) {
    const mutation = useDeletePostMutation()
    function handleOpenChange(open: boolean) {
        if (!open || !mutation.isPending) {
            onClose()
        }
    }
    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete post?</DialogTitle>
                    <DialogDescription>Are you sure want to delete this post? This action cannot be undone</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className={styles.containerDialogFooter}>
                        <LoadingButton
                            variant="destructive"
                            onClick={() => mutation.mutate(post.id, { onSuccess: onClose })}
                            loading={mutation.isPending}
                        >
                            Delete
                        </LoadingButton>
                        <Button className={styles.buttonCancel} variant="outline" onClick={onClose} disabled={mutation.isPending}>Cancel</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}