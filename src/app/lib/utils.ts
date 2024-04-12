import { User } from "./model";
import { users } from "./placeholder_data";

/**
 * For The User
 */
export const getUserName = (userId: string): string => {
    console.log("Users:", users); // Check if the users array is correctly received
    console.log("userId:", userId); // Check the userId being passed
    const user = users.find((obj) => obj.user_id === userId)
    console.log("Found user:", user); // Check if a user is found
    return user?.username;
};