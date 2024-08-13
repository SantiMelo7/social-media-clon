import { Cropper } from "react-cropper"
import { Button } from "../ui/button";
import "cropperjs/dist/cropper.css"
import DialogUi from "./DialogUi";
import { CropImageDialogProps } from "@/interfaces/cropImageDialogProps";
import { useCropImageDialog } from "@/hooks/useCropImageDialog";

export default function CropImageDialog({ src, cropAspectRatio, onCropped, onClose }: CropImageDialogProps) {
    const { croperRef, crop } = useCropImageDialog(onCropped, onClose)
    return (
        <DialogUi open openChange={onClose} title="Delete post?" dialogDesc dialogFooter
            description="Are you sure want to delete this post? This action cannot be undone"
            childrenFooter={
                <>
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={crop}>Crop</Button>
                </>
            }
        >
            <Cropper src={src} aspectRatio={cropAspectRatio} guides={false} zoomable={false}
                ref={croperRef} className="mx-auto size-fit"
            />
        </DialogUi>
    )
}