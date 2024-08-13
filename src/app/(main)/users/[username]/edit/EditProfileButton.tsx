"use client";

import { Button } from "@/components/ui/button";
import { UserDataProps } from "../../../../../interfaces/userData";
import { useState } from "react";
import DialogEdit from "./DialogEdit";

export default function EditProfileButton({ user }: UserDataProps) {
    const [shwoDialog, setShowDialog] = useState(false)

    return (
        <>
            <Button variant="outline" onClick={() => setShowDialog(true)}>
                Edit Profile
            </Button>
            <DialogEdit data={user} open={shwoDialog} onOpenChange={setShowDialog} />
        </>
    )
}