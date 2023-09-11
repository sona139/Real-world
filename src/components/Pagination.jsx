import React, { useContext } from "react";
import ArticleContext from "../store/Article/ArticleContext";

const Pagination = () => {
	const { offset, setOffset, limit, articlesCount } =
		useContext(ArticleContext);

	return (
		<ul className="pagination">
			{Array(Math.ceil(articlesCount / limit))
				.fill()
				?.map((item, index) => (
					<li
						key={index}
						className={
							Math.floor(offset / limit) === index
								? "page-item active"
								: "page-item"
						}
						style={{ cursor: "pointer" }}
						onClick={() => setOffset(limit * index)}
					>
						<p className="page-link">{index + 1}</p>
					</li>
				))}
		</ul>
	);
};

export default Pagination;
