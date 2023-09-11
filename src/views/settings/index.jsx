import React, { useContext, useEffect, useState } from "react";
import Context from "../../store/Context";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

const Setting = () => {
	const { setIsAuth, currentUser, setCurrentUser } = useContext(Context);
	const navigate = useNavigate();

	const [user, setUser] = useState(currentUser);

	useEffect(() => {
		setUser(currentUser);
	}, [currentUser]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		await api.Auth.update(user)
			.then((res) => {
				setCurrentUser(res.user);
				navigate("/");
			})
			.catch((e) => console.log(e));
	};

	const onLogOut = () => {
		setIsAuth(false);
		localStorage.removeItem("token");
	};

	return (
		<div className="settings-page">
			<div className="container page">
				<div className="row">
					<div className="col-md-6 offset-md-3 col-xs-12">
						<h1 className="text-xs-center">Your Settings</h1>

						<form onSubmit={(e) => handleSubmit(e)}>
							<fieldset>
								<fieldset className="form-group">
									<input
										defaultValue={user?.image}
										onChange={(e) =>
											setUser((prev) => {
												return { ...prev, image: e.target.value };
											})
										}
										className="form-control"
										type="text"
										placeholder="URL of profile picture"
									/>
								</fieldset>
								<fieldset className="form-group">
									<input
										defaultValue={user?.username}
										onChange={(e) =>
											setUser((prev) => {
												return { ...prev, username: e.target.value };
											})
										}
										className="form-control form-control-lg"
										type="text"
										placeholder="Your Name"
									/>
								</fieldset>
								<fieldset className="form-group">
									<textarea
										defaultValue={user?.bio}
										onChange={(e) => {
											setUser((prev) => {
												return { ...prev, bio: e.target.value };
											});
										}}
										className="form-control form-control-lg"
										rows="8"
										placeholder="Short bio about you"
									></textarea>
								</fieldset>
								<fieldset className="form-group">
									<input
										defaultValue={user?.email}
										onChange={(e) =>
											setUser((prev) => {
												return { ...prev, email: e.target.value };
											})
										}
										className="form-control form-control-lg"
										type="email"
										placeholder="Email"
									/>
								</fieldset>
								<fieldset className="form-group">
									<input
										onChange={(e) =>
											setUser((prev) => {
												return { ...prev, password: e.target.value };
											})
										}
										className="form-control form-control-lg"
										type="password"
										placeholder="New Password"
									/>
								</fieldset>
								<button className="btn btn-lg btn-primary pull-xs-right">
									Update Settings
								</button>
							</fieldset>
						</form>

						<hr />

						<Link to="/" className="btn btn-outline-danger" onClick={onLogOut}>
							Or click here to logout.
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Setting;
