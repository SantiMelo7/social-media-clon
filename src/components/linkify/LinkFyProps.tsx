import { LinkFyPropsGeneric } from "@/interfaces/linkFyPropsGeneric"
import { LinkIt } from "react-linkify-it"
import UserLinkWithTooltip from "../UserLinkWithTooltip"

export function LinkFyProps({ regex, children }: LinkFyPropsGeneric) {
    return (
        <LinkIt regex={regex} component={(match, key) => {
            const matchContent = match.slice(1)
            return <UserLinkWithTooltip key={key} username={matchContent}>{match}</UserLinkWithTooltip>
        }}>
            {children}
        </LinkIt>
    )
}