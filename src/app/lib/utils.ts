import { User, Post } from "./model";
import { users, posts } from "./placeholder_data";

/*
 * For The User
 */
export const getUserName = (userId: string): string => {
	const user = users.find((obj) => obj.user_id === userId);
	return user ? user.username : "";
};

export const getUserNameUpToEmailSymbol = (userEmail: string): string => {
	const symbolPos = userEmail.indexOf("@");
	const username = userEmail.slice(0, symbolPos);
	return username;
};

/*
 * For Upvotes
 */
export const handleUpvote = (postId: string): void => {
	const post = posts.find((post) => post.id === postId);
	if (post) {
		post.upvotes += 1;
	}
};

/*
 * For The Date
 */
export const getFormattedDate = (date: Date): string => {
	return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
};

/*
 *
 * For Posts
 */

export const filterPostTitles = (searchQuery: string): Post[] => {
	const filteredPosts = posts.filter((post) =>
		post.title.toLowerCase().includes(searchQuery.toLowerCase())
	);
	return filteredPosts;
};
