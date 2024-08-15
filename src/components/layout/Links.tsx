import { LinksProps } from "@/interfaces/linksProps";
import Link from "next/link";

export default function Links({ children, className, url }: LinksProps) {
    return (
        <Link suppressContentEditableWarning className={className} href={url || ''}>{children}</Link>
    )
}