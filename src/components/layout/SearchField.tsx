"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import styles from "../app/styles/main.module.css";

export default function SearchField() {
    const router = useRouter()
    function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault()
        const form = ev.currentTarget
        const q = (form.q as HTMLInputElement).value.trim()
        if (!q) return
        router.push(`/search?q=${encodeURIComponent(q)}`)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.containerSearch}>
                <Input name="q" placeholder="Search" className={styles.inputSearch} />
                <SearchIcon className={styles.iconSearch} />
            </div>
        </form>
    )
}