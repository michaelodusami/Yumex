"use client";

import { defaultContentText } from "../util_ui/texts";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { AsyncImage, AsyncUserEmail } from "@/components/ui/async_components";
import Link from "next/link";
import { all_routes } from "@/lib/model";
import { getFormattedDate } from "@/lib/utils";
import { categoryColors } from "../util_ui/colors";
import { increaseUpvotes, getIdFromUser, getComments } from "@/lib/data";
import { useEffect, useState } from "react";
import { ChatBubbleSymbol, UpvoteSymbol } from "./symbols";
import AvatarLogo from "./AvatarLogo";
import { useAuth } from "../context/AuthProvider";
import { POST_MIN_MAX_HEIGHT, UPVOTE_SYMBOL_WH } from "../util_ui/sizes";

const Post: React.FC<{ post: any; session: any; setShowModal: any }> = ({
	post,
	session,
	setShowModal,
}) => {
	const [postUpvotes, setPostUpvotes] = useState<any>(post.upvotes);
	const [postCommentsCounter, setPostCommentsCounter] = useState<number>(0);

	const handleUpvotes = (e: any) => {
		if (session && postUpvotes !== null) {
			e.preventDefault();
			increaseUpvotes(post.id, postUpvotes + 1);
			setPostUpvotes(postUpvotes + 1);
		} else {
			setShowModal(true);
		}
	};

	useEffect(() => {
		const updatePostCounter = async () => {
			const comments = await getComments(post.id);
			setPostCommentsCounter(comments.data?.length || 0);
		};
		updatePostCounter();
	}, [post.id]);

	return (
		<div
			key={post.id}
			className="rounded-lg shadow-md p-6 mb-8 transition-all duration-500 ease-in-out hover:shadow-lg"
		>
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center space-x-4">
					<AvatarLogo styles="w-12 h-12 rounded-full" fallback="" src={""} />
					<div>
						<span className="font-semibold text-lg">
							<AsyncUserEmail user_id={post.user_id} />
						</span>

						<p className="text-gray-500 text-sm">{getFormattedDate(post.created_at)}</p>
					</div>
				</div>
			</div>

			<Link href={all_routes.post + post.id}>
				<AsyncImage
					filepath={post.post_image_filepath}
					title={post.title}
					styles="w-full h-64 object-cover rounded-lg mb-4 hover:opacity-90 transition duration-300"
				/>
			</Link>

			<h2 className="text-2xl font-bold mb-2 line-clamp-1">{post.title}</h2>
			<p className="text-gray-700 mb-4 line-clamp-3">
				{post.content ? post.content : defaultContentText}
			</p>

			<div className="flex justify-between items-center mb-4">
				<div className="flex items-center space-x-2">
					<button
						onClick={handleUpvotes}
						className="flex items-center text-gray-500 hover:text-blue-500 transition duration-300"
					>
						<UpvoteSymbol styles="w-6 h-6 mr-1" />
						<span>{postUpvotes}</span>
					</button>
					<Link
						href={all_routes.post + post.id}
						className="flex items-center text-gray-500 hover:text-blue-500 transition duration-300"
					>
						<ChatBubbleSymbol styles="w-6 h-6 mr-1" />
						<span>{postCommentsCounter}</span>
					</Link>
				</div>
				<span
					style={{ backgroundColor: categoryColors[post.category] }}
					className="inline-block px-3 py-1 rounded-full text-sm font-semibold uppercase"
				>
					{post.category}
				</span>
			</div>
		</div>
	);
};

export default Post;
