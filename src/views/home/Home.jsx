import React, { useContext, useEffect, useState } from "react";
import ListArticle from "../../components/ListArticle";
import api from "../../api";
import TagContext from "../../store/Tag/TagContext";
import ArticleContext from "../../store/Article/ArticleContext";

const Home = () => {
	const { offset, setOffset, limit, setArticlesCount } =
		useContext(ArticleContext);
	const { tag, setTag } = useContext(TagContext);

	const [feedActive, setFeedActive] = useState("your-feed");
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		if (feedActive === "your-feed") {
			api.Article.feed({ offset, limit })
				.then((res) => {
					console.log(res);
					if (res.articles) {
						setArticles(res.articles);
						setArticlesCount(res.articlesCount);
					}
				})
				.catch((e) => {
					console.log(e);
				})
				.finally(() => {
					setIsLoading(false);
				});
		} else if (feedActive === "global-feed") {
			api.Article.global({ offset, limit })
				.then((res) => {
					if (res.articles) {
						setArticles(res.articles);
						setArticlesCount(res.articlesCount);
					}
				})
				.catch((e) => {
					console.log(e);
				})
				.finally(() => {
					setIsLoading(false);
				});
		} else {
			api.Article.global({ offset, limit, tag })
				.then((res) => {
					if (res) {
						setArticles(res.articles);
						setArticlesCount(res.articlesCount);
					}
				})
				.catch((e) => {
					console.log(e);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [feedActive, offset, limit, tag, setArticlesCount]);

	useEffect(() => {
		if (tag) setFeedActive("other-feed");
	}, [tag]);

	return (
		<div className="col-md-9">
			<div className="feed-toggle">
				<ul className="nav nav-pills outline-active">
					<li className="nav-item">
						<button
							className={
								feedActive === "your-feed" ? "nav-link active" : "nav-link"
							}
							style={{
								marginBottom: 0,
								cursor: "pointer",
							}}
							onClick={() => {
								setOffset(0);
								setFeedActive("your-feed");
								setTag("");
							}}
							disabled={isLoading}
						>
							Your Feed
						</button>
					</li>
					<li className="nav-item">
						<button
							className={
								feedActive === "global-feed" ? "nav-link active" : "nav-link"
							}
							onClick={() => {
								setOffset(0);
								setFeedActive("global-feed");
								setTag("");
							}}
							disabled={isLoading}
							style={{
								marginBottom: 0,
								cursor: "pointer",
								disabled: isLoading,
							}}
						>
							Global Feed
						</button>
					</li>
					{tag && (
						<li className="nav-item">
							<p
								className={
									feedActive === "other-feed" ? "nav-link active" : "nav-link"
								}
								onClick={() => {
									setOffset(0);
									setFeedActive("other-feed");
								}}
								style={{ marginBottom: 0, cursor: "pointer" }}
							>
								#{tag}
							</p>
						</li>
					)}
				</ul>
			</div>

			{isLoading ? (
				<div className="article-preview">Loading...</div>
			) : (
				<ListArticle articles={articles} />
			)}
		</div>
	);
};

export default Home;
