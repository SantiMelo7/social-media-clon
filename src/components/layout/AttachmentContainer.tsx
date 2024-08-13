import { Attachment } from "@/interfaces/attachment";
import { childrenNormal } from "@/interfaces/ui";
import { cn } from "@/lib/utils";
import { Media } from 'prisma/prisma-client';

export interface AttachmentContainerProps extends childrenNormal {
    attachments: Attachment[] | Media[]
}

export default function AttachmentContainer({ attachments, children }: AttachmentContainerProps) {
    return (
        <div className={cn("flex flex-col gap-3", attachments.length > 1 && "sm:grid sm:grid-cols-2")}>
            {children}
        </div>
    )
}