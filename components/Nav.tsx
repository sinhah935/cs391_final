import Link from "next/link";

export default function Nav() {
    const linkStyling = "p-1 m-2 text-xl hover:underline";
    return (
        <nav className="flex gap-6 text-lg font-semibold text-[#452829]">
            <a href="/" className="hover:underline">Home</a>
            <a href="/portfolio" className="hover:underline">Portfolio</a>
            <a href="/about" className="hover:underline"> About Us</a>
            {/*<ul>*/}
            {/*    <li><Link href="/">*/}
            {/*        Home*/}
            {/*    </Link></li>*/}

            {/*    <li><Link href="/portfolio">*/}
            {/*        Portfolio*/}
            {/*    </Link></li>*/}
            {/*</ul>*/}
        </nav>
    );
}
