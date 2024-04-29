import type { Metadata } from "next";
import { inter, poppins } from "@/app/_ui/util/fonts";
import "./globals.css";
import { AuthProvider } from "./_ui/provider/AuthProvider";
import { SearchProvider } from "./_ui/context/SearchContext";
import Nav from "./nav";

export const metadata: Metadata = {
	title: "Yumex",
	description: "Created by @modusami on Github",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={poppins.className + "antialiased"}>
				<AuthProvider>
					<SearchProvider>
						<Nav />
						{children}
					</SearchProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
