import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DialogEditProps } from "@/interfaces/dialogProps";
import { UpdateUserProfile, updateUserProfileSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProfileMutation } from "./mutations";
import LayoutForm from "@/components/layout/LayoutForm";
import { Input } from "@/components/ui/input";
import FormFieldProps from "@/components/layout/FormFieldProps";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/LoadingButton";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import AvatarImg from "../../../../../../public/assets/avatar-placeholder.png"
import { AvatarInput } from "@/components/AvatarInput";

export default function DialogEdit({ open, data, onOpenChange }: DialogEditProps) {

    const mutation = useUpdateProfileMutation()

    const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null)

    async function handleSubmit(values: UpdateUserProfile) {
        const newAvatarFile = croppedAvatar ? new File([croppedAvatar], `avatar_${data.id}.webp`)
            : undefined

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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-1.5">
                    <Label>Avatar</Label>
                    <AvatarInput
                        src={croppedAvatar ? URL.createObjectURL(croppedAvatar) : data.avatarUrl || AvatarImg}
                        onImageCropped={setCroppedAvatar}
                    />
                </div>
                <LayoutForm className="space-y-3" onSubmit={handleSubmit} defaultValues={{ username: data.username, displayName: data.displayName, bio: data.bio || "" }} resolver={zodResolver(updateUserProfileSchema)}>
                    {({ isPending, ...form }) => (
                        <>
                            <FormFieldProps name="username" form={form} label="Username">
                                {(field) => <Input placeholder="Ingresa tu nuevo nombre" {...field} />}
                            </FormFieldProps>
                            <FormFieldProps name="displayName" form={form} label="Display name">
                                {(field) => <Input placeholder="Ingresa tu nuevo nombre de usuario" {...field} />}
                            </FormFieldProps>
                            <FormFieldProps name="bio" form={form} label="Bio">
                                {(field) => <Textarea placeholder="Ingresa tu nueva biografía" {...field} />}
                            </FormFieldProps>
                            <DialogFooter>
                                <LoadingButton variant="default" type="submit" loading={isPending}>
                                    Edit Profile
                                </LoadingButton>
                            </DialogFooter>
                        </>
                    )}
                </LayoutForm>
            </DialogContent>
        </Dialog>
    )
}
