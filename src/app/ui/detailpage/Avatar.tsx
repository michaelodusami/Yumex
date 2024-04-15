import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AvatarLogo: React.FC<{ src: string; fallback: string }> = ({
	src = "https://github.com/shadcn.png",
	fallback = "CN",
}) => {
	return (
		<Avatar>
			<AvatarImage src="https://github.com/shadcn.png" />
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	);
};

export default AvatarLogo;
