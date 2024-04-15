"use client";
import { useState, useEffect } from "react";
import { HomeContainer } from "@/app/page";
import { fetchPost } from "@/app/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarLogo from "@/app/ui/detailpage/Avatar";
import { AsyncUserEmail, AsyncImage } from "@/app/ui/homepage/Forum";
import { getFormattedDate } from "@/app/lib/utils";
import Category from "@/app/ui/Category";

const Page: React.FC<{ params: any }> = ({ params }) => {
	const userId = params.postId;
	const [post, setPost] = useState<any>(null);

	useEffect(() => {
		const getPost = async () => {
			const data = await fetchPost(userId);
			if (data) {
				setPost(data[0]);
			}
		};
		getPost();
	}, [params]);

	if (post == null) {
		return null;
	}

	return (
		<HomeContainer>
			<div className="w-full md:w-[90%] lg:w-[70%] border min-h-[100vh] mx-auto   p-8">
				{/* posts */}
				<div>
					{/* icon and username + title */}
					<div className="flex items-center mb-6">
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
					{/* Title */}
					<div className="text-2xl lg:text-3xl xl:text-3xl font-bold mb-6 flex justify-between items-center">
						<p>{post.title}</p>
						<p>
							<Category category={post.category} />
						</p>
					</div>
					{/* Image */}
					<div className="mb-6">
						<AsyncImage
							filepath={post.post_image_filepath}
							title={post.title}
							className="rounded-lg shadow-lg"
						/>
					</div>
					{/* Content */}
					<div className="text-lg mb-8">
						<p>{post.content}</p>
					</div>
				</div>
				{/* comments */}
				<div>
					<input
						type="text"
						name=""
						id=""
						placeholder="Add Your Comment"
						className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>
		</HomeContainer>
	);
};

export default Page;
