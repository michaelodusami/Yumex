import Search from "./search";
import Link from "next/link";
import { poppins } from "./fonts";

export default function Nav() {
  return (
    <div>
        
        <nav className="flex w-full items-center justify-between bg-white p-4">
        <div className="flex items-center w-[20%]">
            <Link href="/create" className={poppins.className + " text-gray-800 hover:text-gray-600"}>
            Create a post
            </Link>
        </div>
        <div className="text-2xl flex-1 text-center font-bold text-gray-800">
            <Link href={"/"} className={poppins.className}>
                Yumex
            </Link>
        </div>
        <Search placeholder="Search..." />
        </nav>
    </div>
    
  );
}