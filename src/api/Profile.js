import request from "./request";

const Profile = {
	// Get a profile
	get: (username) => request.get(`/profiles/${username}`),

	// Follow a user
	post: (username) => request.post(`/profiles/${username}/follow`),

	// Unfollow a user
	delete: (username) => request.delete(`/profiles/${username}/follow`),
};

export default Profile;
