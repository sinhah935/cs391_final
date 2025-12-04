import Link from "next/link";

export default function Nav() {
    const linkStyling = "p-1 m-2 text-xl hover:underline";
    return (
        <nav className="flex gap-6 text-lg font-semibold text-[#452829]">
            <a href="/" className="hover:underline">Home</a>
            <a href="/portfolio" className="hover:underline">Portfolio</a>
            <a href="/results" className="hover:underline"> Results</a>
        </nav>
    );
}
