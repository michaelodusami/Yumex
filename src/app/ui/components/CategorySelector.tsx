"use client";
import { food_categories } from "@/app/lib/model";
import { food_category_images } from "@/app/lib/model";
import { useState } from "react";
import Image from "next/image";

const CategorySelector: React.FC<{ setSelectedCategory: any }> = ({ setSelectedCategory }) => {
	const categories = Object.values(food_categories);
	const [activeCategory, setActiveCategory] = useState<any>("");

	const handleSelectedCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
		const foodType = e.currentTarget.dataset.foodType;
		setSelectedCategory((prevCategory: any) => (prevCategory === foodType ? "" : foodType));
		setActiveCategory((prevCategory) => (prevCategory === foodType ? "" : foodType));
	};

	return (
		<>
			<ul className="flex justify-between">
				{categories.map((food_type, index) => {
					const isActive = activeCategory === food_type;
					return (
						<>
							<li
								className={`flex flex-col items-center justify-center flex-1 transition-all ease-in-out duration-200 ${
									isActive ? "font-bold scale-105" : ""
								}`}
							>
								<button
									onClick={handleSelectedCategory}
									data-food-type={food_type}
									className="flex items-center justify-center flex-col"
								>
									<Image
										src={food_category_images[food_type]}
										alt={food_type}
										width={20}
										height={20}
									/>
									<span className="capitalize text-[0.65rem] md:text-[1rem]">
										{food_type}
									</span>
								</button>
							</li>
						</>
					);
				})}
			</ul>
		</>
	);
};

export default CategorySelector;
