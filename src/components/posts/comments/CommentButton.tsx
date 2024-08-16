import { PostProps } from "@/interfaces/postProps";
import { MessageSquare } from "lucide-react";

interface CommentButtonProps extends PostProps {
    onClick: () => void;
}

export function CommentButton({ post, onClick }: CommentButtonProps) {
    return (
        <button onClick={onClick} className='flex items-center gap-3'>
            <MessageSquare className='size-5' />
            <span className='text-sm font-medium tabular-nums'>
                {post._count.comments}{" "}
                <span className='hidden sm:inline'>comments</span>
            </span>
        </button>
    )
}