"use client";

import Search from "./Search";
import Link from "next/link";
import { PlusCircleIcon, HomeIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { ProfileDropDown } from "./ProfileDropdown";
import { supabase } from "../../lib/server";
import { useState } from "react";
import { phoneIconWH, navLargeWidth, navMediumWidth } from "../constants/sizes";
import { useAuth } from "../context/AuthProvider";
import LoginModal from "./LoginModal";

export default function Nav() {
	const { session } = useAuth();
	const [showModal, setShowModal] = useState(false);

	const handleSignOut = async (e: any) => {
		const { error } = await supabase.auth.signOut();
	};

	return (
		<nav
			className={
				"mx-auto px-4 md:flex md:items-center sm:border-b border-none md:justify-between" +
				navMediumWidth +
				navLargeWidth
			}
		>
			<div className="text-center md:text-left py-2 font-bold text-2xl md:text-3xl md:w-[50%]">
				<Link href={"/"}>Yumex</Link>
			</div>
			<nav className="flex-1">
				{showModal && <LoginModal setShowModal={setShowModal} />}
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
					{session ? (
						<>
							<li className="flex items-center">
								{session && <ProfileDropDown handleSignOut={handleSignOut} />}
							</li>
						</>
					) : (
						<>
							<li className="md:flex items-center cursor-pointer">
								<button
									onClick={(e) => setShowModal(true)}
									className="border p-3 flex gap-2 justify-center items-center rounded-full"
								>
									<ArrowRightEndOnRectangleIcon className={phoneIconWH} />
									<span className="lg:block">Log in</span>
								</button>
							</li>
						</>
					)}
				</ul>
			</nav>
		</nav>
	);
}
