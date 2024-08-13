import { Dialog, DialogHeader, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogEditProps } from "@/interfaces/dialogProps";

export default function DialogEdit({ open, data, onOpenChange }: DialogEditProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}