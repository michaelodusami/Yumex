"use client";

import Image from "next/image";
import { postPreviewContentText, postPreviewTitleText, postPreviewImageFile } from "../util/texts";
import { getFormattedDate } from "@/app/_lib/utils";
import { UpvoteSymbol } from "./symbols";
import { FormData } from "@/app/_lib/interfaces";
import { useState, useEffect } from "react";
import { getEmailFromUser } from "@/app/_lib/data";
import { getUserNameUpToEmailSymbol } from "@/app/_lib/utils";
import Category from "./Category";
import { categoryColors } from "../util/colors";
import { ChatBubbleSymbol } from "./symbols";
import AvatarLogo from "./AvatarLogo";
import { POST_MIN_MAX_HEIGHT, UPVOTE_SYMBOL_WH } from "../util/sizes";

const PostPreview: React.FC<FormData> = ({
	file,
	title,
	content,
	category,
	post_image_filepath,
}) => {
	const [userEmail, setUserEmail] = useState<string | null>(null);

	useEffect(() => {
		const fetchUserEmail = async () => {
			const email = await getEmailFromUser();
			setUserEmail(email);
		};

		fetchUserEmail();
	}, []);

	return (
		<div className="rounded-lg shadow-md p-6 mb-8 transition-all duration-500 ease-in-out hover:shadow-lg">
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center space-x-4">
					<AvatarLogo styles="w-12 h-12 rounded-full" fallback="" src={""} />
					<div>
						<span className="font-semibold text-lg">
							{userEmail ? getUserNameUpToEmailSymbol(userEmail) : "Temp User"}
						</span>

						<p className="text-gray-500 text-sm">
							{getFormattedDate("2023-05-15T10:30:00")}
						</p>
					</div>
				</div>
			</div>

			{/* food image */}
			<Image
				src={file !== null ? URL.createObjectURL(file) : postPreviewImageFile}
				width={1296}
				height={728}
				alt={"Sample Preview Image"}
				className="w-full h-64 object-cover rounded-lg mb-4 hover:opacity-90 transition duration-300"
			/>

			<h2 className="text-2xl font-bold mb-2 line-clamp-1">{title}</h2>
			<p className="text-gray-700 mb-4 line-clamp-3">{content ? content : ""}</p>

			<div className="flex justify-between items-center mb-4">
				<div className="flex items-center space-x-2">
					<span className="flex items-center text-gray-500 hover:text-blue-500 transition duration-300">
						<UpvoteSymbol styles="w-6 h-6 mr-1" />
						<span>{0}</span>
					</span>
					<span className="flex items-center text-gray-500 hover:text-blue-500 transition duration-300">
						<ChatBubbleSymbol styles="w-6 h-6 mr-1" />
						<span>{0}</span>
					</span>
				</div>
				<Category category={category || "asian"} />
			</div>
		</div>
	);
};

export default PostPreview;
