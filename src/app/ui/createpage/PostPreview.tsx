"use client";

import Image from "next/image";
import { postPreviewContentText, postPreviewTitleText, postPreviewImageFile } from "../texts";
import { clsx } from "clsx";
import { getFormattedDate } from "@/app/lib/utils";
import { ChevronDoubleUpIcon } from "@heroicons/react/16/solid";
import { categoryColors } from "../colors";
import { FormData } from "@/app/lib/interfaces";
import { supabase } from "@/app/lib/server";
import { useState, useEffect } from "react";
import { getEmailFromUser } from "@/app/lib/data";
import { getUserNameUpToEmailSymbol } from "@/app/lib/utils";

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
		<div className="rounded-lg dark:shadow-neutral-800 p-4 shadow relative">
			{/* food image */}
			<Image
				src={file !== null ? URL.createObjectURL(file) : postPreviewImageFile}
				width={1296}
				height={728}
				alt={"Sample Preview Image"}
				className="mb-4 h-48 w-full rounded object-cover md:h-[20rem] lg:h-[20rem]"
			/>
			{/* title */}
			<h2 className="mb-2 text-xl font-bold line-clamp-1">
				{title !== "" ? title : postPreviewTitleText}
			</h2>
			{/* content (description) */}
			<p
				className={clsx("mb-4 max-h-10 h-full overflow-hidden", {
					"text-white dark:text-black": content === "",
				})}
			>
				{content !== "" ? content : postPreviewContentText}
			</p>
			{/* user information */}
			<div className="w-full flex justify-between">
				<p>Upvotes: {0}</p>

				<ChevronDoubleUpIcon className="h-30px] w-[30px] cursor-pointer" />
			</div>

			<p className="text-sm italic">
				Posted At: {getFormattedDate(new Date("2023-05-15T10:30:00"))}
			</p>
			<div className="flex items-center space-x-2 mt-5">
				{/* user profile pic */}
				<Image
					src={"/userlogo.png"}
					alt={"logo"}
					width={30}
					height={30}
					className="h-8 w-8 rounded-full"
				/>
				<div className="flex justify-between w-full items-center">
					{/* user who created it */}
					<span className="">
						{userEmail ? getUserNameUpToEmailSymbol(userEmail) : "Temp User"}
					</span>
					{/* category tag of what type of food it is */}
					<span
						style={{
							backgroundColor: categoryColors[category !== "" ? category : "asian"],
						}}
						className="uppercase border rounded-lg p-2 text-black"
					>
						{category !== "" ? category : "asian"}
					</span>
				</div>
			</div>
		</div>
	);
};

export default PostPreview;
