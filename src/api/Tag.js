import request from "./request";

const Tag = {
	get: () => request.get("/tags"),
};

export default Tag;
