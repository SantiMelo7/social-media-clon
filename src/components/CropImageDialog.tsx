import { useRef } from "react";
import { Cropper, ReactCropperElement } from "react-cropper"
import { Dialog, DialogFooter, DialogContent, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import "cropperjs/dist/cropper.css"

interface CropImageDialogProps {
    src: string,
    cropAspectRatio: number;
    onCropped: (bio: Blob | null) => void,
    onClose: () => void
}

export default function CropImageDialog({ src, cropAspectRatio, onCropped, onClose }: CropImageDialogProps) {
    const croperRef = useRef<ReactCropperElement>(null)

    function crop() {
        const cropper = croperRef.current?.cropper
        if (!cropper) return
        cropper.getCroppedCanvas().toBlob((blog) => onCropped(blog), "image/webp")
        onClose()
    }

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogTitle>Crop Image</DialogTitle>
                <Cropper
                    src={src}
                    aspectRatio={cropAspectRatio}
                    guides={false}
                    zoomable={false}
                    ref={croperRef}
                    className="mx-auto size-fut"
                />
                <DialogFooter>
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={crop}>Crop</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}