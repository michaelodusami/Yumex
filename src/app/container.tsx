// Container.tsx
"use client";

import { useState } from "react";
import Nav from "@/components/ui/nav";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex">
			<Nav isOpen={isOpen} setIsOpen={setIsOpen} />
			<main
				className={`p-6 transition-margin duration-300 ease-in-out ${
					isOpen ? "ml-64" : "ml-16"
				}`}
			>
				{children}
			</main>
		</div>
	);
};

export default Container;
