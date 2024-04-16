"use client";

import { AsyncUserEmail } from "../async_components";
import AvatarLogo from "../Avatar";
import { useEffect, useState } from "react";
import { getIdFromUser, deleteCommentFromDatabase } from "@/app/lib/data";
import { TrashIcon } from "@heroicons/react/16/solid";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const SingleCommment: React.FC<{ comment: any; setCommentList: any }> = ({
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

	const deleteComment = async (e) => {
		e.preventDefault();
		const { data, error } = await deleteCommentFromDatabase(comment.id);
		if (!error) {
			setCommentList((prevCommentList: any) =>
				prevCommentList.filter((c: any) => c.id !== comment.id)
			);
		}
	};

	return (
		<div className="border rounded-md p-4 relative">
			<p className="font-semibold mb-2 flex gap-5 items-center">
				<AvatarLogo src="/userlogo.png" styles="w-[20px] h-[20px]" />
				<AsyncUserEmail user_id={comment.user_id} />
			</p>
			<p className="font-light">{comment.payload}</p>
			{showEditDeleteButton && (
				<button className="absolute right-2 bottom-2 text-red-400 text-sm">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<TrashIcon className="w-[18px] h-[18px]" />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Confirm Deletion</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={deleteComment} className="text-green-500">
								Yes
							</DropdownMenuItem>
							<DropdownMenuItem className="text-red-500">No</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</button>
			)}
		</div>
	);
};
