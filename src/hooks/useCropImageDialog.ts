import { useRef } from "react"
import { ReactCropperElement } from "react-cropper"

export function useCropImageDialog(onCropped: (bio: Blob | null) => void, onClose: () => void) {
    const croperRef = useRef<ReactCropperElement>(null)
    function crop() {
        const cropper = croperRef.current?.cropper
        if (!cropper) return
        cropper.getCroppedCanvas().toBlob((blog) => onCropped(blog), "image/webp")
        onClose()
    }
    return { croperRef, crop }
}