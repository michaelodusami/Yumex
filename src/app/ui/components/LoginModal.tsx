import { useState } from "react";
import { supabase } from "@/app/lib/server";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../provider/AuthProvider";

const LoginModal: React.FC<{ setShowModal: any }> = ({ setShowModal }) => {
	const { session } = useAuth();

	const closeModal = () => {
		setShowModal(false);
	};

	if (session) {
		return null;
	}

	return (
		<>
			<div className="fixed inset-0 flex items-center justify-center z-50">
				<div className="absolute inset-0 bg-gray-900 opacity-50" onClick={closeModal}></div>
				<div className="relative bg-white p-8 rounded shadow-lg max-w-md w-full">
					<button
						className="absolute top-2 right-2 hover:text-red-500 hover:font-bold flex justify-end  "
						onClick={() => setShowModal !== null && closeModal()}
					>
						<span className="h-5 w-5">
							<XMarkIcon className="" />
						</span>
					</button>

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
		</>
	);
};

export default LoginModal;
