import type { Metadata } from "next";
import { inter } from "@/app/ui/util/fonts";
import "./globals.css";
import Nav from "@/app/ui/nav";
import { useAuth, AuthProvider } from "./ui/provider/AuthProvider";
import { Auth } from "@supabase/auth-ui-react";
import { SearchProvider } from "./ui/context/SearchContext";
import { HomeContainer } from "./page";
import { supabase } from "./lib/server";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export const metadata: Metadata = {
	title: "Yumex",
	description: "Created by @modusami on Github",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { session } = useAuth();

	if (!session) {
		return (
			<html lang="en">
				<body className={inter.className + "antialiased"}>
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
				</body>
			</html>
		);
	}

	return (
		<html lang="en">
			<body className={inter.className + "antialiased"}>
				<SearchProvider>
					<Nav />
					{children}
				</SearchProvider>
			</body>
		</html>
	);
}
