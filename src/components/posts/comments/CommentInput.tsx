import { PostProps } from "@/interfaces/postProps";
import React, { useState } from "react";
import { useCommentsPostMutation } from "./mutations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import Loading from "@/app/loading";


export default function CommentInput({ post }: PostProps) {
    const [input, setInput] = useState("")
    const mutation = useCommentsPostMutation(post.id)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!input) return
        mutation.mutate({ post, content: input }, { onSuccess: () => setInput("") })
    }

    return (
        <form className="flex w-full items-center gap-2" onSubmit={handleSubmit}>
            <Input
                placeholder="Show a comment..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
            />
            <Button type="submit" variant="ghost" size="icon" disabled={!input.trim() || mutation.isPending}>
                {!mutation.isPending ? (
                    <SendHorizonal />
                ) : <Loading />}
            </Button>
        </form>
    )
}