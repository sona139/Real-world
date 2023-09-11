import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import Context from "../../store/Context";

const Error = ({ errors }) => {
	return (
		<ul className="error-messages">
			{Object.entries(errors).map(([key, value]) => (
				<li key={key}>{key + " " + value}</li>
			))}
		</ul>
	);
};

const AuthPage = ({ isRegister }) => {
	const { setIsAuth, setCurrentUser } = useContext(Context);
	const navigate = useNavigate();

	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [errors, setErrors] = useState([]);

	const submitSuccess = (data) => {
		const { token, ...user } = data;

		setIsAuth(true);
		setCurrentUser(user);

		api.Auth.setHeader(token);
		localStorage.setItem("token", token);
		localStorage.setItem("user", JSON.stringify(user));

		navigate("/");
	};

	const handleSubmitLogin = async (e) => {
		e.preventDefault();

		try {
			const data = await api.Auth.login(email, password);

			if (data?.errors) {
				setErrors(data.errors);
				return;
			}

			submitSuccess(data.user);
		} catch (e) {
			console.log(e);
		}
	};

	const handleSubmitRegister = async (e) => {
		e.preventDefault();
		try {
			const data = await api.Auth.register(username, email, password);

			if (data?.errors) {
				setErrors(data.errors);
				return;
			}

			submitSuccess(data.user);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="auth-page">
			<div className="container page">
				<div className="row">
					<div className="col-md-6 offset-md-3 col-xs-12">
						<h1 className="text-xs-center">
							{isRegister ? "Sign Up" : "Sign In"}
						</h1>
						<p className="text-xs-center">
							<Link to={isRegister ? "/login" : "/register"}>
								{isRegister ? "Have an account?" : "Need an account?"}
							</Link>
						</p>

						{errors && <Error errors={errors} />}

						<form
							onSubmit={(e) =>
								isRegister ? handleSubmitRegister(e) : handleSubmitLogin(e)
							}
						>
							<fieldset className="form-group">
								{isRegister && (
									<input
										defaultValue={username}
										onChange={(e) => {
											setUsername(e.target.value);
										}}
										className="form-control form-control-lg"
										type="text"
										placeholder="Username"
									/>
								)}
							</fieldset>
							<fieldset className="form-group">
								<input
									defaultValue={email}
									onChange={(e) => {
										setEmail(e.target.value);
									}}
									className="form-control form-control-lg"
									type="text"
									placeholder="Email"
								/>
							</fieldset>
							<fieldset className="form-group">
								<input
									defaultValue={password}
									onChange={(e) => {
										setPassword(e.target.value);
									}}
									className="form-control form-control-lg"
									type="password"
									placeholder="Password"
								/>
							</fieldset>
							<button className="btn btn-lg btn-primary pull-xs-right">
								{isRegister ? "Sign Up" : "Sign In"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
