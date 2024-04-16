/**
 * Returns the username up to the "@" symbol from the given email.
 * @param {string} userEmail - The email address from which to extract the username.
 * @returns {string} The username up to the "@" symbol.
 */
export const getUserNameUpToEmailSymbol = (userEmail: string): string => {
	const symbolPos = userEmail.indexOf("@");
	const username = userEmail.slice(0, symbolPos);
	return username;
};

/**
 * Returns the formatted date in the MM/DD/YYYY format from the given timestamp.
 * @param {string} timestamp - The timestamp to format.
 * @returns {string} The formatted date string.
 */
export const getFormattedDate = (timestamp: string): string => {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${month}/${day}/${year}`;
};
