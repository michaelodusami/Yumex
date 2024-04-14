import { supabase } from "./server";
import { bucketName } from "./common_names";

/**
 * Gets the user from the database
 * @returns user from database
 */
export const getUserFromDatabase = async () => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user;
};

export const getEmailFromUser = async () => {
	const userEmail = await getUserFromDatabase().then((data) => data?.email);
	if (userEmail) {
		return userEmail;
	}
	return null;
};

export const getIdFromUser = async () => {
	const userId = await getUserFromDatabase().then((data) => data?.id);
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
