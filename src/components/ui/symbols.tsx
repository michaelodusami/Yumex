import {
	HandThumbUpIcon,
	ChatBubbleBottomCenterTextIcon,
	MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
	PlusCircleIcon,
	HomeIcon,
	ArrowRightEndOnRectangleIcon,
	TrashIcon,
} from "@heroicons/react/24/solid";

export const UpvoteSymbol: React.FC<{ styles: string }> = ({ styles = "" }) => {
	return <HandThumbUpIcon className={styles} />;
};

export const ChatBubbleSymbol: React.FC<{ styles: string }> = ({ styles = "" }) => {
	return <ChatBubbleBottomCenterTextIcon className={styles} />;
};

export const MagnifyingGlassIconSymbol: React.FC<{ styles: string }> = ({ styles = "" }) => {
	return <MagnifyingGlassIcon className={styles} />;
};

export const PlusCircleIconSymbol: React.FC<{ styles: string }> = ({ styles = "" }) => {
	return <PlusCircleIcon className={styles} />;
};

export const HomeIconSymbol: React.FC<{ styles: string }> = ({ styles = "" }) => {
	return <HomeIcon className={styles} />;
};

export const ArrowRightEndOnRectangleIconSymbol: React.FC<{ styles: string }> = ({
	styles = "",
}) => {
	return <ArrowRightEndOnRectangleIcon className={styles} />;
};

export const TrashIconSymbol: React.FC<{ styles: string }> = ({ styles = "" }) => {
	return <TrashIcon className={styles} />;
};
