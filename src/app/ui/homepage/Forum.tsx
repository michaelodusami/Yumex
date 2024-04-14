"use client";

import { Post, User } from "../../lib/model";
import {
	getUserName,
	getFormattedDate,
	getSortedPostsByLastCreated,
	getSortedPostsByUpvotes,
} from "@/app/lib/utils";
import Image from "next/image";
import { clsx } from "clsx";
import { categoryColors } from "../colors";
import { defaultContentText } from "../texts";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface ForumProps {
	posts: Post[] | null;
}

const Forum: React.FC<ForumProps> = ({ posts }) => {
	const [initialPosts, setPosts] = useState(posts);

	const handleUpvote = (postId: string) => {
		setPosts((prevPosts) => {
			return prevPosts.map((post) => {
				if (post.id === postId) {
					return {
						...post,
						upvotes: post.upvotes + 1,
					};
				}
				return post;
			});
		});
	};

	const handleSorting = (event) => {
		const sortBy = event.target.value;
		if (sortBy === "last created") {
			setPosts(getSortedPostsByLastCreated());
		} else if (sortBy === "upvotes") {
			setPosts(getSortedPostsByUpvotes());
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<div className="h-8 w-[100%] rounded dark:bg-white ">
					<div className="h-full md:w-[50%] lg:w-[50%] w-[full] flex items-center">
						<p className="lg:w-[10%] w-full">Sort By: </p>
						<select
							onChange={handleSorting}
							name="sort-post-option"
							id="sort-post-option"
							className="h-full lg:w-[30%] md:w-[30%] w-full rounded-r-sm block"
						>
							<option value="last created">Last Created</option>
							<option value="upvotes">Upvotes</option>
						</select>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{initialPosts?.length > 1 ? (
					initialPosts.map((post) => (
						<div
							key={post.id}
							className="rounded-lg dark:shadow-neutral-800 p-4 shadow relative"
						>
							{/* food image */}
							<Image
								src={post.image}
								width={1296}
								height={728}
								alt={post.title}
								className="mb-4 h-48 w-full rounded object-cover md:h-[20rem] lg:h-[30rem]"
							/>
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
								<p>Upvotes: {post.upvotes}</p>
								<button
									onClick={(e) => {
										e.stopPropagation();
										handleUpvote(post.id);
									}}
								>
									<ChevronDoubleUpIcon className="h-30px] w-[30px] cursor-pointer" />
								</button>
							</div>

							<p className="text-sm italic">
								Posted At: {getFormattedDate(post.createdAt)}
							</p>
							<div className="flex items-center space-x-2 mt-5">
								{/* user profile pic */}
								<Image
									src={"/userlogo.png"}
									alt={getUserName(post.user_id)}
									width={30}
									height={30}
									className="h-8 w-8 rounded-full"
								/>
								<div className="flex justify-between w-full items-center">
									{/* user who created it */}
									<span className="">{getUserName(post.user_id)}</span>
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
					))
				) : (
					<h1 className="w-full text-2xl">No Posts Yet!</h1>
				)}
			</div>
		</div>
	);
};

export default Forum;
