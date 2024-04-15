import type { Metadata } from "next";
import { inter } from "@/app/ui/fonts";
import "./globals.css";
import Nav from "@/app/ui/nav";
import { SearchProvider } from "./ui/SearchContext";

export const metadata: Metadata = {
	title: "Yumex",
	description: "Created by @modusami on Github",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
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
