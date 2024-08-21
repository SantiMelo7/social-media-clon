import { User } from "lucia";

export const getFilters = (user: User) => ({
    type: "messaging",
    members: { $in: [user.id] }
});

export const getOptions = () => ({ state: true, presence: true, limit: 8 });

export const getSort = { last_message_at: -1 };

export const getAdditionalChannelSearchProps = (user: User) => ({
    searchForChannels: true,
    searchQueryParams: {
        channelFilters: {
            filters: {
                members: { $in: [user.id] }
            }
        }
    }
});