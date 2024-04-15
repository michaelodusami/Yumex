"use client";

import Search from "./search";
import Link from "next/link";
import { poppins } from "./fonts";
import { PlusCircleIcon, HomeIcon } from "@heroicons/react/16/solid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "../lib/server";
import { useEffect, useState } from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Nav() {
	const [showProfileIcon, setProfileIcon] = useState(true);

	const handleSignOut = async (e) => {
		setProfileIcon(false);
		const { error } = await supabase.auth.signOut();
	};

	return (
		<nav className="flex w-full md:w-[60%] md:mx-auto lg:mx-auto lg:w-[60%] items-center justify-between p-4">
			<div className="text-2xl font-bold  w-[65%]">
				<Link href={"/"} className={poppins.className}>
					Yumex
				</Link>
			</div>
			<div className="md:flex md:gap-5 items-center flex-1 hidden justify-center">
				<Link href="/" className={poppins.className + "flex-1"}>
					<div className="relative">
						<span className="ml-10">Home</span>
						<HomeIcon className="absolute left-3 top-1/2 h-[20px] w-[20px] -translate-y-1/2" />
					</div>
				</Link>
				<Link href="/create" className={poppins.className + "flex-1"}>
					<div className="relative">
						<span className="ml-10">Create</span>
						<PlusCircleIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
					</div>
				</Link>
				<Search placeholder="Search..." />
				{showProfileIcon && (
					<div className={poppins.className + "flex-1"}>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Avatar>
									<AvatarImage src="https://github.com/shadcn.png" />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem onClick={handleSignOut}>
									Sign Out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				)}
			</div>
		</nav>
	);
}
