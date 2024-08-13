import { Attachment } from "@/interfaces/attachment";
import AttachementPreview from "./AttachementPreview";
import AttachmentContainer from "@/components/layout/AttachmentContainer";

interface AttachmentPreviewsProps {
    attachments: Attachment[]
    removeAttachment: (fileName: string) => void;
}

export default function AttachmentPreviews({ attachments, removeAttachment }: AttachmentPreviewsProps) {
    return (
        <AttachmentContainer attachments={attachments}>
            {attachments.map((text) => (
                <AttachementPreview key={text.file.name} attachment={text} onRemoveClick={() => removeAttachment(text.file.name)} />
            ))}
        </AttachmentContainer>
    )
}