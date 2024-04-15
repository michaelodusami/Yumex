"use client";

import Image from "next/image";
import { defaultContentText } from "../texts";
import { clsx } from "clsx";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import { AsyncImage, AsyncUserEmail } from "@/app/ui/async_components";
import Link from "next/link";
import { all_routes } from "@/app/lib/routepaths";
import { getFormattedDate } from "@/app/lib/utils";
import { categoryColors } from "../colors";
import { increaseUpvotes } from "@/app/lib/data";
import { useState } from "react";

const Post: React.FC<{ post: any }> = ({ post }) => {
	const [postUpvotes, setPostUpvotes] = useState<any>(post.upvotes);

	const handleUpvotes = (e) => {
		if (postUpvotes !== null) {
			e.preventDefault();
			increaseUpvotes(post.id, postUpvotes + 1);
			setPostUpvotes(postUpvotes + 1);
		}
	};

	return (
		<div key={post.id} className="rounded-lg dark:shadow-neutral-800 p-4 shadow relative">
			{/* food image */}
			<Link href={all_routes.post + post.id}>
				<AsyncImage filepath={post.post_image_filepath} title={post.title} />
			</Link>

			{/* title */}
			<h2 className="mb-2 text-xl font-bold line-clamp-1">{post.title}</h2>
			{/* content (description) */}
			<p
				className={clsx("mb-4 max-h-10 h-full overflow-hidden", {
					"text-white dark:text-black": post.content === "",
				})}
			>
				{post.content ? post.content : defaultContentText}
			</p>
			{/* user information */}
			<div className="w-full flex justify-between">
				<p>Upvotes: {postUpvotes}</p>
				<button onClick={handleUpvotes}>
					<ChevronDoubleUpIcon className="h-30px] w-[30px] cursor-pointer" />
				</button>
			</div>

			<p className="text-sm italic">Posted At: {getFormattedDate(post.created_at)}</p>
			<div className="flex items-center space-x-2 mt-5">
				{/* user profile pic */}
				<Image
					src={"/userlogo.png"}
					alt={""}
					width={30}
					height={30}
					className="h-8 w-8 rounded-full"
				/>
				<div className="flex justify-between w-full items-center p-2">
					{/* user who created it */}
					<span className="">
						<AsyncUserEmail user_id={post.user_id} />
					</span>
					{/* category tag of what type of food it is */}
					<span
						style={{ backgroundColor: categoryColors[post.category] }}
						className="uppercase border rounded-lg p-2 text-black"
					>
						{post.category}
					</span>
				</div>
			</div>
		</div>
	);
};

export default Post;
