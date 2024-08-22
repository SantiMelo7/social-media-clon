import { Metadata } from "next"
import SearchResults from "./SearchResults"
import ContentMainPage from "@/components/layout/ContentMainPage"

export interface SearchPageProps {
    searchParams: { q: string }
}

export async function generateMetadata({ searchParams: { q } }: SearchPageProps): Promise<Metadata> {
    return {
        title: `Search results for ${q}`,
    }
}

export default function SearchPage({ searchParams: { q } }: SearchPageProps) {
    return (
        <ContentMainPage title="Search result for &quot;{q}&quot;">
            <SearchResults query={q} />
        </ContentMainPage>
    )
}