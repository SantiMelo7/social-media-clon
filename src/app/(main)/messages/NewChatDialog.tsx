"use client"

import DialogUi from "@/components/layout/DialogUi";
import { useToast } from "@/components/ui/use-toast";
import { NewChatDialogProps } from "@/interfaces/dialogProps";
import { DefaultStreamChatGenerics, useChatContext } from "stream-chat-react";
import { useSession } from "../SessionProvider";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { UserResponse } from "stream-chat";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import Loading from "@/app/loading";
import LoadingButton from "@/components/layout/LoadingButton";
import { UserResult } from "./UserResult";
import { SelectedUser } from "./SelectedUser";
import styles from "../../../app/styles/messages.module.css"

export default function NewChatDialog({ open, onOpenChange, onChatCreated }: NewChatDialogProps) {

    const { client, setActiveChannel } = useChatContext()
    const { toast } = useToast()
    const { user: loggedInUser } = useSession()
    const [searchInput, setSearchInput] = useState("")

    const searchInputDebounced = useDebounce(searchInput)

    const [selectedUsers, setSelectedUsers] = useState<
        UserResponse<DefaultStreamChatGenerics>[]
    >([])

    const { data, isFetching, isError, isSuccess, status } = useQuery({
        queryKey: ["stream-users", searchInputDebounced],
        queryFn: async () => client.queryUsers({
            id: { $ne: loggedInUser.id },
            role: { $ne: "admin" },
            ...(searchInputDebounced ? {
                $or: [
                    { name: { $autocomplete: searchInputDebounced } },
                    { username: { $autocomplete: searchInputDebounced } },]
            } : {})
        }, { name: 1, username: 1 }, { limit: 15 })
    })

    const mutation = useMutation({
        mutationFn: async () => {
            const channel = client.channel("messaging", {
                members: [loggedInUser.id, ...selectedUsers.map(u => u.id)],
                name: selectedUsers.length > 1
                    ? loggedInUser.displayName + ", " + selectedUsers.map(u => u.name).join(", ")
                    : undefined,
            })
            await channel.create()
            return channel
        },
        onSuccess: (channel) => {
            setActiveChannel(channel)
            onChatCreated()
        },
        onError(error) {
            console.log(error);
            toast({
                variant: "destructive",
                description: "Error starting chat. Please try again."
            })
        },
    })

    return (
        <DialogUi open={open} openChange={onOpenChange} title="New chat" dialogFooter
            childrenFooter={
                <LoadingButton
                    disabled={!selectedUsers.length}
                    loading={mutation.isPending}
                    onClick={() => mutation.mutate()}
                >Start Chart</LoadingButton>
            }
        >
            <div>
                <div className={`group ${styles.containerSearch}`}>
                    <SearchIcon className={styles.searchIcon} />
                    <input placeholder="Search Users..." value={searchInput}
                        className={styles.inputSearch}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
                {!!selectedUsers.length && (
                    <div className={styles.containerSelected}>
                        {selectedUsers.map((text) => (
                            <SelectedUser key={text.id} user={text}
                                onClick={() => {
                                    setSelectedUsers((prev) => prev.filter((u) => u.id !== text.id))
                                }}
                            />
                        ))}
                    </div>
                )}
                <hr />
                <div className={styles.containerDataSearch}>
                    {isSuccess && (
                        data.users.map(text => (
                            <UserResult
                                key={text.id}
                                user={text}
                                selected={selectedUsers.some(u => u.id === text.id)}
                                onClick={() => {
                                    setSelectedUsers((prev) =>
                                        prev.some((u) => u.id === text.id)
                                            ? prev.filter((u) => u.id !== text.id)
                                            : [...prev, text]
                                    )
                                }}
                            />
                        ))
                    )}
                    {isSuccess && !data.users.length && (
                        <p className={`${styles.textDefine} ${styles.textNotUserSelect}`}>No users found, Try different name</p>
                    )}
                    {isFetching && <Loading />}
                    {isError && (
                        <p className={`${styles.textDefine} ${styles.textError}`}>An error ocurred while loading where</p>
                    )}
                </div>
            </div >
        </DialogUi >
    )
}
