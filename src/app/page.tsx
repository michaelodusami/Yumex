"use client";

import Forum from "./ui/Forum";
import AuthenticatedLayout from "./AuthenticatedLayout";
import HomeContainer from "./HomeContainer";
export default function Home() {
	return (
		<HomeContainer>
			<div className="w-full md:w-[100%] lg:w-[100%] min-h-screen mx-auto flex-col flex">
				{/* <ForumSkeleton/> */}
				<Forum />
			</div>
		</HomeContainer>
	);
}
