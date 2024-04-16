import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AvatarLogo: React.FC<{ src: string; fallback: string; styles: string }> = ({
	src = "https://github.com/shadcn.png",
	fallback = "CN",
	styles = "",
}) => {
	return (
		<Avatar className={styles}>
			<AvatarImage src={src} />
			<AvatarFallback>YM</AvatarFallback>
		</Avatar>
	);
};

export default AvatarLogo;
