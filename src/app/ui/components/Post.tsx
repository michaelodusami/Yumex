"use client";

import { defaultContentText } from "../util/texts";
import {
	EllipsisHorizontalCircleIcon,
	ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import { AsyncImage, AsyncUserEmail } from "@/app/ui/components/async_components";
import Link from "next/link";
import { all_routes } from "@/app/lib/model";
import { getFormattedDate } from "@/app/lib/utils";
import { categoryColors } from "../util/colors";
import { increaseUpvotes, getIdFromUser, deletePost } from "@/app/lib/data";
import { useEffect, useState } from "react";
import { UpvoteSymbol } from "./symbols";
import AvatarLogo from "./AvatarLogo";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { POST_MIN_MAX_HEIGHT, UPVOTE_SYMBOL_WH } from "../util/sizes";

const Post: React.FC<{ post: any }> = ({ post }) => {
	const [postUpvotes, setPostUpvotes] = useState<any>(post.upvotes);
	const [showEditDeleteButton, setEditDeleteButton] = useState(false);

	const handleUpvotes = (e) => {
		if (postUpvotes !== null) {
			e.preventDefault();
			increaseUpvotes(post.id, postUpvotes + 1);
			setPostUpvotes(postUpvotes + 1);
		}
	};

	useEffect(() => {
		const checkifUserHasPost = async () => {
			// get the user id and if the post id mactehs user id then ya
			const user_id = await getIdFromUser();
			if (post.user_id == user_id) {
				setEditDeleteButton(true);
			} else {
				setEditDeleteButton(false);
			}
		};
		checkifUserHasPost();
	}, [post.user_id]);

	const handleDeletePost = async () => {
		await deletePost(post.id, post.post_image_filepath);
		window.location = all_routes.home;
		window.alert("Post Deleted");
	};

	return (
		<div
			key={post.id}
			className="rounded-lg dark:shadow-neutral-800 p-4 shadow relative transition-all duration-500 ease-in-out"
		>
			<div className="w-full lg:w-[95%] mx-auto">
				{/* food image */}
				<Link href={all_routes.post + post.id}>
					<AsyncImage filepath={post.post_image_filepath} title={post.title} />
				</Link>

				<div className="flex w-full justify-between">
					<div>
						{/* title */}
						<h2 className="mb-2 text-xl font-bold line-clamp-1">{post.title}</h2>
					</div>
					{showEditDeleteButton && (
						<div>
							<DropdownMenu>
								<DropdownMenuTrigger>
									<EllipsisHorizontalCircleIcon className="w=[25px] h-[25px]" />
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>Post Options</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={handleDeletePost}>
										Delete Post
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					)}
				</div>

				{/* content (description) */}
				<p className={"mb-4 overflow-hidden" + POST_MIN_MAX_HEIGHT}>
					{post.content ? post.content : defaultContentText}
				</p>
				{/* user information */}
				<div className="w-full flex justify-between">
					<p>Upvotes: {postUpvotes}</p>
					<button onClick={handleUpvotes}>
						<UpvoteSymbol styles={"cursor-pointer" + UPVOTE_SYMBOL_WH} />
					</button>
				</div>

				<p className="text-sm italic">Posted At: {getFormattedDate(post.created_at)}</p>
				<div className="flex space-x-2 mt-5">
					{/* user profile pic */}
					<AvatarLogo />
					<div className="flex justify-between w-full items-center">
						{/* user who created it */}
						<span className="block">
							<AsyncUserEmail user_id={post.user_id} />
						</span>
						{/* category tag of what type of food it is */}
						<span
							style={{ backgroundColor: categoryColors[post.category] }}
							className="uppercase border block rounded-lg p-2 text-black"
						>
							{post.category}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
