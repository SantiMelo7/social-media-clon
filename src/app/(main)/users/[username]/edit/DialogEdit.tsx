import { DialogEditProps } from "@/interfaces/dialogProps";
import { Label } from "@/components/ui/label";
import AvatarImg from "../../../../../../public/assets/avatar-placeholder.png"
import { AvatarInput } from "@/components/layout/AvatarInput";
import { useDialogEdit } from "@/hooks/useDialog";
import DialogUi from "@/components/layout/DialogUi";
import EditProfileForm from "./EditProfileForm";

export default function DialogEdit({ open, data, onOpenChange }: DialogEditProps) {
    const { croppedAvatar, setCroppedAvatar } = useDialogEdit(data, onOpenChange)
    return (
        <DialogUi open={open} openChange={onOpenChange} title="Edit Profile" >
            <div className="space-y-1.5">
                <Label>Avatar</Label>
                <AvatarInput onImageCropped={setCroppedAvatar}
                    src={croppedAvatar ? URL.createObjectURL(croppedAvatar) : data.avatarUrl || AvatarImg}
                />
            </div>
            <EditProfileForm open={open} data={data} onOpenChange={onOpenChange} />
        </DialogUi>
    )
}
