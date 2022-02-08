import React from "react";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";

export default function AuthForm({ handleClose }) {
	const [isLoginForm, setIsLoginForm] = useState(true);

	return (
		<div>
			{isLoginForm && (
				<LoginForm
					setIsLoginForm={setIsLoginForm}
					handleClose={handleClose}
				/>
			)}
			{!isLoginForm && (
				<SignUpForm
					setIsLoginForm={setIsLoginForm}
					handleClose={handleClose}
				/>
			)}
		</div>
	);
}
