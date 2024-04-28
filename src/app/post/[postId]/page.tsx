"use client";
import { useState, useEffect } from "react";
import HomeContainer from "@/app/HomeContainer";
import { fetchPost } from "@/app/lib/data";
import AvatarLogo from "@/app/ui/components/AvatarLogo";
import { AsyncUserEmail, AsyncImage } from "@/app/ui/components/async_components";
import { getFormattedDate } from "@/app/lib/utils";
import Category from "@/app/ui/components/Category";
import { UpvoteSymbol } from "@/app/ui/components/symbols";
import { increaseUpvotes, addComment, getComments } from "@/app/lib/data";
import { getIdFromUser, deletePost } from "@/app/lib/data";
import Comment from "@/app/ui/components/Comment";
import AuthenticatedLayout from "@/app/AuthenticatedLayout";
import { useAuth } from "@/app/ui/provider/AuthProvider";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
	EllipsisHorizontalCircleIcon,
	ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { all_routes } from "@/app/lib/model";

import { navLargeWidth, navMediumWidth, singleColWidth } from "@/app/ui/util/sizes";

const Page: React.FC<{ params: any }> = ({ params }) => {
	const { session } = useAuth();
	const fakeSession = false;
	const postId = params.postId;
	const [post, setPost] = useState<any>(null);
	const [postUpvotes, setPostUpvotes] = useState<any>(null);
	const [comment, setComment] = useState<string>("");
	const [commentList, setCommentList] = useState<any>([]);
	const [showEditDeleteButton, setEditDeleteButton] = useState<Boolean>(false);

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

		if (post !== null) {
			checkifUserHasPost();
		}
	}, [post]);

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
		const getCommentList = async () => {
			const { data, error } = await getComments(postId);
			if (!error && data) {
				setCommentList(data);
			} else {
				setCommentList([]);
			}
		};
		getCommentList();
	}, [postId]);

	const onChange = (event: any) => {
		const commentValue = event.target.value;
		setComment(commentValue);
	};

	const onSubmit = async (e: any) => {
		const getCommentList = async () => {
			const { data, error } = await getComments(postId);
			if (!error && data) {
				setCommentList(data);
			} else {
				setCommentList([]);
			}
		};
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

	const handleUpvotes = (e: any) => {
		if (postUpvotes !== null) {
			e.preventDefault();
			increaseUpvotes(post.id, postUpvotes + 1);
			setPostUpvotes(postUpvotes + 1);
		}
	};

	const handleDeletePost = async () => {
		await deletePost(post.id, post.post_image_filepath);
		window.location.href = all_routes.home;
		window.alert("Post Deleted");
	};

	if (post == null) {
		return null;
	}

	return (
		<HomeContainer>
			<div className="max-w-3xl mx-auto p-2 md:p-8">
				<div className=" shadow-md rounded-lg p-8">
					<div className="flex justify-between">
						<div className="flex items-center mb-8">
							<div className="mr-6">
								<AvatarLogo src={""} fallback={""} styles={""} />
							</div>
							<div>
								<div className="text-xl font-semibold">
									<AsyncUserEmail user_id={post.user_id} />
								</div>
								<div className="text-gray-500">
									Posted At: {getFormattedDate(post.created_at)}
								</div>
							</div>
						</div>

						{showEditDeleteButton && (
							<DropdownMenu>
								<DropdownMenuTrigger>
									<EllipsisHorizontalCircleIcon className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>Post Options</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={handleDeletePost}>
										Delete Post
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)}
					</div>

					<div className="text-3xl font-bold mb-4 flex justify-between items-center">
						<h1>{post.title}</h1>
						<Category category={post.category} />
					</div>
					<div className="mb-8">
						<AsyncImage
							filepath={post.post_image_filepath}
							title={post.title}
							styles={""}
						/>
					</div>
					<div className="text-lg mb-8">
						<p>{post.content}</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							{/* handle session */}
							<button
								className="flex items-center text-gray-500 hover:text-blue-500 transition duration-300"
								onClick={handleUpvotes}
							>
								<UpvoteSymbol styles="w-6 h-6 mr-1" />
								<span>{postUpvotes}</span>
							</button>
						</div>
					</div>
				</div>
				<div className="mt-12">
					<h3 className="text-xl font-semibold mb-4">Comments:</h3>
					{/* handle session */}
					{fakeSession ? (
						<>
							<form className="relative mb-8" onSubmit={onSubmit}>
								<textarea
									placeholder="Start typing here to add a comment!"
									name="comment"
									id="comment"
									value={comment}
									onChange={onChange}
									className="w-full p-3 resize-none rounded-md border"
									rows={3}
								></textarea>
								{comment != "" && (
									<button
										type="submit"
										className="p-2 text-sm border rounded-md hover:bg-blue-600 transition duration-300 absolute bottom-3 right-3"
									>
										Submit
									</button>
								)}
							</form>
						</>
					) : (
						<div>
							<button className="transition-all ease-in-out duration-500 flex gap-2 items-center justify-center p-3 border rounded-2xl w-full hover:font-bold ">
								<span>Click to add a button</span>
								<span>
									<PlusCircleIcon className="w-[20px] font-bold" />
								</span>
							</button>
						</div>
					)}

					<div className="space-y-6">
						{commentList
							.sort((a: any, b: any) => {
								const aDate = new Date(a.created_at);
								const bDate = new Date(b.created_at);
								return +bDate - +aDate;
							})
							.map((comment: any) => (
								<Comment
									key={comment.id}
									comment={comment}
									setCommentList={setCommentList}
								/>
							))}
					</div>
				</div>
			</div>
		</HomeContainer>
	);
};

export default Page;
