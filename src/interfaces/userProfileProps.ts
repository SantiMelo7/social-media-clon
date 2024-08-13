import { UserDataProps } from "./userData";

export interface UserProfileProps extends UserDataProps {
    loggedInUserId: string
}