import { User } from "./model";
import { Category } from "./model";
import { users } from "./placeholder_data";

/**
 * For The User
 */
export const getUserName = (userId: string): string => {
    const user = users.find((obj) => obj.user_id === userId);
    return user ? user.username : "";
};


/**
 * For The Date
 */
export const getFormattedDate = (date: Date) : string => {
    return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
}