export const TOKEN_KEY = '@user-token';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const salvarToken = token => {
	localStorage.setItem(TOKEN_KEY, token);
};
export const removeTokenOnLogout = () => {
	localStorage.removeItem(TOKEN_KEY);
};