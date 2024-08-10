import ForYouFeed from '../app/(main)/ForYouFeed';
import FollowingFedd from '../app/(main)/FollowingFedd';
export const dataTabs = [
  {
    key: 1,
    value: "for-you",
    titleTab: "For you",
    renderTab: <ForYouFeed />
  },
  {
    key: 2,
    value: "following",
    titleTab: "Following",
    renderTab: <FollowingFedd />
  }
]