import request from "./request";

const Favoried = {
	// Favoried an articles
	post: (slug) => request.post(`/articles/${slug}/favorite`),

	// Unfavoried an articles
	delete: (slug) => request.delete(`/articles/${slug}/favorite`),
};

export default Favoried;
