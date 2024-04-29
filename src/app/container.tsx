// Container.tsx
"use client";

import { useState } from "react";
import Nav from "@/components/ui/nav";
import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Search from "@/components/ui/Search";
import { phoneIconWH } from "@/components/constants/sizes";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/components/context/AuthProvider";
import ProfileDropDown from "@/components/ui/ProfileDropdown";
import { kalam } from "@/components/constants/fonts";
import { supabase } from "@/lib/server";
import LoginModal from "@/components/ui/LoginModal";
import { ArrowRightEndOnRectangleIconSymbol } from "@/components/ui/symbols";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { session } = useAuth();
	// const [isOpen, setIsOpen] = useState(false);

	const [showModal, setShowModal] = useState(false);

	const handleSignOut = async (e: any) => {
		const { error } = await supabase.auth.signOut();
	};

	return (
		<div className="flex-col w-full ">
			{showModal && <LoginModal setShowModal={setShowModal} />}
			<div className="shadow-sm px-5 py-2 bg-white relative">
				{/* <Nav isOpen={isOpen} setIsOpen={setIsOpen} /> */}
				<ul className="flex gap-5 justify-center items-center">
					{/* <li onClick={(e) => setIsOpen(!isOpen)}>
						<Bars3Icon className="w-[25px] h-[25px] font-bold" />
					</li> */}
					<li>
						<Link href={"/"}>
							<span className={kalam.className + " font-bold text-[1.2rem]"}>
								Yumex
							</span>
						</Link>
					</li>
					<li className="md:min-w-[50%] ml-auto mr-auto">
						<Search placeholder="Search..." />
					</li>
					<li>
						<Link
							href="/create"
							className={
								"flex-1 flex justify-center items-center gap-2 cursor-pointer"
							}
						>
							<PlusIcon className={phoneIconWH} />
							<span className="text-sm">Create Post</span>
						</Link>
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
									className=" flex gap-2 justify-center items-center"
								>
									<ArrowRightEndOnRectangleIconSymbol styles={phoneIconWH} />
									<span className="text-sm">Log in</span>
								</button>
							</li>
						</>
					)}
				</ul>
			</div>

			{children}
		</div>
	);
};

export default Container;
