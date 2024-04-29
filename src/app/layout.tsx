import type { Metadata } from "next";
import { inter, poppins } from "@/components/constants/fonts";
import "./globals.css";
import { AuthProvider } from "@/components/context/AuthProvider";
import { SearchProvider } from "@/components/context/SearchContext";
import Container from "./container";

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
						<Container>{children}</Container>
					</SearchProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
