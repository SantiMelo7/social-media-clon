"use client";

import { EditorContent, useEditor } from "@tiptap/react"
import UserAvatar from "@/components/users/UserAvatar";
import styles from "../../../app/styles/main.module.css"
import LoadingButton from "@/components/layout/LoadingButton";
import useMediaUpload from "./useMediaUpload";
import AddAtachmentButton from "./attachment/AddAtachmentButton";
import AttachmentPreviews from "./attachment/AttachmentPreviews";
import Loading from "@/app/loading";
import { cn } from '../../../lib/utils';
import { useSession } from "@/app/(main)/SessionProvider";
import { useSubmitPostMutation } from "./mutations";
import { useDropzone } from "@uploadthing/react";
import StartetKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { ClipboardEvent } from "react";

export default function PostEditor() {
    const { user } = useSession()
    const mutation = useSubmitPostMutation()
    const { startUpload, attachments, isUploading, uploadProgress, removeAttachment, reset: resetMedia } = useMediaUpload()
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: startUpload
    })

    const { onClick, ...rootProps } = getRootProps()

    const editor = useEditor({
        extensions: [
            StartetKit.configure({ bold: false, italic: false }),
            Placeholder.configure({ placeholder: "Whats crack-a-lacking?" })
        ],
    })

    const input = editor?.getText({ blockSeparator: "\n" }) || ""

    function handleSubmit() {
        mutation.mutate({
            content: input,
            mediaIds: attachments.map(a => a.mediaId).filter(Boolean) as string[]
        }, {
            onSuccess: () => {
                editor?.commands.clearContent();
                resetMedia()
            }
        })
    }

    function onPaste(e: ClipboardEvent<HTMLInputElement>) {
        const files = Array.from(e.clipboardData.items)
            .filter(item => item.kind === "file")
            .map((file) => file.getAsFile()) as File[]
        startUpload(files)
    }


    return (
        <div className={styles.containerPostEditor}>
            <div className={styles.containerUserAndEditor}>
                <UserAvatar avatarUrl={user.avatarUrl} />
                <div {...rootProps} className="w-full">
                    <EditorContent onPaste={onPaste} editor={editor} className={cn(styles.editorContent, isDragActive && "outline-dashed")} />
                </div>
                <input {...getInputProps()} />
            </div>
            {!!attachments.length && (
                <AttachmentPreviews attachments={attachments} removeAttachment={removeAttachment} />
            )}
            <div className={styles.containerButtonPosts}>
                {isUploading && (
                    <div className="flex items-center gap-x-3 mr-2">
                        <span className="text-sm font-semibold text-green-800">{uploadProgress ?? 0}%</span>
                        <Loading className="text-primary" />
                    </div>
                )}
                <AddAtachmentButton onFilesSelected={startUpload} disabled={isUploading || attachments.length >= 5} />
                <LoadingButton variant="default" onClick={handleSubmit}
                    loading={mutation.isPending} disabled={!input.trim() || isUploading}
                    className={styles.buttonPostCreate}
                >
                    Post
                </LoadingButton>
            </div>
        </div>
    )
}
