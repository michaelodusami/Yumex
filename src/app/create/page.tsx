"use client";

import { CreatePostSkeleton, ImageUploaderSkeleton, PostSkeleton } from "../ui/skeletons";
import CreateForm from "@/app/ui/CreateForm";
import ImageUploader from "@/app/ui/ImageUploader";
import PostPreview from "../ui/PostPreview";
import { useState } from "react";
import { FormData } from "../lib/interfaces";
import { uploadFile, getIdFromUser } from "../lib/data";
import CreatePostSuccess from "../ui/CreatePostSuccess";
import { supabase } from "../lib/server";

export default function Page() {
	const [isPostCreated, setIsPostCreated] = useState<Boolean>(false);
	const [errorMessage, setErrorMessage] = useState("");

	const [formData, setFormData] = useState<FormData>({
		title: "",
		content: "",
		category: "",
		file: null,
		post_image_filepath: "",
	});

	const handleCreatePost = async (e) => {
		e.preventDefault();
		if (formData.title === "") {
			setErrorMessage("Title Required");
		} else if (!formData.file) {
			setErrorMessage("Image Required");
		} else {
			// upload image and if successful, upload formdata, then set success true
			const isUploaded = await uploadFile(formData.file, formData.post_image_filepath);
			if (isUploaded) {
				const user_id = await getIdFromUser();
				const { data, error } = await supabase
					.from("Posts")
					.insert({
						user_id: user_id,
						title: formData.title,
						content: formData.content,
						upvotes: 0,
						category: formData.category ? formData.category : "asian",
						post_image_filepath: formData.post_image_filepath,
					})
					.select();
				if (error) {
					console.log(error);
					setErrorMessage("Post Creation Failed");
				} else {
					setErrorMessage("");
					setIsPostCreated(true);
					// alter this
					window.location = "/";
				}
			} else {
				setErrorMessage("FIle Must Be Of Type <jpg, jpeg, png, webp>.");
			}
		}
	};

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
						post_image_filepath={formData.post_image_filepath}
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
						<div className={"w-full flex justify-center items-center"}>
							<button
								type="button"
								onClick={handleCreatePost}
								className="border rounded-md p-2 text-xl bg-green-300 w-full hover:font-bold transition-all"
							>
								Create
							</button>
						</div>
					</div>
				</div>
			</div>
			{errorMessage !== "" ? (
				<p className="text-red-400 w-full mx-auto text-center">Error: {errorMessage}</p>
			) : null}
		</main>
	);
}
