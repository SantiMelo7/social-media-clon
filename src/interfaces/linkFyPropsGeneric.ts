import { childrenNormal } from "./ui"
import { UrlProps } from "./urlProps";

export interface LinkFyPropsGeneric extends childrenNormal, UrlProps {
    regex: RegExp;
}