export interface CropImageDialogProps {
    src: string,
    cropAspectRatio: number;
    onCropped: (bio: Blob | null) => void,
    onClose: () => void
}