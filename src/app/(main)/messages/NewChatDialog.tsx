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
                <div className="group relative">
                    <SearchIcon
                        className="absolute left-5 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground group-focus-within:text-primary"
                    />
                    <input
                        placeholder="Search Users..."
                        className="h-12 w-full p-4 ps-14 focus:outline-primary"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
                {!!selectedUsers.length && (
                    <div className="mt-4 flex flex-wrap gap-2 p-2">
                        {selectedUsers.map((text) => (
                            <SelectedUser
                                key={text.id}
                                user={text}
                                onClick={() => {
                                    setSelectedUsers((prev) => prev.filter((u) => u.id !== text.id))
                                }}
                            />
                        ))}
                    </div>
                )}
                <hr />
                <div className="h-96 overflow-y-auto">
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
                        <p className="my-3 text-center text-muted-foreground">No users found, Try different name</p>
                    )}
                    {isFetching && <Loading />}
                    {isError && (
                        <p className="my-3 text-center text-destructive">An error ocurred while loading where</p>
                    )}
                </div>
            </div>
        </DialogUi>
    )
}
