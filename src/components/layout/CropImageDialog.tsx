import { Cropper, ReactCropperElement } from "react-cropper"
import { Button } from "../ui/button";
import "cropperjs/dist/cropper.css"
import DialogUi from "./DialogUi";
import { CropImageDialogProps } from "@/interfaces/cropImageDialogProps";
import { useRef } from "react";

export default function CropImageDialog({ src, cropAspectRatio, onCropped, onClose }: CropImageDialogProps) {

    const croperRef = useRef<ReactCropperElement>(null)
    function crop() {
        const cropper = croperRef.current?.cropper
        if (!cropper) return
        cropper.getCroppedCanvas().toBlob((blog) => onCropped(blog), "image/webp")
        onClose()
    }

    return (
        <DialogUi open openChange={onClose} title="Upload a profile photo" dialogDesc dialogFooter
            description="Are you sure this is your profile picture?"
            childrenFooter={
                <div className="flex sm:flex-row gap-4 w-full mb-2">
                    <Button className="w-full" onClick={crop}>Crop</Button>
                    <Button className="w-full" variant="secondary" onClick={onClose}>Cancel</Button>
                </div>
            }
        >
            <Cropper src={src} aspectRatio={cropAspectRatio} guides={false} zoomable={false}
                ref={croperRef} className="w-full h-[773px]"
            />
        </DialogUi>
    )
}