import { DialogUiProps } from "@/interfaces/dialogProps";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import React from "react";

export default function DialogUi({ open, openChange, title, description, dialogDesc, dialogFooter, children, childrenFooter }: DialogUiProps) {
    return (
        <Dialog open={open} onOpenChange={openChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {dialogDesc && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>
                {children}
                {dialogFooter && (
                    <DialogFooter>{childrenFooter}</DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}