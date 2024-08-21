import ButtonNavBar, { ButtonNavbarProps } from "./ButtonNavBar"

export interface ButtonContentProps extends ButtonNavbarProps {
    icon: JSX.Element
    data: {
        unreadCount: number
    }
}

export default function ButtonContent({ icon, data, url, title }: ButtonContentProps) {
    return (
        <ButtonNavBar title={title} url={url}>
            <div className="relative">
                {icon}
                {!!data?.unreadCount && (
                    <span className="bg-primary rounded-full absolute -right-2 text-white -top-1 tabular-nums px-1 font-medium text-xs">
                        {data?.unreadCount}
                    </span>
                )}
            </div>
        </ButtonNavBar>
    )
}