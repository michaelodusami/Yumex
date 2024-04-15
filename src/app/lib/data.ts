import { supabase, supabaseAdmin } from "./server";
import { bucketName } from "./common_names";

/**
 * Gets the user from the database
 * @returns user from database
 */
export const getUserFromCurrentSessionFromDatabase = async () => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user;
};

/**
 * Gets the user email or id from the database
 * @param id of user
 * @param infoType the user wants to return
 * @returns the user's infotype or data if infoType is not among those in a switch statement
 */
export const getUserInfoByIdFromDatabase = async (id: string, infoType: string) => {
	const { data, error } = await supabaseAdmin.auth.admin.getUserById(id);
	switch (infoType) {
		case "email":
			return data.user?.email;
		case "id":
			return data.user?.id;
	}
	return data;
};

/**
 * Gets email of the current user in the session
 * @returns email of the current user
 */
export const getEmailFromUser = async () => {
	const userEmail = await getUserFromCurrentSessionFromDatabase().then((data) => data?.email);
	if (userEmail) {
		return userEmail;
	}
	return null;
};

/**
 * Gets the user's id from the current session
 * @returns the user id from the current session
 */
export const getIdFromUser = async () => {
	const userId = await getUserFromCurrentSessionFromDatabase().then((data) => data?.id);
	if (userId) {
		return userId;
	}
	return null;
};
/**
 * Fetches post from database
 * @param sortOption
 * @returns posts
 */
export const fetchPostsFromDatabase = async (sortOption: string) => {
	const { data } = await supabase
		.from("Posts")
		.select()
		.order(sortOption === "last created" ? "created_at" : "upvotes", {
			ascending: false,
		});
	return data;
};

/**
 * Gets user image from the bucket
 * @param filePath
 * @returns
 */
export const fetchPostImageFromDatbase = async (filePath: string) => {
	const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
	return data;
};

/**
 * Sends user information to the database
 * @param userObjectData at post creation
 */
export const createPostToDatabase = async (userObjectData: Object) => {
	await supabase.from("Posts").insert(userObjectData).select();
};

/**
 *
 * @param file the user wants to add as a post
 * @returns file name
 */
export const uploadFile = async (file: File | null, filePath: string) => {
	if (file) {
		const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file);
		if (error) {
			console.log(error);
			return false;
		} else {
			return true;
		}
	}
	return false;
};

/**
 * Gets a single post from the database based on the post id
 * @param post_id
 * @returns
 */
export const fetchPost = async (post_id: string) => {
	const { data } = await supabase.from("Posts").select().eq("id", post_id);
	return data;
};

/**
 * Increases the users upvotes
 * @param post_id
 * @param new_upvotes
 */
export const increaseUpvotes = async (post_id: string, new_upvotes: number) => {
	await supabase.from("Posts").update({ upvotes: new_upvotes }).eq("id", post_id);
};

/**
 * Delets a post from the database and removes the image as well
 * @param postId
 * @param filePath
 */
export const deletePost = async (postId: string, filePath: string) => {
	await supabase.from("Posts").delete().eq("id", postId);
	await supabaseAdmin.storage.from(bucketName).remove([filePath]);
};

export const addComment = async (obj: Object) => {
	const { data, error } = await supabase.from("Comments").insert(obj);
	return { data, error };
};

export const getComments = async (postId: string) => {
	const { data, error } = await supabase.from("Comments").select().eq("post_id", postId);
	return { data, error };
};

export const deleteCommentFromDatabase = async (comment_id: string) => {
	const { data, error } = await supabase.from("Comments").delete().eq("id", comment_id);
	return { data, error };
};
