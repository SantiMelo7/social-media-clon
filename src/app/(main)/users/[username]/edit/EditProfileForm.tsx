import FormFieldProps from "@/components/layout/FormFieldProps";
import LayoutForm from "@/components/layout/LayoutForm";
import LoadingButton from "@/components/layout/LoadingButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDialogEdit } from "@/hooks/useDialog";
import { DialogEditProps } from "@/interfaces/dialogProps";
import { updateUserProfileSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function EditProfileForm({ data, onOpenChange }: DialogEditProps) {
    const { handleSubmit } = useDialogEdit(data, onOpenChange)
    return (
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
    )
}