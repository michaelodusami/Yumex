"use client";

import { CreatePostSkeleton, ImageUploaderSkeleton, PostSkeleton } from "../ui/skeletons";
import CreateForm from "@/app/ui/createpage/CreateForm";
import ImageUploader from "@/app/ui/createpage/ImageUploader";
import PostPreview from "../ui/createpage/PostPreview";
import { poppins } from "../ui/fonts";
import { useState } from "react";
import { FormData } from "../lib/interfaces";
import CreatePostSuccess from "../ui/createpage/CreatePostSuccess";

export default function Page() {
	const [isPostCreated, setIsPostCreated] = useState<Boolean>(false);

	const [formData, setFormData] = useState<FormData>({
		title: "",
		content: "",
		category: "",
		file: null,
		filePath: "",
	});

	const handleCreatePost = (e: React.ChangeEvent<HTMLInputElement>) => {};

	if (isPostCreated) {
		return <CreatePostSuccess />;
	}

	return (
		<main className="min-h-screen">
			<div className="w-full lg:w-[90%] mx-auto flex flex-col lg:flex-row gap-5 p-5">
				{/* Post Previw */}
				<div className="lg:w-[50%] xl:w-[40%] w-full">
					{/* <PostSkeleton /> */}
					<PostPreview
						file={formData.file}
						title={formData.title}
						content={formData.content}
						category={formData.category}
						filePath={formData.filePath}
					/>
				</div>
				<div className="flex flex-col flex-1 gap-5 ">
					{/* the image uploader */}
					<div className="">
						{/* <ImageUploaderSkeleton /> */}
						<ImageUploader setFormData={setFormData} />
					</div>
					{/* writing the edited version */}
					<div className="flex-1">
						{/* <CreatePostSkeleton /> */}
						<CreateForm setFormData={setFormData} />
					</div>
					<div className="flex-1 flex items-end">
						<div
							className={
								poppins.className + " w-full flex justify-center items-center"
							}
						>
							<button
								type="button"
								className="border rounded-md p-2 text-xl bg-green-300 w-full hover:font-bold transition-all"
							>
								Create
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
