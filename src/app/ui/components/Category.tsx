import { categoryColors } from "../util/colors";

const Category: React.FC<{ category: string }> = ({ category = "NONE" }) => {
	return (
		<span
			style={{
				backgroundColor: categoryColors[category !== "" ? category : "asian"],
			}}
			className="uppercase border rounded-lg p-2 text-black"
		>
			{category !== "" ? category : "asian"}
		</span>
	);
};

export default Category;
