import { useState } from "react";
import TagContext from "./TagContext";

const TagProvider = ({ children }) => {
	const [tag, setTag] = useState("");

	return (
		<TagContext.Provider value={{ tag, setTag }}>
			{children}
		</TagContext.Provider>
	);
};

export default TagProvider;
