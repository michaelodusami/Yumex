import { categoryColors } from "../util/colors";

const Category: React.FC<{ category: string }> = ({ category = "NONE" }) => {
	return (
		<span
			style={{ backgroundColor: categoryColors[category] }}
			className="inline-block px-3 py-1 rounded-full text-sm font-semibold uppercase"
		>
			{category}
		</span>
	);
};

export default Category;
