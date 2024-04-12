export const users = [
	{
		id: "410544b2-4001-4271-9855-fec4b6a6442a",
		name: "User",
		email: "user@nextmail.com",
		password: "123456",
	},
	{
		id: "410544b2-4001-42e1-9855-fec4b6a6442a",
		name: "User2",
		email: "use2r@nextmail.com",
		password: "1234561",
	},
];

export const posts = [
	{
		id: "5f8d8f7e-e8d2-4c4a-9e9d-8f6c8d6b8f6e",
		user_id: users[0].id,
		title: "Most Delicious Food I Have Ever Had!",
		image: "https://example.com/images/delicious-food.jpg",
		createdAt: new Date("2023-05-15T10:30:00"),
		upvotes: upvotes.filter(
			(upvote) => upvote.postId === "5f8d8f7e-e8d2-4c4a-9e9d-8f6c8d6b8f6e"
		).length,
		comments: comments.filter(
			(comment) => comment.postId === "5f8d8f7e-e8d2-4c4a-9e9d-8f6c8d6b8f6e"
		),
	},
	{
		id: "7a9b7c6d-5e4f-3g2h-1i0j-9k8l7m6n5o4p",
		user_id: users[1].id,
		title: "Exploring the Beauty of Nature",
		image: "https://example.com/images/nature-beauty.jpg",
		createdAt: new Date("2023-05-16T14:45:00"),
		upvotes: upvotes.filter(
			(upvote) => upvote.postId === "7a9b7c6d-5e4f-3g2h-1i0j-9k8l7m6n5o4p"
		).length,
		comments: comments.filter(
			(comment) => comment.postId === "7a9b7c6d-5e4f-3g2h-1i0j-9k8l7m6n5o4p"
		),
	},
	{
		id: "3q2w3e4r-5t6y-7u8i-9o0p-1a2s3d4f5g6h",
		user_id: users[0].id,
		title: "My Favorite Hobby: Painting",
		image: "https://example.com/images/painting-hobby.jpg",
		createdAt: new Date("2023-05-17T09:00:00"),
		upvotes: upvotes.filter(
			(upvote) => upvote.postId === "3q2w3e4r-5t6y-7u8i-9o0p-1a2s3d4f5g6h"
		).length,
		comments: comments.filter(
			(comment) => comment.postId === "3q2w3e4r-5t6y-7u8i-9o0p-1a2s3d4f5g6h"
		),
	},
];

export const comments = [
	{
		user_id: users[1].id,
		postId: posts[0].id,
		content: "Wow, that looks amazing! Where did you find this dish?",
		createdAt: new Date("2023-05-15T11:15:00"),
	},
	{
		user_id: users[0].id,
		postId: posts[0].id,
		content: "I discovered this hidden gem in a small restaurant downtown. It's a must-try!",
		createdAt: new Date("2023-05-15T12:00:00"),
	},
	{
		user_id: users[0].id,
		postId: posts[1].id,
		content: "What a breathtaking view! Where was this picture taken?",
		createdAt: new Date("2023-05-16T15:30:00"),
	},
	{
		user_id: users[1].id,
		postId: posts[2].id,
		content: "Your painting skills are impressive! How long have you been practicing?",
		createdAt: new Date("2023-05-17T10:20:00"),
	},
	{
		user_id: users[0].id,
		postId: posts[2].id,
		content:
			"Thank you! I've been painting for about 5 years now. It's a great way to express myself.",
		createdAt: new Date("2023-05-17T11:10:00"),
	},
];

export const upvotes = [
	{
		userId: users[0].id,
		postId: posts[0].id,
		createdAt: new Date("2023-05-15T11:00:00"),
	},
	{
		userId: users[1].id,
		postId: posts[0].id,
		createdAt: new Date("2023-05-15T12:30:00"),
	},
	{
		userId: users[1].id,
		postId: posts[1].id,
		createdAt: new Date("2023-05-16T15:00:00"),
	},
	{
		userId: users[0].id,
		postId: posts[2].id,
		createdAt: new Date("2023-05-17T09:30:00"),
	},
];
