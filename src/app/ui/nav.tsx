import Search from "./search";
import Link from "next/link";
import { poppins } from "./fonts";
import { PlusCircleIcon, HomeIcon } from "@heroicons/react/16/solid";

export default function Nav() {
  return (

        
        <nav className="flex w-full items-center justify-between  p-4 ">
        <div className="md:flex md:gap-5 items-center w-[20%] hidden">
            <Link href="/" className={poppins.className}>
                <div className="relative">
                <span className="ml-10">Home</span>
                <HomeIcon className="absolute left-3 top-1/2 h-[20px] w-[20px] -translate-y-1/2"/>
                </div>
             
            </Link>
            <Link href="/create" className={poppins.className}>
                <div className="relative">
                <span className="ml-10">Create</span>
                <PlusCircleIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2"/>
                </div>
             
            </Link>
        </div>
        <div className="text-2xl flex-1 md:text-center font-bold">
            <Link href={"/"} className={poppins.className}>
                Yumex
            </Link>
        </div>
        <Search placeholder="Search..." />
        </nav>
 
    
  );
}