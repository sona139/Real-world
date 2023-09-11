import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import ArticleContext from "../../store/Article/ArticleContext";

const Editor = () => {
	const { slug } = useParams();
	const navigate = useNavigate();
	const { currentArticle } = useContext(ArticleContext);

	const [article, setArticle] = useState(
		slug === "-1"
			? {}
			: {
					...currentArticle,
					tagList: currentArticle.tagList?.join(" "),
			  }
	);

	useEffect(() => {
		if (slug === "-1") setArticle({});
	}, [slug]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (article.tagList) article.tagList = article.tagList.split(" ");

		if (slug !== "-1") {
			api.Article.update(slug, article)
				.then((res) => navigate(`/article/${res.article.slug}`))
				.catch((e) => console.log(e));
		} else {
			api.Article.post(article)
				.then((res) => {
					navigate(`/article/${res.article.slug}`);
				})
				.catch((e) => console.log(e));
		}
	};

	return (
		<div className="editor-page">
			<div className="container page">
				<div className="row">
					<div className="col-md-10 offset-md-1 col-xs-12">
						{/* <!-- react-empty: 54 --> */}
						<form onSubmit={(e) => handleSubmit(e)}>
							<fieldset>
								<fieldset className="form-group">
									<input
										value={article.title || ""}
										onChange={(e) =>
											setArticle((prev) => {
												return { ...prev, title: e.target.value };
											})
										}
										type="text"
										className="form-control form-control-lg"
										placeholder="Article Title"
									/>
								</fieldset>
								<fieldset className="form-group">
									<input
										value={article.description || ""}
										onChange={(e) =>
											setArticle((prev) => {
												return { ...prev, description: e.target.value };
											})
										}
										type="text"
										className="form-control"
										placeholder="What's this article about?"
									/>
								</fieldset>
								<fieldset className="form-group">
									<textarea
										value={article.body || ""}
										onChange={(e) =>
											setArticle((prev) => {
												return { ...prev, body: e.target.value };
											})
										}
										className="form-control"
										rows="8"
										placeholder="Write your article (in markdown)"
									></textarea>
								</fieldset>
								<fieldset className="form-group">
									<input
										value={article.tagList || ""}
										onChange={(e) =>
											setArticle((prev) => {
												return { ...prev, tagList: e.target.value };
											})
										}
										type="text"
										className="form-control"
										placeholder="Enter tags"
									/>
									<div className="tag-list"></div>
								</fieldset>
								<button
									className="btn btn-lg pull-xs-right btn-primary"
									type="submit"
								>
									Publish Article
								</button>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Editor;
