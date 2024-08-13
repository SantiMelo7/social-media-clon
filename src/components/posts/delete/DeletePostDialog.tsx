import { useDeletePostMutation } from "./mutation";
import { Dialog, DialogFooter, DialogHeader, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import LoadingButton from "@/components/layout/LoadingButton";
import { Button } from "@/components/ui/button";
import styles from "../../../app/styles/main.module.css"
import { DialogDeleteProps } from "@/interfaces/dialogProps";

export default function DeletePostDialog({ data, open, onOpenChange: onClose }: DialogDeleteProps) {
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
                            onClick={() => mutation.mutate(data.id, { onSuccess: onClose })}
                            loading={mutation.isPending}
                        >
                            Delete
                        </LoadingButton>
                        <Button className={styles.buttonCancel} variant="outline" onClick={onClose} disabled={mutation.isPending}>Cancel</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}