"use client";

import { AsyncUserEmail } from "./async_components";
import AvatarLogo from "./AvatarLogo";
import { useEffect, useState } from "react";
import { getIdFromUser, deleteCommentFromDatabase } from "@/app/_lib/data";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Commment: React.FC<{ comment: any; setCommentList: any }> = ({
	comment,
	setCommentList,
}) => {
	const [showEditDeleteButton, setEditDeleteButton] = useState<Boolean>(false);

	const checkifUserHasComment = async (commentId: string) => {
		// get the user id and if the comment user_id id mactehs user id then ya
		const user_id = await getIdFromUser();
		if (commentId == user_id) {
			setEditDeleteButton(true);
		} else {
			setEditDeleteButton(false);
		}
	};

	useEffect(() => {
		checkifUserHasComment(comment.user_id);
	}, [comment.user_id]);

	const deleteComment = async (e: any) => {
		e.preventDefault();
		const { data, error } = await deleteCommentFromDatabase(comment.id);
		if (!error) {
			setCommentList((prevCommentList: any) =>
				prevCommentList.filter((c: any) => c.id !== comment.id)
			);
		}
	};

	return (
		<div className="bg-white shadow-md rounded-lg p-6 mb-4">
			<div className="flex items-center mb-4">
				<AvatarLogo
					src="/userlogo.png"
					styles="w-10 h-10 rounded-full mr-4"
					fallback={""}
				/>
				<div>
					<AsyncUserEmail user_id={comment.user_id} />
				</div>
				{showEditDeleteButton && (
					<DropdownMenu>
						<DropdownMenuTrigger>
							<TrashIcon className="w-5 h-5 text-gray-500 ml-auto cursor-pointer hover:text-red-500 transition duration-300" />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Confirm Deletion</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={deleteComment} className="text-red-500">
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
			<p className="text-gray-700">{comment.payload}</p>
		</div>
	);
};

export default Commment;
