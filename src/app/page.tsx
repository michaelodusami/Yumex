"use client";

import Forum from "./ui/Forum";
export default function Home() {
	return (
		<main className="min-h-screen">
			<div className="w-full md:w-[100%] lg:w-[100%] min-h-screen mx-auto flex-col flex">
				{/* <ForumSkeleton/> */}
				<Forum />
			</div>
		</main>
	);
}
