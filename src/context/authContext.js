import { createContext, useContext, useEffect, useState } from "react";

const Auth = createContext();

const AuthContext = ({ children }) => {
	useEffect(() => {});

	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	return (
		<Auth.Provider
			value={{
				user,
				loading,
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
