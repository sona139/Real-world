import React, { useContext, useEffect, useRef, useState } from "react";
import ListArticle from "../../components/ListArticle";
import { Link, useParams } from "react-router-dom";
import api from "../../api";
import Context from "../../store/Context";
import ArticleContext from "../../store/Article/ArticleContext";

const ProfileInfo = ({ username }) => {
	const { currentUser } = useContext(Context);

	const [profile, setProfile] = useState({});
	const [following, setFollowing] = useState(false);
	const flwBtn = useRef();

	useEffect(() => {
		api.Profile.get(username)
			.then((res) => {
				if (res.profile) {
					setProfile(res.profile);
				}
			})
			.catch((e) => console.log(e));
	}, [username]);

	useEffect(() => {
		setFollowing(profile.following);
	}, [profile]);

	const handleFollowing = () => {
		flwBtn.current.disabled = true;
		if (!following) {
			api.Profile.post(username)
				.then((res) => {
					setFollowing(res.profile.following);
					flwBtn.current.disabled = false;
				})
				.catch((e) => {
					flwBtn.current.disabled = false;
					console.log(e);
				});
		} else {
			api.Profile.delete(username)
				.then((res) => {
					setFollowing(res.profile.following);
					flwBtn.current.disabled = false;
				})
				.catch((e) => {
					flwBtn.current.disabled = false;
					console.log(e);
				});
		}
	};

	return (
		<div className="user-info">
			<div className="container">
				<div className="row">
					<div className="col-md-10 offset-md-1">
						<img
							src={
								profile.image ||
								"https://api.realworld.io/images/smiley-cyrus.jpeg"
							}
							className="user-img"
							alt="Avatar's User"
						/>
						<h4>{username}</h4>
						<p>{profile.bio}</p>
						{currentUser.username !== username ? (
							<button
								ref={flwBtn}
								className="btn btn-sm btn-outline-secondary action-btn"
								onClick={handleFollowing}
							>
								<i className="ion-plus-round"></i>
								&nbsp; {following ? "Unfollow" : "Follow"} {profile.username}{" "}
							</button>
						) : (
							<Link
								to="/settings"
								className="btn btn-sm btn-outline-secondary action-btn"
							>
								<i className="ion-gear-a"></i>
								Edit Profile Settings
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

const ProfilePage = () => {
	const { username } = useParams();
	const { offset, limit, setArticlesCount } = useContext(ArticleContext);

	const [feedActive, setFeedActive] = useState("my-articles");
	const [isLoading, setIsLoading] = useState(false);
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		if (feedActive === "my-articles") {
			api.Article.global({ offset, limit, author: username })
				.then((res) => {
					if (res.articles) {
						setArticles(res.articles);
						setArticlesCount(res.articlesCount);
						setIsLoading(false);
					}
				})
				.catch((e) => {
					setIsLoading(false);
					console.log(e);
				});
		} else {
			api.Article.global({ offset, limit, favorited: username })
				.then((res) => {
					if (res.articles) {
						setArticles(res.articles);
						setArticlesCount(res.articlesCount);
						setIsLoading(false);
					}
				})
				.catch((e) => {
					setIsLoading(false);
					console.log(e);
				});
		}
	}, [feedActive, offset, limit, username]);

	return (
		<div className="profile-page">
			<ProfileInfo username={username} />

			<div className="container">
				<div className="row">
					<div className="col-md-10 offset-md-1">
						<ul className="nav nav-pills outline-active">
							<li className="nav-item">
								<button
									disabled={isLoading}
									className={
										feedActive === "my-articles"
											? "nav-link active"
											: "nav-link"
									}
									style={{ marginBottom: 0, cursor: "pointer" }}
									onClick={() => {
										setFeedActive("my-articles");
									}}
								>
									My Articles
								</button>
							</li>
							<li className="nav-item">
								<button
									disabled={isLoading}
									className={
										feedActive === "favoried-articles"
											? "nav-link active"
											: "nav-link"
									}
									onClick={() => {
										setFeedActive("favoried-articles");
									}}
									style={{ marginBottom: 0, cursor: "pointer" }}
								>
									Favoried Articles
								</button>
							</li>
						</ul>

						{isLoading ? (
							<div className="article-preview">Loading...</div>
						) : (
							<ListArticle articles={articles} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
