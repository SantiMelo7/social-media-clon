import { useSession } from "@/app/(main)/SessionProvider"
import { useSubmitPostMutation } from "@/components/posts/editor/mutations"
import useMediaUpload from "@/components/posts/editor/useMediaUpload"
import { useEditor } from "@tiptap/react"
import { useDropzone } from "@uploadthing/react"
import StartetKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { ClipboardEvent } from "react"

export function usePostEditor() {
    const { user } = useSession()
    const mutation = useSubmitPostMutation()
    const { startUpload, attachments, reset: resetMedia } = useMediaUpload()

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

    return { user, handleSubmit, onPaste, rootProps, getInputProps, isDragActive, mutation, input, editor }
}