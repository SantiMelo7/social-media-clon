import { DialogEditProps } from "@/interfaces/dialogProps";
import { Label } from "@/components/ui/label";
import AvatarImg from "../../../../../../public/assets/avatar-placeholder.png"
import { AvatarInput } from "@/components/layout/AvatarInput";
import DialogUi from "@/components/layout/DialogUi";
import { useState } from "react";
import { useUpdateProfileMutation } from "./mutations";
import { UpdateUserProfile, updateUserProfileSchema } from "@/lib/validation";
import LayoutForm from "@/components/layout/LayoutForm";
import FormFieldProps from "@/components/layout/FormFieldProps";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/layout/LoadingButton";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

export default function DialogEdit({ open, data, onOpenChange }: DialogEditProps) {

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

    return (
        <DialogUi open={open} openChange={onOpenChange} title="Edit Profile" >
            <div className="space-y-1.5">
                <Label>Avatar</Label>
                <AvatarInput onImageCropped={setCroppedAvatar}
                    src={croppedAvatar ? URL.createObjectURL(croppedAvatar) : data.avatarUrl || AvatarImg}
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
                        <LoadingButton variant="default" type="submit" loading={isPending}>
                            Edit Profile
                        </LoadingButton>
                    </>
                )}
            </LayoutForm>
        </DialogUi>
    )
}
