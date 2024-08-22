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
                <div className="flex justify-center items-center gap-x-3">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={crop}>Crop</Button>
                </div>
            }
        >
            <Cropper src={src} aspectRatio={cropAspectRatio} guides={false} zoomable={false}
                ref={croperRef} className="mx-auto size-fit"
            />
        </DialogUi>
    )
}