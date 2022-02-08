import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const Auth = createContext();

const AuthContext = ({ children }) => {
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) setUser(user);
			else setUser(null);
		});
	}, []);

	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState({
		open: false,
		message: "",
		type: "success",
	});

	return (
		<Auth.Provider
			value={{
				user,
				loading,
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
