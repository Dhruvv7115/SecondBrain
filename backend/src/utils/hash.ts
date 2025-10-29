export const generateRandomHash = () => {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let hash = "";
	for (let i = 0; i < 10; i++) {
		hash += characters[Math.floor(Math.random() * characters.length)];
	}
	return hash;
};
