// model.ts
// this file represents static data used throughout the application

/**
 * Object containing various food categories.
 * Each category is represented by a key-value pair where the key is the category name and the value is a string representation of the category.
 */
export const food_categories = {
	asian: "asian",
	mexican: "mexican",
	italian: "italian",
	american: "american",
	african: "african",
	dessert: "dessert",
	healthy: "healthy",
	pastry: "pastry",
};

/**
 * Object containing various routes used in the application.
 * Each route is represented by a key-value pair where the key is the route name and the value is the corresponding route path.
 */
export const all_routes = {
	home: "/",
	create: "/create",
	post: "/posts/",
};
