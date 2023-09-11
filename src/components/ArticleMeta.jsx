import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import ArticleContext from "../store/Article/ArticleContext";

const ArticleMeta = ({
	author = {},
	favorited,
	favoritesCount,
	slug,
	myArticle,
}) => {
	const navigate = useNavigate();

	const { currentArticle } = useContext(ArticleContext);
	const [frt, setFrt] = useState(favorited);
	const [frtCount, setFrtCount] = useState(favoritesCount);

	const frtBtn = useRef();

	useEffect(() => {
		setFrt(favorited);
	}, [favorited]);

	useEffect(() => {
		setFrtCount(favoritesCount);
	}, [favoritesCount]);

	const handleFavorite = () => {
		frtBtn.current.disabled = true;
		if (!frt) {
			api.Favoried.post(slug)
				.then((res) => {
					setFrt(res.article.favorited);
					setFrtCount(res.article.favoritesCount);
				})
				.catch((e) => {
					console.log(e);
				})
				.finally(() => {
					frtBtn.current.disabled = false;
				});
		} else {
			api.Favoried.delete(slug)
				.then((res) => {
					setFrt(res.article.favorited);
					setFrtCount(res.article.favoritesCount);
					frtBtn.current.disabled = false;
				})
				.catch((e) => {
					console.log(e);
					frtBtn.current.disabled = false;
				});
		}
	};

	const handleDeleteArticle = () => {
		api.Article.delete(currentArticle.slug)
			.then(() => {
				navigate("/");
			})
			.catch((e) => console.log(e));
	};

	return (
		<div className="article-meta">
			<Link to={`/user/${author?.username}`}>
				<img
					src={
						author.image || "https://api.realworld.io/images/smiley-cyrus.jpeg"
					}
					alt="Avatar' User"
				/>
			</Link>
			<div className="info">
				<Link to={`/user/${author?.username}`} className="author">
					{author?.username}
				</Link>
				<span className="date">January 20th</span>
			</div>
			{myArticle && (
				<span>
					<Link
						to={`/editor/${slug}`}
						className="btn btn-outline-secondary btn-sm"
					>
						<i className="ion-edit"></i>Edit Article
					</Link>
					<button
						className="btn btn-outline-danger btn-sm"
						onClick={handleDeleteArticle}
					>
						<i className="ion-trash-a"></i>Delete Article
					</button>
				</span>
			)}
			{(!!frtCount || frtCount === 0) && (
				<div className="pull-xs-right">
					<button
						ref={frtBtn}
						className={
							frt ? "btn btn-sm btn-primary" : "btn btn-sm btn-outline-primary"
						}
						onClick={handleFavorite}
					>
						<i className="ion-heart"></i>
						{frtCount}
					</button>
				</div>
			)}
		</div>
	);
};

export default ArticleMeta;
