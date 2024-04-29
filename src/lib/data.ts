import { supabase, supabaseAdmin } from "./server";
import { bucketName } from "./vars";

/*****************************************************
 *
 *  User Related Methods
 *
 *****************************************************/

/**
 * Retrieves the user from the current session in the database.
 * @returns {Promise<object>} The user object from the database.
 */
export const getUserFromCurrentSessionFromDatabase = async () => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user;
};

/**
 * Retrieves the user email or id from the database.
 * @param {string} id - The id of the user.
 * @param {string} infoType - The type of information to retrieve (email or id).
 * @returns {Promise<string | object>} The user's email or id based on the infoType parameter.
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
 * Retrieves the email of the current user from the session.
 * @returns {Promise<string | null>} The email of the current user, or null if not available.
 */
export const getEmailFromUser = async () => {
	const userEmail = await getUserFromCurrentSessionFromDatabase().then((data) => data?.email);
	if (userEmail) {
		return userEmail;
	}
	return null;
};

/**
 * Retrieves the user id from the current session.
 * @returns {Promise<string | null>} The user id from the current session, or null if not available.
 */
export const getIdFromUser = async () => {
	const userId = await getUserFromCurrentSessionFromDatabase().then((data) => data?.id);
	if (userId) {
		return userId;
	}
	return null;
};

/*****************************************************
 *
 *  Post Related Methods
 *
 *****************************************************/

/**
 * Fetches posts from the database based on the specified sorting option.
 * @param {string} sortOption - The sorting option for posts (e.g., "last created", "upvotes").
 * @returns {Promise<object[]>} An array of posts fetched from the database.
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
 * Fetches posts from the database by category.
 * @param {string} category The category to filter posts by.
 * @returns {Promise<any[]>} A Promise that resolves to an array of posts.
 */
export const fetchPostsFromDatabaseByCategory = async (category: String, sortOption: string) => {
	const { data } = await supabase
		.from("Posts")
		.select()
		.order(sortOption === "last created" ? "created_at" : "upvotes", {
			ascending: false,
		})
		.eq("category", category);
	return data;
};

/**
 * Retrieves the public URL of a post image from the storage bucket.
 * @param {string} filePath - The file path of the post image.
 * @returns {Promise<string>} The public URL of the post image.
 */
export const fetchPostImageFromDatbase = async (filePath: string) => {
	const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
	return data;
};

/**
 * Creates a new post in the database.
 * @param {Object} userObjectData - Data of the post to be created.
 */
export const createPostToDatabase = async (userObjectData: Object) => {
	await supabase.from("Posts").insert(userObjectData).select();
};

/**
 * Uploads a file to the storage bucket.
 * @param {File | null} file - The file to be uploaded.
 * @param {string} filePath - The path where the file will be uploaded.
 * @returns {Promise<boolean>} A boolean indicating whether the upload was successful.
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
 * Retrieves a single post from the database based on the post id.
 * @param {string} post_id - The id of the post to retrieve.
 * @returns {Promise<object>} The post object retrieved from the database.
 */
export const fetchPost = async (post_id: string) => {
	const { data } = await supabase.from("Posts").select().eq("id", post_id);
	return data;
};

/**
 * Increases the upvotes of a post in the database.
 * @param {string} post_id - The id of the post to increase upvotes.
 * @param {number} new_upvotes - The new number of upvotes.
 */
export const increaseUpvotes = async (post_id: string, new_upvotes: number) => {
	await supabase.from("Posts").update({ upvotes: new_upvotes }).eq("id", post_id);
};

/**
 * Deletes a post from the database and removes the associated image.
 * @param {string} postId - The id of the post to delete.
 * @param {string} filePath - The file path of the post image to remove.
 */
export const deletePost = async (postId: string, filePath: string) => {
	await supabase.from("Posts").delete().eq("id", postId);
	await supabaseAdmin.storage.from(bucketName).remove([filePath]);
	await supabase.from("Comments").delete().eq("post_id", postId);
};

/*****************************************************
 *
 *  Comment Related Methods
 *
 *****************************************************/

/**
 * Adds a comment to the database.
 * @param {Object} obj - The comment object to add.
 * @returns {Promise<{data: object, error: any}>} An object containing data and error properties.
 */
export const addComment = async (obj: Object) => {
	const { data, error } = await supabase.from("Comments").insert(obj);
	return { data, error };
};

/**
 * Retrieves comments associated with a post from the database.
 * @param {string} postId - The id of the post to retrieve comments for.
 * @returns {Promise<{data: object, error: any}>} An object containing data and error properties.
 */
export const getComments = async (postId: string) => {
	const { data, error } = await supabase.from("Comments").select().eq("post_id", postId);
	return { data, error };
};

/**
 * Deletes a comment from the database.
 * @param {string} comment_id - The id of the comment to delete.
 * @returns {Promise<{data: object, error: any}>} An object containing data and error properties.
 */
export const deleteCommentFromDatabase = async (comment_id: string) => {
	const { data, error } = await supabase.from("Comments").delete().eq("id", comment_id);
	return { data, error };
};
