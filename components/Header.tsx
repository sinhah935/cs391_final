import Nav from "@/components/Nav";

export default function Header() {
    return (
        <header className="w-full bg-white shadow-sm py-4 px-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#452829]">
                Stock Portfolio
            </h1>

            <Nav />
        </header>
    );
}