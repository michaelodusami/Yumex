"use client";
import { useState, useEffect } from "react";
import { HomeContainer } from "@/app/page";
import { fetchPost } from "@/app/lib/data";
import AvatarLogo from "@/app/ui/components/AvatarLogo";
import { AsyncUserEmail, AsyncImage } from "@/app/ui/components/async_components";
import { getFormattedDate } from "@/app/lib/utils";
import Category from "@/app/ui/components/Category";
import { UpvoteSymbol } from "@/app/ui/components/symbols";
import { increaseUpvotes, addComment, getComments } from "@/app/lib/data";
import { getIdFromUser } from "@/app/lib/data";
import Comment from "@/app/ui/components/Comment";
import AuthenticatedLayout from "@/app/AuthenticatedLayout";
import { navLargeWidth, navMediumWidth, singleColWidth } from "@/app/ui/util/sizes";

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
		<AuthenticatedLayout>
			<HomeContainer>
				<div className="max-w-3xl mx-auto p-2 md:p-8">
					<div className="bg-white shadow-md rounded-lg p-8">
						<div className="flex items-center mb-8">
							<div className="mr-6">
								<AvatarLogo />
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
						<div className="text-3xl font-bold mb-4 flex justify-between items-center">
							<h1>{post.title}</h1>
							<Category category={post.category} />
						</div>
						<div className="mb-8">
							<AsyncImage filepath={post.post_image_filepath} title={post.title} />
						</div>
						<div className="text-lg mb-8">
							<p>{post.content}</p>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center">
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
						<h3 className="text-xl font-semibold mb-4">Comments</h3>
						<form className="mb-8 flex gap-4" onSubmit={onSubmit}>
							<input
								type="text"
								placeholder="Add a comment"
								onChange={onChange}
								value={comment}
								className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<button
								type="submit"
								className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
							>
								Submit
							</button>
						</form>
						<div className="space-y-6">
							{commentList
								.sort((a, b) => {
									const aDate = new Date(a.created_at);
									const bDate = new Date(b.created_at);
									return +bDate - +aDate;
								})
								.map((comment) => (
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
		</AuthenticatedLayout>
	);
};

export default Page;
