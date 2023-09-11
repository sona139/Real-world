import { useNavigate } from "react-router-dom";
import ArticleMeta from "./ArticleMeta";
import TagList from "./TagList";
import { useContext } from "react";
import Context from "../store/Context";
import Pagination from "./Pagination";

const ListArticle = ({ articles = [] }) => {
	const navigate = useNavigate();
	const { setCurrentArticle } = useContext(Context);
	return articles.length > 0 ? (
		<div>
			{articles.map((article) => (
				<div
					key={article.slug}
					className="article-preview"
					style={{ cursor: "pointer" }}
				>
					<ArticleMeta
						author={article.author}
						favorited={article.favorited}
						favoritesCount={article.favoritesCount}
						slug={article.slug}
					/>
					<div
						className="preview-link"
						onClick={() => {
							setCurrentArticle(article);
							navigate(`/article/${article.slug}`);
						}}
					>
						<h1>{article.title}</h1>
						<p>{article.description}</p>
						<span>Read more...</span>

						<TagList tagList={article.tagList} />
					</div>
				</div>
			))}
			<Pagination />
		</div>
	) : (
		<div className="article-preview">No articles are here... yet.</div>
	);
};

export default ListArticle;
