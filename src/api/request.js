import axios from "axios";
axios.defaults.baseURL = "https://api.realworld.io/api";

const getParams = (query) => {
	if (!query) return null;
	const params = [];

	Object.entries(query).forEach((param) => {
		params.push(param.join("="));
	});

	return params.join("&");
};

const request = {
	get: async (url, query) => {
		const params = getParams(query);
		url = params ? `${url}?${params}` : url;

		try {
			const res = await axios.get(url);
			return res.data;
		} catch (e) {
			return e.response.data;
		}
	},

	post: async (url, body) => {
		try {
			const res = await axios.post(url, body);
			return res.data;
		} catch (e) {
			return e.response.data;
		}
	},

	put: async (url, body) => {
		try {
			const res = await axios.put(url, body);
			return res.data;
		} catch (e) {
			return e.response.data;
		}
	},

	delete: async (url, body) => {
		try {
			const res = await axios.delete(url, body);
			return res.data;
		} catch (e) {
			return e.response?.data;
		}
	},
};

export default request;
