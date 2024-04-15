"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { categoryColors } from "../colors";
import { defaultContentText } from "../texts";
import { ChevronDoubleUpIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { all_routes } from "@/app/lib/routepaths";
import {
	fetchPostsFromDatabase,
	fetchPostImageFromDatbase,
	getUserInfoByIdFromDatabase,
} from "@/app/lib/data";
import { getFormattedDate } from "@/app/lib/utils";
import Link from "next/link";

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

const Forum: React.FC = () => {
	const [posts, setPosts] = useState<any>(null);

	useEffect(() => {
		const fetchPost = async () => {
			const data = await fetchPostsFromDatabase();
			setPosts(data);
		};
		fetchPost();
	}, []);

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<div className="h-8 w-[100%] rounded dark:bg-white ">
					<div className="h-full md:w-[50%] lg:w-[50%] w-[full] flex items-center">
						<p className="lg:w-[10%] w-full">Sort By: </p>
						<select
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
				{posts != null ? (
					posts.map((post) => (
						<div
							key={post.id}
							className="rounded-lg dark:shadow-neutral-800 p-4 shadow relative"
						>
							{/* food image */}
							<Link href={all_routes.post + post.id}>
								<AsyncImage
									filepath={post.post_image_filepath}
									title={post.title}
								/>
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
								<p>Upvotes: {post.upvotes}</p>
								<button
									onClick={(e) => {
										e.stopPropagation();
									}}
								>
									<ChevronDoubleUpIcon className="h-30px] w-[30px] cursor-pointer" />
								</button>
							</div>

							<p className="text-sm italic">
								Posted At: {getFormattedDate(post.created_at)}
							</p>
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
					))
				) : (
					<h1 className="w-full text-2xl">No Posts Yet!</h1>
				)}
			</div>
		</div>
	);
};

export default Forum;
