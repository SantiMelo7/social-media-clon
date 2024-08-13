import { UserData } from "@/lib/types";

export interface UserProfileProps extends UserData {
    loggedInUserId: string
}