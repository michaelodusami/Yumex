import { useState } from "react";
import { supabase } from "@/app/lib/server";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";

const LoginModal: React.FC<{ setShowModal: any }> = ({ setShowModal }) => {
	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<>
			<div className="fixed inset-0 flex items-center justify-center z-50">
				<div className="absolute inset-0 bg-gray-900 opacity-50" onClick={closeModal}></div>
				<div className="relative bg-white p-8 rounded shadow-lg max-w-md w-full">
					<button
						className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
						onClick={closeModal}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
					<Auth
						supabaseClient={supabase}
						appearance={{ theme: ThemeSupa }}
						providers={[]}
					/>
				</div>
			</div>
		</>
	);
};

export default LoginModal;
