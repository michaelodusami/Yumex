"use client";

import { useEffect, useState, useContext } from "react";
import { fetchPostsFromDatabase, fetchPostsFromDatabaseByCategory } from "@/lib/data";
import Post from "./Post";
import { SearchContext } from "../context/SearchContext";
import { Squares2X2Icon } from "@heroicons/react/16/solid";
import { navMediumWidth, navLargeWidth, singleColWidth } from "../util/sizes";
import CategorySelector from "./CategorySelector";
import { useAuth } from "../context/AuthProvider";
import LoginModal from "./LoginModal";

const Forum: React.FC = () => {
	const { searchQuery } = useContext(SearchContext);
	const [posts, setPosts] = useState<any>([]);
	// const [gridStyle, setGridStyle] = useState<Boolean>(false); // toggle grid style (extra functionaloty)
	const [selectedSort, setSelectedSort] = useState("last created");
	const [selectedCategory, setSelectedCategory] = useState("");
	const { session } = useAuth();
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const fetchPost = async () => {
			let data;
			if (selectedCategory !== "") {
				data = await fetchPostsFromDatabaseByCategory(selectedCategory, selectedSort);
			} else {
				data = await fetchPostsFromDatabase(selectedSort);
			}
			setPosts(data);
		};
		fetchPost();
	}, [selectedSort, selectedCategory]);

	// const handleGridStyleToggled = (e) => {
	// 	e.preventDefault();
	// 	setGridStyle(!gridStyle);
	// };

	const filteredPosts = posts?.filter((post: any) =>
		post.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div
			className={
				"container mx-auto px-4 py-8 w-full duration-500 ease-in-out"
				// (gridStyle ? navLargeWidth + navMediumWidth : singleColWidth)
			}
		>
			{showModal && <LoginModal setShowModal={setShowModal} />}
			<div className="mb-8">
				<div className="w-full mb-8">
					<div className="">
						<CategorySelector setSelectedCategory={setSelectedCategory} />
					</div>
				</div>
				<div className="h-8 w-[100%] rounded ">
					<div className="w-full flex items-center">
						{/* <div className="hidden  md:block md:flex-1">
							<button
								onClick={handleGridStyleToggled}
								className="hover:rotate-180 duration-500 ease-in-out transition-all cursor-pointer"
							>
								<Squares2X2Icon className="w-[20px]" />
							</button>
						</div> */}
						<div className="flex items-center">
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
			<div className={"grid grid-cols-1 gap-4 md:grid-cols-3"}>
				{posts.length > 0 ? (
					filteredPosts?.map((post: any) => (
						<Post
							key={post.id}
							post={post}
							session={session}
							setShowModal={setShowModal}
						/>
					))
				) : (
					<div className="w-full">
						<h1 className="w-full text-2xl">Nothing Here Yet!</h1>
					</div>
				)}
			</div>
		</div>
	);
};

export default Forum;
