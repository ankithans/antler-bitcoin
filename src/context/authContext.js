import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const Auth = createContext();

const AuthContext = ({ children }) => {
	useEffect(() => {
		setLoading(true);
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
				localStorage.setItem("loggedIn", "true");
			} else {
				setUser(null);
				localStorage.setItem("loggedIn", "false");
			}
		});
		setLoading(false);
	}, []);

	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [alert, setAlert] = useState({
		open: false,
		message: "",
		type: "success",
	});

	return (
		<Auth.Provider
			value={{
				loading,
				user,
				setLoading,
				alert,
				setAlert,
			}}
		>
			{children}
		</Auth.Provider>
	);
};

export default AuthContext;

export const AuthState = () => {
	return useContext(Auth);
};
