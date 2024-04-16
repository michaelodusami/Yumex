"use client";

import { useEffect, useState, useContext } from "react";
import { fetchPostsFromDatabase } from "@/app/lib/data";
import Post from "./Post";
import { SearchContext } from "./SearchContext";
import { Squares2X2Icon } from "@heroicons/react/16/solid";
import { navMediumWidth, navLargeWidth, singleColWidth } from "./sizes";

const Forum: React.FC = () => {
	const { searchQuery } = useContext(SearchContext);
	const [posts, setPosts] = useState<any>(null);
	const [gridStyle, setGridStyle] = useState<Boolean>(false); // toggle grid style (extra functionaloty)
	const [selectedSort, setSelectedSort] = useState("last created");

	useEffect(() => {
		const fetchPost = async () => {
			const data = await fetchPostsFromDatabase(selectedSort);
			setPosts(data);
		};
		fetchPost();
	}, [selectedSort]);

	const handleGridStyleToggled = (e) => {
		e.preventDefault();
		setGridStyle(!gridStyle);
	};

	const filteredPosts = posts?.filter((post) =>
		post.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div
			className={
				"container mx-auto px-4 py-8 w-full duration-500 ease-in-out" +
				(gridStyle ? navLargeWidth + navMediumWidth : singleColWidth)
			}
		>
			<div className="mb-8">
				<div className="h-8 w-[100%] rounded dark:bg-white ">
					<div className="h-full w-[full] flex items-center">
						<div className="flex-1">
							<button
								onClick={handleGridStyleToggled}
								className="hover:rotate-180 duration-500 ease-in-out transition-all cursor-pointer"
							>
								<Squares2X2Icon className="w-[20px]" />
							</button>
						</div>
						<div className="flex-1 flex items-center">
							<p className="">Sort By: </p>
							<select
								name="sort-post-option"
								id="sort-post-option"
								className="h-full flex-1 rounded-r-sm block"
								value={selectedSort}
								onChange={(e) => setSelectedSort(e.target.value)}
							>
								<option value="last created">Last Created</option>
								<option value="upvotes">Upvotes</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div
				className={
					"grid grid-cols-1 gap-4 " + (gridStyle && "md:grid-cols-3 lg:grid-cols-3")
				}
			>
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
