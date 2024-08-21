import TrendsSidebar from "@/components/layout/TrendsSidebar"
import { Metadata } from "next"
import SearchResults from "./SearchResults"

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
        <main className="flex w-full min-w-0 gap-5">
            <div className="w-full min-w-0 space-y-5">
                <div className="rounded-2xl bg-card p-5 shadow-sm">
                    <h1 className="text-center text-2xl font-bold">Search result for &quot;{q}&quot;</h1>
                </div>
                <SearchResults query={q} />
            </div>
            <TrendsSidebar />
        </main>
    )
}