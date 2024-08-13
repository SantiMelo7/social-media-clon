import { Media } from "prisma/prisma-client";

export interface MediaPreviewProps {
    media: Media
}

export interface MediaPreviewsProps {
    attachments: Media[]
}

export interface AddAtachmentButtonProps {
    onFilesSelected: (files: File[]) => void;
    disabled: boolean;
}