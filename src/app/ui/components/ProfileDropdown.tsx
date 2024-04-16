import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { phoneAvatarIconDropdownWH } from "../util/sizes";
import AvatarLogo from "./AvatarLogo";

export const ProfileDropDown: React.FC<{ handleSignOut: any }> = ({ handleSignOut }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<AvatarLogo styles={phoneAvatarIconDropdownWH} />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileDropDown;
