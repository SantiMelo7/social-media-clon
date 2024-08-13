"use client";

import { EditorContent, useEditor } from "@tiptap/react"
import StartetKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { useSession } from "@/app/(main)/SessionProvider";
import UserAvatar from "@/components/users/UserAvatar";
import styles from "../../../app/styles/main.module.css"
import { useSubmitPostMutation } from "./mutations";
import LoadingButton from "@/components/layout/LoadingButton";
import useMediaUpload from "./useMediaUpload";

export default function PostEditor() {

    const { user } = useSession()

    const mutation = useSubmitPostMutation()

    const { startUpload, attachments, isUploading, uploadProgress, removeAttachment, reset } = useMediaUpload()

    const editor = useEditor({
        extensions: [
            StartetKit.configure({
                bold: false,
                italic: false,
            }),
            Placeholder.configure({
                placeholder: "Whats crack-a-lacking?"
            })
        ],
    })

    const input = editor?.getText({
        blockSeparator: "/n"
    }) || ""

    function handleSubmit() {
        mutation.mutate({
            content: input,
            mediaIds: attachments.map(a => a.mediaId).filter(Boolean) as string[],
        }, {
            onSuccess: () => {
                editor?.commands.clearContent()
            }
        })
    }

    return (
        <div className={styles.containerPostEditor}>
            <div className={styles.containerUserAndEditor}>
                <UserAvatar avatarUrl={user.avatarUrl} className={styles.userAvatarResponsive} />
                <EditorContent
                    editor={editor}
                    className={styles.editorContent}
                />
            </div>
            <div className={styles.containerButtonPosts}>
                <LoadingButton
                    variant="default"
                    onClick={handleSubmit}
                    loading={mutation.isPending}
                    disabled={!input.trim()}
                    className={styles.buttonPostCreate}
                >
                    Post
                </LoadingButton>
            </div>
        </div>
    )

}