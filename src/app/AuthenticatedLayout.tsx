import Nav from "@/app/ui/nav";
import { Auth } from "@supabase/auth-ui-react";
import { SearchProvider } from "./ui/context/SearchContext";
import HomeContainer from "@/app/HomeContainer";
import { supabase } from "./lib/server";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useAuth } from "./ui/provider/AuthProvider";
import { poppins } from "./ui/util/fonts";
import "@/app/ui/styles/loginstyles.css";

export default function AuthenticatedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const { session } = useAuth();

	if (!session) {
		return (
			<HomeContainer>
				<div className="loginbgimage">
					<div
						className={
							poppins.className +
							" flex justify-center items-center min-h-screen bg-black bg-opacity-50"
						}
					>
						<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg m-3">
							<div className="mb-8">
								<h1 className="text-4xl font-bold text-center text-black">Yumex</h1>
							</div>
							<div>
								{/* <h2 className="mb-4 text-2xl font-semibold">Welcome</h2> */}
								<Auth
									supabaseClient={supabase}
									appearance={{ theme: ThemeSupa }}
									providers={[]}
								/>
							</div>
						</div>
					</div>
				</div>
			</HomeContainer>
		);
	}

	return (
		<SearchProvider>
			<Nav />
			{children}
		</SearchProvider>
	);
}
