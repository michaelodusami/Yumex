export const users = [
	{
		user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
		username: "ShadowsWorth",
		email: "user@nextmail.com",
		password: "123456",
	},
	{
		user_id: "410544b2-4001-42e1-9855-fec4b6a6442a",
		username: "Bubbles",
		email: "use2r@nextmail.com",
		password: "1234561",
	},
	{
		user_id: "410044b2-4001-42e1-9855-fec4b6a6442a",
		username: "Dormamu",
		email: "user4@nextmail.com",
		password: "12345612",
	},
];

export const posts = [
	{
		id: "5f8d8f7e-e8d2-4c4a-9e9d-8f6c8d6b8f6e",
		user_id: users[0].user_id,
		title: "Most Delicious Food I Have Ever Had!",
		content:
			"lorfsoinfiudsnd ssbddkjdbfsnksdjfbf sdjkbsfkjbfdsbfskfsdk bfdskbdfskbfsdkkdfbkjdsk",
		image: "/exampleimg.webp",
		createdAt: new Date("2023-05-15T10:30:00"),
		upvotes: 0,
		comments: [],
	},
	{
		id: "7a9b7c6d-5e4f-3g2h-1i0j-9k8l7m6n5o4p",
		user_id: users[1].user_id,
		title: "New Salad From Jones Restaurant 🥒 🥒",
		content:
			"Introducing the 'Green Symphony' salad, a culinary masterpiece that tantalizes the taste buds with a harmonious blend of crisp, garden-fresh greens, delicately tossed in a symphony of flavors. Picture a verdant garden on a summer's day, where each bite is a burst of vibrant colors and textures, accompanied by a melody of tangy vinaigrettes and savory toppings. It's not just a salad; it's a culinary composition that leaves you craving an encore with every forkful",
		image: "/examplesalad.jpg",
		createdAt: new Date("2023-05-16T14:45:00"),
		upvotes: 0,
		comments: [],
	},
	{
		id: "3q2w3e4r-5t6y-7u8i-9o0p-1a2s3d4f5g6h",
		user_id: users[0].user_id,
		title: "Choclate Cake!!",
		content:
			'Behold the "Heavenly Dream Cake" - a decadent creation that transcends the boundaries of ordinary confectionery. Imagine layers of moist, velvety sponge cake, lovingly enrobed in a blanket of rich, creamy frosting that whispers promises of pure indulgence. With each forkful, youre transported to a realm of pure bliss, where the sweetness dances on your palate like a melody, and every bite is a journey to the celestial heights of dessert perfection. Its not just a cake. its a divine revelation that leaves you yearning for just one more heavenly slice.',
		image: "/examplecake.jpg",
		createdAt: new Date("2023-05-17T09:00:00"),
		upvotes: 0,
		comments: [],
	},
	{
		id: "3122w3e4r-5t6y-7u8i-9o0p-1a2s3d4f5g6h",
		user_id: users[2].user_id,
		title: "Savor the Crunch: Embark on a Flavorful Journey with Our Irresistibly Golden, Perfectly Seasoned Fries - A Culinary Delight for Fry Enthusiasts Everywhere",
		content:
			"Crispy batons of golden perfection, seasoned to savory perfection and served hot.",
		image: "/examplefries.jpg",
		createdAt: new Date("2023-05-17T09:00:00"),
		upvotes: 0,
		comments: [],
	},
	{
		id: "3q1232w3e4r-5t6y-7u8i-9o0p-1a2s3d4f5g6h",
		user_id: users[1].user_id,
		title: "Strawberry Glazed Donuts Cooked All The Way To Perfection, Amazing 🍩!!",
		content:
			"Fluffy clouds of fried dough, glazed to perfection and adorned with a sprinkle of sweetness.",
		image: "/exampledonut.jpg",
		createdAt: new Date("2023-05-17T09:00:00"),
		upvotes: 0,
		comments: [],
	},
	{
		id: "31234q2w3e4r-5t6y-7u8i-9o0p-1a2s3d4f5g6h",
		user_id: users[0].user_id,
		title: "Japanse Toast 🍞 ",
		content:
			"Slices of bread, lightly toasted to a golden hue, offering a warm and comforting crunch with every bite.",
		image: "/exampletoast.jpg",
		createdAt: new Date("2023-05-17T09:00:00"),
		upvotes: 0,
		comments: [],
	},
];

// Function to populate comments and upvotes after posts are initialized
export const populateCommentsAndUpvotes = () => {
	const comments = [
		{
			user_id: users[1].id,
			postId: posts[0].id,
			content: "Wow, that looks amazing! Where did you find this dish?",
			createdAt: new Date("2023-05-15T11:15:00"),
		},
		{
			user_id: users[0].id,
			postId: posts[0].id,
			content:
				"I discovered this hidden gem in a small restaurant downtown. It's a must-try!",
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
		{
			user_id: users[1].id,
			postId: posts[3].id,
			content:
				"I've been painting for about 5 years now. It's a great way to express myself.",
			createdAt: new Date("2023-05-17T11:10:00"),
		},
	];

	// const upvotes = [
	// 	{
	// 		userId: users[0].id,
	// 		postId: posts[0].id,
	// 		createdAt: new Date("2023-05-15T11:00:00"),
	// 	},
	// 	{
	// 		userId: users[1].id,
	// 		postId: posts[0].id,
	// 		createdAt: new Date("2023-05-15T12:30:00"),
	// 	},
	// 	{
	// 		userId: users[1].id,
	// 		postId: posts[1].id,
	// 		createdAt: new Date("2023-05-16T15:00:00"),
	// 	},
	// 	{
	// 		userId: users[0].id,
	// 		postId: posts[2].id,
	// 		createdAt: new Date("2023-05-17T09:30:00"),
	// 	},
	// ];

	// Assign comments and upvotes arrays to posts
	posts.forEach((post) => {
		post.comments = comments.filter((comment) => comment.postId === post.id);
		// post.upvotes = upvotes.filter((upvote) => upvote.postId === post.id);
	});
};
