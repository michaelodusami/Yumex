import type { Metadata } from "next";
import { inter } from "@/app/ui/util/fonts";
import "./globals.css";
import Nav from "@/app/ui/Nav";
import { SearchProvider } from "./ui/context/SearchContext";

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
