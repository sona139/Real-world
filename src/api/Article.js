import request from "./request";

const Article = {
	// Get recent articles form users you follow
	feed: (page) => request.get("/articles/feed", page),

	// Get recent articles globally
	global: (global) => request.get("/articles", global),

	// Create an article
	post: (article) => request.post("/articles", { article }),

	// Get an article
	get: (slug) => request.get(`/articles/${slug}`),

	// Update an article
	update: (slug, article) => request.put(`/articles/${slug}`, { article }),

	// Delete an article
	delete: (slug) => request.delete(`/articles/${slug}`),
};

export default Article;
