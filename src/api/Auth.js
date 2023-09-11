import axios from "axios";
import request from "./request";

const Auth = {
	// Set header token
	setHeader: (token) => {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	},

	// Existing user login
	login: (email, password) =>
		request.post("/users/login", { user: { email, password } }),

	// User register
	register: (username, email, password) =>
		request.post("/users", { user: { username, email, password } }),

	// Get current user
	get: () => request.get("/user"),

	// Update current user
	update: (user) => request.put("/user", { user }),
};

export default Auth;
