import React, { useContext } from "react";
import ArticleMeta from "../../components/ArticleMeta";
import Context from "../../store/Context";

const ArticleHeader = ({ article }) => {
	const { currentUser } = useContext(Context);
	return (
		<div className="banner">
			<div className="container">
				<h1>{article.title}</h1>

				<ArticleMeta
					author={article.author}
					slug={article.slug}
					myArticle={article.author?.username === currentUser.username}
				/>
			</div>
		</div>
	);
};

export default ArticleHeader;
