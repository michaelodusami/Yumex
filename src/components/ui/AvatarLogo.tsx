import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AvatarLogo: React.FC<{ src: string; fallback: string; styles: string }> = ({
	src = "https://github.com/shadcn.pngj",
	fallback = "YM",
	styles = "",
}) => {
	return (
		<Avatar className={styles}>
			<AvatarImage src={src} />
			<AvatarFallback>{fallback}</AvatarFallback>
		</Avatar>
	);
};

export default AvatarLogo;
