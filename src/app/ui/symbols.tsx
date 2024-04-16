import { HandThumbUpIcon } from "@heroicons/react/24/outline";

export const UpvoteSymbol: React.FC<{ styles: string }> = ({ styles = "" }) => {
	return <HandThumbUpIcon className={styles} />;
};
