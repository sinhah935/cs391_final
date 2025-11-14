import Link from "next/link";

export default function Nav() {
    const linkStyling = "p-1 m-2 text-xl hover:underline";
    return (
        <nav className="p-2 m-4">
            <ul>
                <li><Link href="/">
                    Home
                </Link></li>

                <li><Link href="/portfolio">
                    Portfolio
                </Link></li>
            </ul>

        </nav>
    );
}