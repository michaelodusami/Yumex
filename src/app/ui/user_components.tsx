import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { phoneIconWH } from "./sizes";
import AvatarLogo from "./Avatar";

export const ProfileDropDown: React.FC<{ handleSignOut: any }> = ({ handleSignOut }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<AvatarLogo styles={`w-[${phoneIconWH} h-[${phoneIconWH}`} />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
