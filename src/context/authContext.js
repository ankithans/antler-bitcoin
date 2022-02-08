import { createContext, useContext, useEffect, useState } from "react";

const Auth = createContext();

const AuthContext = ({ children }) => {
	useEffect(() => {});

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
				setUser,
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

export const CryptoState = () => {
	return useContext(Auth);
};
