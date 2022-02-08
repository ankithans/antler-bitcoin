import { Snackbar, Alert } from "@mui/material";
import { AuthState } from "../../context/authContext";

export default function CustomAlert() {
	const { alert, setAlert } = AuthState();

	const handleClose = (event, reason) => {
		if (reason === "clickaway") return;

		setAlert({ open: false });
	};

	return (
		<Snackbar
			open={alert.open}
			autoHideDuration={3000}
			onClose={handleClose}
		>
			<Alert
				elevation={10}
				variant="filled"
				severity={alert.type}
				onClose={handleClose}
			>
				{alert.message}
			</Alert>
		</Snackbar>
	);
}
