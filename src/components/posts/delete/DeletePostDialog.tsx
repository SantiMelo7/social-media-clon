import LoadingButton from "@/components/layout/LoadingButton";
import { Button } from "@/components/ui/button";
import styles from "../../../app/styles/main.module.css"
import { DialogDeleteProps } from "@/interfaces/dialogProps";
import DialogUi from "@/components/layout/DialogUi";
import { useDialogDelete } from "@/hooks/useDialog";

export default function DeletePostDialog({ data, open, onOpenChange: onClose }: DialogDeleteProps) {
    const { mutation, handleOpenChange } = useDialogDelete(onClose)
    return (
        <DialogUi open={open} openChange={handleOpenChange} title="Delete post?" dialogDesc dialogFooter
            description="Are you sure want to delete this post? This action cannot be undone"
            childrenFooter={
                <div className={styles.containerDialogFooter}>
                    <LoadingButton variant="destructive" loading={mutation.isPending} onClick={() => mutation.mutate(data.id, { onSuccess: onClose })}>
                        Delete
                    </LoadingButton>
                    <Button className={styles.buttonCancel} variant="outline" onClick={onClose} disabled={mutation.isPending}>Cancel</Button>
                </div>
            }
        >
            <></>
        </DialogUi>
    )
}