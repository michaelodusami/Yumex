"use client";

import CreateForm from "@/components/ui/CreateForm";
import ImageUploader from "@/components/ui/ImageUploader";
import PostPreview from "@/components/ui/PostPreview";
import { useState } from "react";
import { FormData } from "@/lib/interfaces";
import { uploadFile, getIdFromUser } from "@/lib/data";
import CreatePostSuccess from "@/components/ui/CreatePostSuccess";
import { supabase } from "@/lib/server";
import { all_routes } from "@/lib/model";
import { useAuth } from "@/components/context/AuthProvider";
import LoginModal from "@/components/ui/LoginModal";

export default function Page() {
	const { session } = useAuth();
	const [isPostCreated, setIsPostCreated] = useState<Boolean>(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [showModal, setShowModal] = useState(false);

	const [formData, setFormData] = useState<FormData>({
		title: "",
		content: "",
		category: "",
		file: null,
		post_image_filepath: "",
	});

	const handleCreatePost = async (e: any) => {
		e.preventDefault();

		if (session) {
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

						const postId = data[0].id; // Get the ID of the newly created post
						setIsPostCreated(true);
						// Redirect to the detail page using the post ID
						const newLocation = all_routes.post + postId;
						window.location.href = newLocation;
						// get the post and redirect to the detail screen
					}
				} else {
					setErrorMessage("FIle Must Be Of Type <jpg, jpeg, png, webp>.");
				}
			}
		} else {
			setShowModal(true);
		}
	};

	if (isPostCreated) {
		return <CreatePostSuccess />;
	}

	return (
		<main className="min-h-screen">
			{showModal && <LoginModal setShowModal={setShowModal} />}
			<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="px-4 py-6 sm:px-0">
					<h1 className="text-3xl font-bold text-gray-900 mb-4">Create Post</h1>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div>
						<PostPreview
							file={formData.file}
							title={formData.title}
							content={formData.content}
							category={formData.category}
							post_image_filepath={formData.post_image_filepath}
						/>
					</div>
					<div className="flex flex-col gap-8">
						<div>
							<ImageUploader setFormData={setFormData} />
						</div>
						<div className="flex-1">
							<CreateForm setFormData={setFormData} />
						</div>
						<div className="flex justify-end">
							<button
								type="button"
								onClick={handleCreatePost}
								className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
							>
								Create
							</button>
						</div>
					</div>
				</div>
				{errorMessage !== "" && (
					<p className="text-red-500 text-center mt-4">Error: {errorMessage}</p>
				)}
			</div>
		</main>
	);
}
