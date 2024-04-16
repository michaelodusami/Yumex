"use client";
import { useState, useEffect } from "react";
import { HomeContainer } from "@/app/page";
import { fetchPost } from "@/app/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarLogo from "@/app/ui/Avatar";
import { AsyncUserEmail, AsyncImage } from "@/app/ui/async_components";
import { getFormattedDate } from "@/app/lib/utils";
import Category from "@/app/ui/Category";
import { UpvoteSymbol } from "@/app/ui/symbols";
import { increaseUpvotes, addComment, getComments } from "@/app/lib/data";
import { getIdFromUser } from "@/app/lib/data";
import { CommentParams } from "@/app/lib/interfaces";
import { SingleCommment } from "@/app/ui/comments";
import { navLargeWidth, navMediumWidth } from "@/app/ui/sizes";

const Page: React.FC<{ params: any }> = ({ params }) => {
	const postId = params.postId;
	const [post, setPost] = useState<any>(null);
	const [postUpvotes, setPostUpvotes] = useState<any>(null);
	const [comment, setComment] = useState<string>("");
	const [commentList, setCommentList] = useState<any>([]);

	useEffect(() => {
		const getPost = async () => {
			const data = await fetchPost(postId);
			if (data) {
				setPost(data[0]);
				setPostUpvotes(data[0].upvotes);
			}
		};
		getPost();
	}, [params, postId]);

	useEffect(() => {
		getCommentList();
	}, []);

	const getCommentList = async () => {
		const { data, error } = await getComments(postId);
		if (!error && data) {
			setCommentList(data);
		} else {
			setCommentList([]);
		}
	};

	const onChange = (event) => {
		const commentValue = event.target.value;
		setComment(commentValue);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const current_user_id = await getIdFromUser(); // gets the id of user from the current session
		const comment_obj = { post_id: post.id, user_id: current_user_id, payload: comment };
		const { data, error } = await addComment(comment_obj);
		if (error) {
			window.alert(error?.message);
			return;
		}
		setComment("");
		getCommentList();
	};

	const handleUpvotes = (e) => {
		if (postUpvotes !== null) {
			e.preventDefault();
			increaseUpvotes(post.id, postUpvotes + 1);
			setPostUpvotes(postUpvotes + 1);
		}
	};

	if (post == null) {
		return null;
	}

	return (
		<HomeContainer>
			<div
				className={"w-full mt-5 min-h-[100vh] mx-auto p-8" + navLargeWidth + navMediumWidth}
			>
				{/* posts */}
				<div>
					{/* icon and username + title */}
					<div className="flex gap-5">
						<div className="flex-col items-center mb-6">
							<h1 className="text-2xl">{postUpvotes}</h1>
							<div className="">
								<button className="border-none" onClick={handleUpvotes}>
									<UpvoteSymbol styles="w-[25px] h-full" />
								</button>
							</div>
						</div>

						<div className="flex items-center mb-6 flex-1">
							<div className="mr-4">
								<AvatarLogo />
							</div>
							<div>
								{/* user */}
								<div className="text-xl font-semibold">
									<span>
										<AsyncUserEmail user_id={post.user_id} />
									</span>
								</div>
								{/* data */}
								<div className="text-gray-400">
									Posted At: {getFormattedDate(post.created_at)}
								</div>
							</div>
						</div>
					</div>
					{/* Title */}
					<div className="text-2xl lg:text-3xl xl:text-3xl font-bold mb-6 flex justify-between items-center">
						<p>{post.title}</p>
						<p>
							<Category category={post.category} />
						</p>
					</div>
					{/* Image */}
					<div className="mb-6">
						<AsyncImage filepath={post.post_image_filepath} title={post.title} />
					</div>
					{/* Content */}
					<div className="text-lg mb-8">
						<p>{post.content}</p>
					</div>
				</div>
				{/* comments */}
				<div>
					<div className="mb-5">
						<h3 className="font-bold opacity-50">Comments: </h3>
					</div>

					<div>
						{/* comments */}
						<form className="mt-8 flex gap-8">
							<input
								type="text"
								placeholder="Add a comment"
								onChange={onChange}
								value={comment}
								className="p-2 border-b focus:border-b-gray-700 w-full outline-none"
							/>
							<button
								onClick={onSubmit}
								className="px-4 py-2 hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-white rounded-lg"
							>
								Submit
							</button>
						</form>
						<div className="flex flex-col gap-4 pt-12">
							{commentList
								.sort((a, b) => {
									const aDate = new Date(a.created_at);
									const bDate = new Date(b.created_at);
									return +bDate - +aDate;
								})
								.map((comment) => (
									<SingleCommment
										key={comment.id}
										comment={comment}
										setCommentList={setCommentList}
									/>
								))}
						</div>
					</div>
				</div>
			</div>
		</HomeContainer>
	);
};

export default Page;
