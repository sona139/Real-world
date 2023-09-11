import { Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useJwt } from "react-jwt";

import Context from "./store/Context";
import Header from "./components/Header";
import HomePage from "./views/home";
import AuthPage from "./views/auth";
import ProfilePage from "./views/profile";
import Article from "./views/article";
import Setting from "./views/settings";
import Editor from "./views/editor";
import api from "./api";
import ArticleProvider from "./store/Article/ArticleProvider";

function App() {
	const { isAuth, setIsAuth, setCurrentUser } = useContext(Context);
	const token = localStorage.getItem("token") || "";
	const { isExpired } = useJwt(token);

	useEffect(() => {
		if (token && !isExpired) {
			setIsAuth(true);
			api.Auth.setHeader(token);
			setCurrentUser(JSON.parse(localStorage.getItem("user")));
		} else {
			setIsAuth(false);
			setCurrentUser({});
		}
	}, [token, isAuth, isExpired, setIsAuth, setCurrentUser]);

	return (
		<div className="app">
			<Header />
			<ArticleProvider>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/user/:username" element={<ProfilePage />} />
					<Route path="/article/:slug" element={<Article />} />
					<Route path="/login" element={<AuthPage />} />
					<Route path="/register" element={<AuthPage isRegister />} />
					<Route path="/settings" element={<Setting />} />
					<Route path="/editor/:slug" element={<Editor />} />
				</Routes>
			</ArticleProvider>
		</div>
	);
}

export default App;
