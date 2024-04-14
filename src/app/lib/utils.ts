import { User, Post } from "./model";
import { users, posts } from "./placeholder_data";

/*
 * For The User
 */

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
};

/*
 * For The Date
 */
export const getFormattedDate = (timestamp: string): string => {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${month}/${day}/${year}`;
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
