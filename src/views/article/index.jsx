import React, { useContext, useEffect, useState } from "react";
import ArticleHeader from "./ArticleHeader";
import ArticleContent from "./ArticleContent";
import { useParams } from "react-router-dom";
import api from "../../api";
import ArticleContext from "../../store/Article/ArticleContext";

const Article = () => {
	const { setCurrentArticle } = useContext(ArticleContext);

	const { slug } = useParams();
	const [article, setArticle] = useState({});

	useEffect(() => {
		api.Article.get(slug)
			.then((res) => {
				setArticle(res.article);
				setCurrentArticle(res.article);
			})
			.catch((e) => console.log(e));
	}, []);

	return (
		<div className="article-page">
			<ArticleHeader article={article} />

			<ArticleContent article={article} />
		</div>
	);
};

export default Article;
