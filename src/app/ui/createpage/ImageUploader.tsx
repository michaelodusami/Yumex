"use client";

import { ArrowUpTrayIcon } from "@heroicons/react/16/solid";
import { poppins } from "../fonts";
import { FormData } from "@/app/lib/interfaces";

interface ImageUploaderProps {
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ setFormData }) => {
	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		// console.log(file);
		if (file) {
			// const imageUrl = URL.createObjectURL(file);
			setFormData((prevFormData) => ({
				...prevFormData,
				file: file,
				post_image_filepath: `${Date.now()}_${file.name}`,
			}));
		}
	};

	return (
		<div className={poppins.className + " bg-white p-4 rounded-md shadow"}>
			<div className="mb-4 h-6 w-full">Uplaod an image of your food</div>
			<div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-8 dropzone-skeleton">
				<div className="relative cursor-pointer">
					<label
						htmlFor="imageUpload"
						className="flex items-center justify-center w-full h-10 px-4 transition bg-white  rounded-md appearance-none cursor-pointer focus:outline-none"
					>
						<span className="flex items-center space-x-2">
							<ArrowUpTrayIcon className="w-6 h-6 text-gray-600" />
							<span className="font-medium text-gray-600">
								Drag and drop or click to upload image
							</span>
						</span>
						<input
							type="file"
							id="imageUpload"
							onChange={handleImageUpload}
							className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
						/>
					</label>
				</div>
			</div>
		</div>
	);
};

export default ImageUploader;
