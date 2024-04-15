export interface FormData {
	title: string;
	content: string;
	category: string;
	file: File | null;
	post_image_filepath: string;
}

export interface CommentParams {
	id: string;
	created_at: string;
	post_id: string;
	user_id: string;
	payload: string;
	user_id_replied_to?: string;
}
