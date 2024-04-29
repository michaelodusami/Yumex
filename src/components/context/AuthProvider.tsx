"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "@/lib/server";

const AuthContext = createContext<any | null>(null);

export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
	const [session, setSession] = useState<any>(null);

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

	return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const authContext = useContext(AuthContext);
	if (!authContext) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return authContext;
};
