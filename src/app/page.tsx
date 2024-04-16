"use client";

import Image from "next/image";
import { ForumSkeleton } from "./ui/skeletons";
import Forum from "./ui/Forum";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/app/lib/server";
import { useState, useEffect } from "react";

export default function Home() {
	const [session, setSession] = useState(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, []);

	if (!session) {
		return (
			<HomeContainer>
				<div className="w-full lg:w-[50%] mt-5 mx-auto">
					<div className="min-h-[80%] mx-auto border p-5 rounded-md">
						<h1>Sign In</h1>
						<Auth
							supabaseClient={supabase}
							appearance={{ theme: ThemeSupa }}
							providers={[]}
						/>
					</div>
				</div>
			</HomeContainer>
		);
	}

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
