import React, { useContext, useEffect, useState } from "react";
import TagList from "../../components/TagList";
import api from "../../api";
import { Link } from "react-router-dom";
import ArticleContext from "../../store/Article/ArticleContext";
import Context from "../../store/Context";

const ArticleComment = ({ comment, currentUser, slug, setComments }) => {
	const handleDeleteComment = () => {
		api.Comment.delete(slug, comment.id)
			.then((res) =>
				setComments((prev) => prev.filter((cmt) => cmt.id !== comment.id))
			)
			.catch((e) => console.log(e));
	};

	return (
		<div className="card">
			<div className="card-block">
				<p className="card-text">{comment.body}</p>
			</div>
			<div className="card-footer">
				<Link
					to={`/user/${comment.author.username}`}
					className="comment-author"
				>
					<img
						src={comment.author.image}
						className="comment-author-img"
						alt="Avatar's user"
					/>
				</Link>
				&nbsp;
				<Link
					to={`/user/${comment.author.username}`}
					className="comment-author"
				>
					{comment.author.username}
				</Link>
				<span className="date-posted">Fri Aug 25 2023</span>
				{comment.author.username === currentUser?.username && (
					<span className="mod-options" onClick={handleDeleteComment}>
						<i className="ion-trash-a"></i>
					</span>
				)}
			</div>
		</div>
	);
};

const ArticleCommentForm = ({ slug, currentUser, setComments }) => {
	const [comment, setComment] = useState("");

	const handlePostComment = (e) => {
		e.preventDefault();

		api.Comment.post(slug, comment)
			.then((res) => {
				console.log(res);
				setComment("");
				setComments((prev) => [...prev, res.comment]);
			})
			.catch((e) => console.log(e));
	};

	return (
		<form className="card comment-form">
			<div className="card-block">
				<textarea
					value={comment}
					onChange={(e) => {
						setComment(e.target.value);
					}}
					className="form-control"
					placeholder="Write a comment..."
					rows="3"
				></textarea>
			</div>
			<div className="card-footer">
				<img
					src={
						currentUser?.image ||
						"https://api.realworld.io/images/smiley-cyrus.jpeg"
					}
					className="comment-author-img"
					alt="Avatar's user"
				/>
				<button
					className="btn btn-sm btn-primary"
					onClick={(e) => handlePostComment(e)}
				>
					Post Comment
				</button>
			</div>
		</form>
	);
};

const ArticleContent = ({ article }) => {
	const { currentUser } = useContext(Context);
	const { setCurrentArticle } = useContext(ArticleContext);

	const [comments, setComments] = useState([]);

	useEffect(() => {
		setCurrentArticle(article);
	}, []);

	useEffect(() => {
		if (article.slug)
			api.Comment.get(article.slug)
				.then((res) => {
					if (res.comments) {
						setComments(res.comments);
					}
				})
				.catch((e) => console.log(e));
	}, []);

	return (
		<div className="container page">
			<div className="row article-content">
				<div className="col-xs-12">
					<div>
						<p style={{ wordWrap: "break-word", whiteSpace: "pre-line" }}>
							{article.body?.replace(/\\n/g, "\n")}
						</p>
					</div>
				</div>
			</div>

			<TagList tagList={article.tagList} />

			<hr />

			<div className="row">
				<div className="col-md-8 offset-md-2">
					<ArticleCommentForm
						slug={article.slug}
						currentUser={currentUser}
						setComments={setComments}
					/>
					{comments.map((comment) => (
						<ArticleComment
							key={comment.id}
							comment={comment}
							currentUser={currentUser}
							slug={article.slug}
							setComments={setComments}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ArticleContent;
