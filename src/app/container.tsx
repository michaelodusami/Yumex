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
import { supabase } from "@/lib/server";
import { ArrowRightEndOnRectangleIconSymbol } from "@/components/ui/symbols";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { session } = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	const [showModal, setShowModal] = useState(false);

	const handleSignOut = async (e: any) => {
		const { error } = await supabase.auth.signOut();
	};

	return (
		<div className="flex-col">
			<div className="border-b-2 p-2">
				<ul className="flex gap-4 justify-center items-center">
					<li>
						<Bars3Icon className="w-[25px] h-[25px] font-bold" />
					</li>
					<li>
						<Link href={"/"}>Yumex</Link>
					</li>
					<li className="flex-1">
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
									className="border p-2 flex gap-2 justify-center items-center rounded-full"
								>
									<ArrowRightEndOnRectangleIconSymbol styles={phoneIconWH} />
									<span className="text-sm">Log in</span>
								</button>
							</li>
						</>
					)}
				</ul>
			</div>
			{/* <Nav isOpen={isOpen} setIsOpen={setIsOpen} /> */}

			{children}
		</div>
	);
};

export default Container;
