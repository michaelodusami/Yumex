import type { Metadata } from "next";
import { inter, poppins } from "@/app/ui/util/fonts";
import "./globals.css";
import { AuthProvider } from "./ui/provider/AuthProvider";

export const metadata: Metadata = {
	title: "Yumex",
	description: "Created by @modusami on Github",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={poppins.className + "antialiased"}>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
