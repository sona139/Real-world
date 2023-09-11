import { useState } from "react";
import Context from "./Context";

const Provider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(false);
	const [currentUser, setCurrentUser] = useState({});

	return (
		<Context.Provider
			value={{
				isAuth,
				setIsAuth,
				currentUser,
				setCurrentUser,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default Provider;
