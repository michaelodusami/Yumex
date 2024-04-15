import { HandThumbUpIcon } from "@heroicons/react/16/solid";

export const UpvoteSymbol: React.FC<{ styles: string }> = ({ styles = "" }) => {
	return <HandThumbUpIcon className={styles} />;
};
