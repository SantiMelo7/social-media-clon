"use client";

import { EditorContent, useEditor } from "@tiptap/react"
import StartetKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { submitPost } from "./actions";
import { useSession } from "@/app/(main)/SessionProvider";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import styles from "../../../app/styles/main.module.css"

export default function PostEditor() {

    const { user } = useSession()

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

    async function handleSubmit() {
        await submitPost(input)
        editor?.commands.clearContent()
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
                <Button
                    variant="default"
                    onClick={handleSubmit}
                    disabled={!input.trim()}
                    className={styles.buttonPostCreate}
                >
                    Post
                </Button>
            </div>
        </div>
    )

}