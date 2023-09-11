import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../store/Context";

const LoggedOutNavbar = () => {
	const { isAuth, currentUser } = useContext(Context);

	return (
		<ul className="nav navbar-nav pull-xs-right">
			<li className="nav-item">
				<Link to="/" className="nav-link">
					Home
				</Link>
			</li>

			{isAuth ? (
				<>
					<li className="nav-item">
						<Link className="nav-link" to="/editor/-1">
							<i className="ion-compose"></i>&nbsp;New Post
						</Link>
					</li>

					<li className="nav-item">
						<Link className="nav-link" to="settings">
							<i className="ion-gear-a"></i>&nbsp;Settings
						</Link>
					</li>

					<li className="nav-item">
						<Link className="nav-link" to={`/user/${currentUser.username}`}>
							<img
								src={
									currentUser.image ||
									"https://api.realworld.io/images/smiley-cyrus.jpeg"
								}
								className="user-pic"
								alt="Avatar's User"
							/>
							{currentUser.username}
						</Link>
					</li>
				</>
			) : (
				<>
					<li className="nav-item">
						<Link to="/login" className="nav-link">
							Sign in
						</Link>
					</li>

					<li className="nav-item">
						<Link to="/register" className="nav-link">
							Sign up
						</Link>
					</li>
				</>
			)}
		</ul>
	);
};

const Header = () => {
	return (
		<nav className="navbar navbar-light">
			<div className="container">
				<Link className="navbar-brand" to="/">
					conduit
				</Link>
				<LoggedOutNavbar />
			</div>
		</nav>
	);
};

export default Header;
