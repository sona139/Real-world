import { useState } from "react";
import ArticleContext from "./ArticleContext";

const ArticleProvider = ({ children }) => {
	const [currentArticle, setCurrentArticle] = useState({});
	const [articlesCount, setArticlesCount] = useState(0);
	const [offset, setOffset] = useState(0);
	const [limit, setLimit] = useState(10);
	return (
		<ArticleContext.Provider
			value={{
				currentArticle,
				setCurrentArticle,
				offset,
				setOffset,
				limit,
				setLimit,
				articlesCount,
				setArticlesCount,
			}}
		>
			{children}
		</ArticleContext.Provider>
	);
};
export default ArticleProvider;
