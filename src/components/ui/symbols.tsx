import {
	HandThumbUpIcon,
	ChatBubbleBottomCenterTextIcon,
	MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export const UpvoteSymbol: React.FC<{ styles: string }> = ({ styles = "" }) => {
	return <HandThumbUpIcon className={styles} />;
};

export const ChatBubbleSymbol: React.FC<{ styles: string }> = ({ styles = "" }) => {
	return <ChatBubbleBottomCenterTextIcon className={styles} />;
};

export const MagnifyingGlassIconSymbol: React.FC<{ styles: string }> = ({ styles = "" }) => {
	return <MagnifyingGlassIcon className={styles} />;
};
