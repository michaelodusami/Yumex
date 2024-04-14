import type { Metadata } from "next";
import { inter } from "@/app/ui/fonts";
import "./globals.css";
import Nav from "./ui/nav";

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
				<Nav />
				{children}
			</body>
		</html>
	);
}
