import { supabase } from "./server";

export const fetchPostsFromDatabase = async () => {
	const { data } = await supabase.from("Posts").select().order("created_at", { ascending: true });
	return data;
};

export const createPostToDatabase = async (userObjectData: Object) => {
	await supabase.from("Posts").insert(userObjectData).select();
};
