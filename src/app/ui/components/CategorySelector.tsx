import Category from "./Category";
import { food_categories } from "@/app/lib/model";
import { food_category_images } from "@/app/lib/model";
import Image from "next/image";

const CategorySelector: React.FC<{}> = ({}) => {
	const categories = Object.values(food_categories);

	return (
		<>
			<ul className="flex justify-between">
				{categories.map((food_type, index) => {
					return (
						<>
							<li className="flex flex-col items-center justify-center">
								<Image
									src={food_category_images[food_type]}
									alt={food_type}
									width={20}
									height={20}
								/>
								<span className="capitalize text-[0.65rem] md:text-[1rem]">
									{food_type}
								</span>
							</li>
						</>
					);
				})}
			</ul>
		</>
	);
};

export default CategorySelector;
