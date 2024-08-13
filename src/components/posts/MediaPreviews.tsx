import AttachmentContainer from "../layout/AttachmentContainer"
import { MediaPreview } from "./MediaPreview"
import { MediaPreviewsProps } from "@/interfaces/media"

export function MediaPreviews({ attachments }: MediaPreviewsProps) {
    return (
        <AttachmentContainer attachments={attachments}>
            {attachments.map((text) => (
                <MediaPreview key={text.id} media={text} />
            ))}
        </AttachmentContainer>
    )
}