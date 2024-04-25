"use client";

import Forum from "./ui/Forum";

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

export function HomeContainer({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <main className="min-h-screen">{children}</main>;
}
