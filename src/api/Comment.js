import request from "./request";

const Comment = {
	// Get comment for an articles
	get: (slug) => request.get(`/articles/${slug}/comments`),

	// Create comment for an articles
	post: (slug, body) =>
		request.post(`/articles/${slug}/comments`, { comment: { body } }),

	// Delete comment for an carticles
	delete: (slug, id) => request.delete(`/articles/${slug}/comments/${id}`),
};

export default Comment;
