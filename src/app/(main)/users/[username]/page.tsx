import { validateRequest } from "@/auth"
import TrendsSidebar from "@/components/TrendsSidebar"
import { Metadata } from "next"
import UserProfile from "../../UserProfile"
import { getUser } from "@/util/getUser"
import UserPosts from "./post/UsersPost"

export async function generateMetadata({ params: { username } }: PageUserProfileProps): Promise<Metadata> {
    const { user } = await validateRequest()
    if (!user) return {}

    const userLogin = await getUser(username, user.id)

    return {
        title: `${userLogin.displayName} (@${userLogin.id})`,
    }
}

export default async function PageUserProfile({ params: { username } }: PageUserProfileProps) {
    const { user } = await validateRequest()

    if (!user) {
        return (
            <p>You&rsquo;re not authorized to view this page</p>
        )
    }

    const userLogin = await getUser(username, user.id)

    return (
        <main className="flex w-full min-w-0 gap-5">
            <div className="w-full min-w-0 space-y-5">
                <UserProfile user={userLogin} loggedInUserId={user.id} />
                <div className="rounded-2xl bg-card p-5 shadow-sm">
                    <h1 className="text-center text-2xl font-bold">{userLogin.displayName} Posts</h1>
                </div>
                <UserPosts userId={userLogin.id} />
            </div>
            <TrendsSidebar />
        </main>
    )
}

