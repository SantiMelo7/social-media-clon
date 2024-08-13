import { Attachment } from "@/interfaces/attachment";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import Image from "next/image";

interface AttachementPreviewProps {
    attachment: Attachment;
    onRemoveClick: () => void;
}

export default function AttachementPreview({ attachment: { file, isUploading }, onRemoveClick }: AttachementPreviewProps) {
    const src = URL.createObjectURL(file)
    return (
        <div className={cn("relative mx-auto size-fit", isUploading && "opacity-50")}>
            {file.type.startsWith("image") ? (
                <Image src={src} alt="Attachment Preview" width={50} height={50} className="size-fit object-cover rounded-2xl max-h-[20rem]" />
            ) : (
                <video controls muted className="size-fit max-h-[30rem] rounded-2xl object-cover">
                    <source src={src} type={file.type} />
                </video>
            )}
            {!isUploading && (
                <button className="absolute right-3 top-3 rounded-full p-1.5 text-background transition-colors hover:bg-foreground/60" onClick={onRemoveClick}>
                    <XIcon size={20} />
                </button>
            )}
        </div>
    )

}