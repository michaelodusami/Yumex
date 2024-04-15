"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getUserInfoByIdFromDatabase, fetchPostImageFromDatbase } from "../lib/data";

export const AsyncImage: React.FC<{ filepath: string; title: string }> = ({ filepath, title }) => {
	const [imageUrl, setImageUrl] = useState("");

	useEffect(() => {
		const fetchImageUrl = async () => {
			const url = await fetchPostImageFromDatbase(filepath);
			setImageUrl(url.publicUrl);
		};

		fetchImageUrl();
	}, [filepath]);

	return (
		<Image
			loader={() => imageUrl}
			src={imageUrl}
			width={1296}
			height={728}
			alt={title}
			className="mb-4 h-48 w-full rounded object-cover md:h-[20rem] lg:h-[20rem]"
		/>
	);
};

export const AsyncUserEmail: React.FC<{ user_id: string }> = ({ user_id }) => {
	const [userEmail, setUserEmail] = useState<any>("");

	useEffect(() => {
		const fetchUserEmail = async () => {
			const email = await getUserInfoByIdFromDatabase(user_id, "email");
			setUserEmail(email);
		};

		fetchUserEmail();
	}, [user_id]);

	const getUserNameUpToEmailSymbol = () => {
		return userEmail.split("@")[0];
	};

	if (userEmail == "") {
		return null;
	}

	return <>{getUserNameUpToEmailSymbol()}</>;
};
