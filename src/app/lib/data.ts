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

export const getEmailFromUser = async () => {
	const userEmail = await getUserFromCurrentSessionFromDatabase().then((data) => data?.email);
	if (userEmail) {
		return userEmail;
	}
	return null;
};

export const getIdFromUser = async () => {
	const userId = await getUserFromCurrentSessionFromDatabase().then((data) => data?.id);
	if (userId) {
		return userId;
	}
	return null;
};

/**
 * Fetches posts from the database
 * @returns supabase post data
 */
export const fetchPostsFromDatabase = async () => {
	const { data } = await supabase.from("Posts").select().order("created_at", { ascending: true });
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
