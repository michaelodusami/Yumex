"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { categoryColors } from "../colors";
import { defaultContentText } from "../texts";
import { ChevronDoubleUpIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { all_routes } from "@/app/lib/routepaths";
import { fetchPostsFromDatabase } from "@/app/lib/data";
import { getFormattedDate } from "@/app/lib/utils";
import Link from "next/link";
import { AsyncImage, AsyncUserEmail } from "@/app/ui/async_components";
import Post from "./Post";

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
					<div className="h-full w-[full] flex items-center">
						<p className=" w-full">Sort By: </p>
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
			<div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
				{posts != null ? (
					posts.map((post) => <Post key={post.id} post={post} />)
				) : (
					<h1 className="w-full text-2xl">No Posts Yet!</h1>
				)}
			</div>
		</div>
	);
};

export default Forum;
