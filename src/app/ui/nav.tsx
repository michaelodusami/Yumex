"use client";

import Search from "./search";
import Link from "next/link";
import { poppins } from "./fonts";
import { PlusCircleIcon, HomeIcon } from "@heroicons/react/24/solid";
import { ProfileDropDown } from "./user_components";
import { supabase } from "../lib/server";
import { useState } from "react";
import { phoneIconWH, navLargeWidth, navMediumWidth } from "./sizes";

export default function Nav() {
	const [showProfileIcon, setProfileIcon] = useState(true);

	const handleSignOut = async (e) => {
		const { error } = await supabase.auth.signOut();
		if (!error) {
			setProfileIcon(false);
		}
	};

	return (
		<nav
			className={
				"mx-auto border-b md:flex md:items-center md:justify-between" +
				navMediumWidth +
				navLargeWidth
			}
		>
			<div className="text-center md:text-left py-2 font-bold text-2xl md:text-3xl md:w-[50%]">
				<Link href={"/"}>Yumex</Link>
			</div>
			<nav className="flex-1">
				<ul className="w-full flex justify-around p-2">
					<li className="flex items-center">
						<Link
							href="/"
							className={"flex-1 md:flex items-center gap-2 cursor-pointer"}
						>
							<HomeIcon className={phoneIconWH} />
							<span className="lg:block hidden">Home</span>
						</Link>
					</li>
					<li className="flex items-center">
						<Link
							href="/create"
							className={"flex-1 md:flex items-center gap-2 cursor-pointer"}
						>
							<PlusCircleIcon className={phoneIconWH} />
							<span className="hidden lg:block">Create Post</span>
						</Link>
					</li>
					<li className="flex items-center md:w-[40%]">
						<Search placeholder="Search..." />
					</li>
					<li className="flex items-center">
						{showProfileIcon && <ProfileDropDown handleSignOut={handleSignOut} />}
					</li>
				</ul>
			</nav>
		</nav>
	);
}
