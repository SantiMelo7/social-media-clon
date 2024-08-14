import { MediaPreviewProps } from "@/interfaces/media"

export function MediaPreview({ media }: MediaPreviewProps) {
    if (media.type === "IMAGE") {
        return (
            <img src={media.url} alt='Attachments' className='mx-auto size-fit object-cover rounded-2xl' />
        )
    }
    if (media.type === "VIDEO") {
        return (
            <div>
                <video src={media.url} controls className='mx-auto size-fit rounded-2xl' />
            </div>
        )
    }
    return <p className='text-destructive'>Unsupported media</p>
}
