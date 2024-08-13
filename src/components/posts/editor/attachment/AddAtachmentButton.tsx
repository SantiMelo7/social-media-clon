import { Button } from "@/components/ui/button";
import { AddAtachmentButtonProps } from "@/interfaces/media";
import { ImageIcon } from "lucide-react";
import { useRef } from "react";

export default function AddAtachmentButton({ onFilesSelected, disabled }: AddAtachmentButtonProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    return (
        <>
            <Button variant="ghost" size="icon" className="hover:text-primary" disabled={disabled} onClick={() => fileInputRef.current?.click()}>
                <ImageIcon size={25} />
            </Button>
            <input type="file" accept="image/*, video/*" multiple ref={fileInputRef} className="hidden sr-only" onChange={(e) => {
                const files = Array.from(e.target.files || [])
                if (files.length) {
                    onFilesSelected(files)
                    e.target.value = ""
                }
            }} />
        </>
    )
}