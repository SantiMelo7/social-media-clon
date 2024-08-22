import { childrenNormal } from "./ui";

export interface ContentMainPageProps extends childrenNormal {
    title: string
    isContenMore?: boolean;
    component?: JSX.Element
}
