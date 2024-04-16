"use client";

import { food_categories } from "@/app/lib/model";
import { categoryColors } from "../util/colors";
import { useState } from "react";
import { FormData } from "@/app/lib/interfaces";

interface CreateFormProps {
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const CreateForm: React.FC<CreateFormProps> = ({ setFormData }) => {
	const [selectedCategory, setSelectedCategory] = useState(Object.entries(food_categories)[0][0]);

	const handleCategoryChange = (e) => {
		setSelectedCategory(e.target.value);
		setFormData((prevFormData) => ({
			...prevFormData,
			category: e.target.value,
		}));
	};

	const handleFormDataChange = (e) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className=" p-4 rounded-md shadow">
			{/* title */}
			{/* <div className="mb-4 h-6 w-1/3 bg-gray-200 animate-pulse"></div> */}
			<div className="mb-4">
				<div className="mb-2 h-5 w-1/4 flex items-center">
					<label htmlFor="title" className="">
						Title:
					</label>
				</div>
				<div className="h-10 w-full focus:animate-none">
					<input
						type="text"
						placeholder="Tasty, Delicious Burgers..."
						name="title"
						id="title"
						onChange={handleFormDataChange}
						className="h-full w-full p-2 border rounded-md placeholder:text-gray-300"
					/>
				</div>
			</div>
			<div className="mb-4">
				<div className="mb-2 h-5 w-1/4 flex items-center">
					<label htmlFor="description">Description:</label>
				</div>
				<div className="h-20 w-full bg-gray-200 focus:animate-none">
					<textarea
						name="content"
						id="content"
						placeholder="These burgers were amazing!"
						onChange={handleFormDataChange}
						className="w-full h-full p-2 border rounded-md resize-none placeholder:text-gray-300"
					></textarea>
				</div>
			</div>
			<div className="mb-4 flex flex-col items-end">
				{/* <div className="mb-2 h-5 w-1/4 flex items-center">
					<label htmlFor="category">Select Food Category:</label>
				</div> */}
				<div className="h-10">
					<select
						name="category"
						id="category"
						value={selectedCategory}
						className="h-full w-full rounded-md text-center"
						onChange={handleCategoryChange}
						style={{ backgroundColor: categoryColors[selectedCategory] }}
					>
						{Object.entries(food_categories).map(([key, value]) => (
							<option key={key} value={key}>
								{value.toUpperCase()}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};

export default CreateForm;
