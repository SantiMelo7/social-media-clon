"use client"

import { useSession } from "@/app/(main)/SessionProvider";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "../ui/tooltip"
import UserAvatar from "./UserAvatar";
import FollowButton from "../follow/FollowButton";
import LinkiFy from "../linkify/LinkiFy";
import FollowerCount from '../follow/FollowerCount';
import { UserTooltipProps } from "@/interfaces/userTooltipProps";
import { followerState } from "@/util/followerState";
import Links from "../layout/Links";

export default function UserTooltip({ children, user }: UserTooltipProps) {
    const { user: loggedInUser } = useSession()

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent>
                    <div className="flex max-w-80 flex-col gap-3 break-words px-1 py-2.5 md:min-w-52">
                        <div className="flex items-center justify-between gap-2">
                            <Links url={`/users/${user.username}`}>
                                <UserAvatar avatarUrl={user.avatarUrl} size={70} />
                            </Links>
                            {loggedInUser.id !== user.id && (
                                <FollowButton userId={user.id} initialState={followerState(user, loggedInUser.id)} />
                            )}
                        </div>
                        <div>
                            <Links url={`/users/${user.username}`}>
                                <div className="text-lg font-semibold hover:underline">
                                    {user.displayName}
                                </div>
                                <div className="text-muted-foreground">@{user.username}</div>
                            </Links>
                        </div>
                        {user.bio && (
                            <LinkiFy>
                                <div className="whitespace-pre-line overflow-hidden break-words">
                                    {user.bio}
                                </div>
                            </LinkiFy>
                        )}
                        <FollowerCount userId={user.id} initialState={followerState(user, loggedInUser.id)} />
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}