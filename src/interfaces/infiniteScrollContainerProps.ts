import { ClassNameProps } from "./classNameProps";

export interface InfiniteScrollContainerProps extends React.PropsWithChildren, ClassNameProps {
    onBottomReached: () => void;
}
