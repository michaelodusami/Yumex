"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { categoryColors } from "../colors";
import { defaultContentText } from "../texts";
import { ChevronDoubleUpIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, useContext } from "react";
import { all_routes } from "@/app/lib/routepaths";
import { fetchPostsFromDatabase } from "@/app/lib/data";
import { getFormattedDate } from "@/app/lib/utils";
import Link from "next/link";
import { AsyncImage, AsyncUserEmail } from "@/app/ui/async_components";
import Post from "./Post";
import { SearchContext } from "../SearchContext";
import { Squares2X2Icon } from "@heroicons/react/16/solid";

const Forum: React.FC = () => {
	const { searchQuery } = useContext(SearchContext);
	const [posts, setPosts] = useState<any>(null);
	const [gridStyleToggled] = useState(false);

	useEffect(() => {
		const fetchPost = async () => {
			const data = await fetchPostsFromDatabase();
			setPosts(data);
		};
		fetchPost();
	}, []);

	const filteredPosts = posts?.filter((post) =>
		post.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="container mx-auto px-4 py-8 w-full md:w-[50%]">
			<div className="mb-8">
				<div className="h-8 w-[100%] rounded dark:bg-white ">
					<div className="h-full w-[full] flex items-center">
						<div className="flex-1">
							<button className="hover:rotate-180 transition-all cursor-pointer">
								<Squares2X2Icon className="w-[20px]" />
							</button>
						</div>
						<div className="flex-1 flex items-center">
							<p className="">Sort By: </p>
							<select
								name="sort-post-option"
								id="sort-post-option"
								className="h-full flex-1 rounded-r-sm block"
							>
								<option value="last created">Last Created</option>
								<option value="upvotes">Upvotes</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div className={"grid grid-cols-1 lg:grid-cols-1 gap-4"}>
				{posts != null ? (
					filteredPosts?.map((post) => <Post key={post.id} post={post} />)
				) : (
					<h1 className="w-full text-2xl">No Posts Yet!</h1>
				)}
			</div>
		</div>
	);
};

export default Forum;
