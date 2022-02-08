import { Grid, Modal, Box } from "@mui/material";
import HalfBackground from "../assets/images/patternImg.0edf5760.svg";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";
import AuthForm from "../components/auth/AuthForm";

export default function Auth({ open, handleClose }) {
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className="rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto bg-white">
					<Grid container className="rounded-md">
						<Grid item xs={2} md={4} className="">
							<img
								src={HalfBackground}
								className="object-cover h-full rounded-t-lg md:rounded-none md:rounded-l-md"
							/>
							{/* <div className="bg-blue-300 w-60"></div> */}
						</Grid>
						<Grid item xs={10} md={8} className="flex p-10">
							<div className="m-auto w-80">
								<div className="space-y-6 pb-6">
									<div className="text-gray-600 font-bold text-4xl">
										Welcome to Antler Bitcoin
									</div>
									<GoogleLoginButton
										handleClose={handleClose}
									/>
								</div>
								<AuthForm handleClose={handleClose} />
							</div>
						</Grid>
					</Grid>
				</Box>
			</Modal>
		</div>
	);
}
