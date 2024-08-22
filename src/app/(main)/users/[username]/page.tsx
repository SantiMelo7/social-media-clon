import { validateRequest } from "@/auth"
import { Metadata } from "next"
import UserProfile from "../../UserProfile"
import { getUser } from "@/util/getUser"
import UserPosts from "./post/UsersPost"
import ContentMainPage from "@/components/layout/ContentMainPage"

export async function generateMetadata({ params: { username } }: PageUserProfileProps): Promise<Metadata> {
    const { user } = await validateRequest()
    if (!user) return {}

    const userLogin = await getUser(username, user.id)

    return {
        title: `${userLogin.displayName} (@${userLogin.id})`,
    }
}

export default async function PageUserProfile({ params: { username } }: PageUserProfileProps) {
    const { user: loggedInUserId } = await validateRequest()

    if (!loggedInUserId) {
        return (
            <p>You&rsquo;re not authorized to view this page</p>
        )
    }

    const user = await getUser(username, loggedInUserId.id)

    return (
        <ContentMainPage title={`${user.displayName} Posts`} isContenMore component={<UserProfile user={user} loggedInUserId={loggedInUserId.id} />}>
            <UserPosts userId={user.id} />
        </ContentMainPage>
    )
}
