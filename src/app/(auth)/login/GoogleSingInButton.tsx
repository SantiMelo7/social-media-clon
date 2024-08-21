import { Button } from "@/components/ui/button";
import GoogleIcon from '@mui/icons-material/Google';
import Link from "next/link";

export default function GoogleSingInButton() {
    return (
        <Button variant="outline" asChild
            className="bg-white text-black hover:bg-gray-100 hover:text-black hover:scale-105 rounded-lg"
        >
            <Link href="/login/google" className="flex w-full items-center gap-2">
                <GoogleIcon />
                Sing in with Google
            </Link>
        </Button>
    )
}
