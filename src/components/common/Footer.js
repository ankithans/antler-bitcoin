import React from "react";

export default function Footer() {
	return (
		<div>
			<footer className="p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
				<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
					© 2022{" "}
					<button className="hover:underline" target="_blank">
						Antler Bitcoin™
					</button>
					. All Rights Reserved.
				</span>
				<ul className="flex flex-wrap items-center mt-3 sm:mt-0">
					<li>
						<button className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">
							About
						</button>
					</li>
					<li>
						<button className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">
							Privacy Policy
						</button>
					</li>
					<li>
						<button className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">
							Licensing
						</button>
					</li>
					<li>
						<button className="text-sm text-gray-500 hover:underline dark:text-gray-400">
							Contact
						</button>
					</li>
				</ul>
			</footer>
		</div>
	);
}
