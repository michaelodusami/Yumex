"use client";
import { createContext, useState, ReactNode } from "react";

interface SearchContextProps {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextProps>({
	searchQuery: "",
	setSearchQuery: () => {},
});

interface SearchProviderProps {
	children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
			{children}
		</SearchContext.Provider>
	);
};
