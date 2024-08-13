import { useUpdateProfileMutation } from "@/app/(main)/users/[username]/edit/mutations"
import { useDeletePostMutation } from "@/components/posts/delete/mutation"
import { UserData } from "@/lib/types"
import { UpdateUserProfile } from "@/lib/validation"
import { useState } from "react"

export function useDialogEdit(data: UserData, onOpenChange: (open: boolean) => void) {
    const mutation = useUpdateProfileMutation()
    const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null)

    async function handleSubmit(values: UpdateUserProfile) {
        const newAvatarFile = croppedAvatar ? new File([croppedAvatar], `avatar_${data.id}.webp`) : undefined
        mutation.mutate(
            { values, avatar: newAvatarFile },
            {
                onSuccess: () => {
                    setCroppedAvatar(null)
                    onOpenChange(false)
                }
            }
        )
    }

    return { croppedAvatar, setCroppedAvatar, handleSubmit }
}

export function useDialogDelete(onClose: () => void) {
    const mutation = useDeletePostMutation()
    function handleOpenChange(open: boolean) {
        if (!open || !mutation.isPending) {
            onClose()
        }
    }
    return { mutation, handleOpenChange }
}