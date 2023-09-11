import React, { useContext, useEffect, useState } from "react";
import api from "../api";
import TagContext from "../store/Tag/TagContext";

const Sidebar = () => {
	const { tag, setTag } = useContext(TagContext);

	const [isLoading, setIsLoading] = useState(false);
	const [tags, setTags] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		api.Tag.get()
			.then((res) => {
				setIsLoading(false);
				if (res.tags) {
					setTags(res.tags);
				}
			})
			.catch((e) => {
				setIsLoading(false);
				console.log(e);
			});
	}, []);
	return (
		<div className="sidebar">
			<p>Popular Tags</p>
			{isLoading ? (
				"Loading Tags..."
			) : (
				<div className="tag-list">
					{tags.map((item) =>
						item === tag ? (
							<p
								key={item}
								className="tag-default tag-pill"
								onClick={() => setTag(item)}
								style={{
									cursor: "pointer",
									backgroundColor: "#687077",
									textDecoration: "underline",
								}}
							>
								{item}
							</p>
						) : (
							<p
								key={item}
								className="tag-default tag-pill"
								onClick={() => setTag(item)}
								style={{ cursor: "pointer" }}
							>
								{item}
							</p>
						)
					)}
				</div>
			)}
		</div>
	);
};

export default Sidebar;
