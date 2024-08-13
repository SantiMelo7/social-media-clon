import Image, { StaticImageData } from "next/image"
import { useRef, useState } from "react"
import Resizer from "react-image-file-resizer"
import { Input } from "./ui/input"
import { Camera } from "lucide-react"
import CropImageDialog from "./CropImageDialog"

export interface AvatarInputProps {
    src: string | StaticImageData
    onImageCropped: (bio: Blob | null) => void
}

export function AvatarInput({ src, onImageCropped }: AvatarInputProps) {
    const [imageToCroop, setImageToCroop] = useState<File>()

    const fileInputRef = useRef<HTMLInputElement>(null)

    function onImageSelect(image: File | null) {
        if (!image) return
        Resizer.imageFileResizer(image, 1024, 1024, "WEBP", 100, 0, (uri) => setImageToCroop(uri as File), "file")
    }

    return (
        <>
            <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageToCroop(e.target.files?.[0])}
                ref={fileInputRef}
                className="hidden sr-only"
            />
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="relative group block"
            >
                <Image src={src} alt="Avatar preview" width={150} height={150} className="size-32 flex-none rounded-2xl object-cover" />
                <span className="absolute inset-0 mx-auto flex size-32 items-center justify-center rounded-full bg-black bg-opacity-30 text-white transition-colors duration-200 group-hover:bg-opacity-25 ">
                    <Camera size={24} />
                </span>
            </button>
            {imageToCroop && (
                <CropImageDialog
                    src={URL.createObjectURL(imageToCroop)}
                    cropAspectRatio={1}
                    onCropped={onImageCropped}
                    onClose={() => {
                        setImageToCroop(undefined)
                        if (fileInputRef.current) {
                            fileInputRef.current.value = ""
                        }
                    }}
                />
            )}
        </>
    )
}