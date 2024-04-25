import Nav from "@/app/ui/nav";
import { Auth } from "@supabase/auth-ui-react";
import { SearchProvider } from "./ui/context/SearchContext";
import { HomeContainer } from "./page";
import { supabase } from "./lib/server";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useAuth } from "./ui/provider/AuthProvider";

export default function AuthenticatedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const { session } = useAuth();

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
		<SearchProvider>
			<Nav />
			{children}
		</SearchProvider>
	);
}
