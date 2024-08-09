export interface InfiniteScrollContainerProps extends React.PropsWithChildren {
    onBottomReached: () => void;
    className?: string;
}
