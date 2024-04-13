"use client";

import { categories } from "@/app/lib/model";
import { categoryColors } from "../colors";
import { useState } from "react";

const CreateForm: React.FC = () => {
	const [selectedCategory, setSelectedCategory] = useState(Object.entries(categories)[0][0]);

	const handleCategoryChange = (event) => {
		setSelectedCategory(event.target.value);
	};
	return (
		<div className="bg-white p-4 rounded-md shadow h-full">
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
						placeholder="Title goes here..."
						name="title"
						id="title"
						className="h-full w-full p-2 border rounded-md"
					/>
				</div>
			</div>
			<div className="mb-4">
				<div className="mb-2 h-5 w-1/4 flex items-center">
					<label htmlFor="description">Description:</label>
				</div>
				<div className="h-20 w-full bg-gray-200 focus:animate-none">
					<textarea
						name="description"
						id="description"
						className="w-full h-full p-2 border rounded-md resize-none"
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
						className="h-full w-full rounded-md text-center p-2"
						onChange={handleCategoryChange}
						style={{ backgroundColor: categoryColors[selectedCategory] }}
					>
						{Object.entries(categories).map(([key, value]) => (
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
