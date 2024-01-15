// src/components/Navbar.js
import React from "react";

const Navbar = () => {
	return (
		<nav className="bg-gray-800 p-4">
			<div className="container mx-auto">
				<div className="flex items-center justify-between">
					<a href="/" className="text-xl font-bold text-white">
						CHATTTYY
					</a>
					<div className="flex items-center space-x-4">
						<a
							href="/"
							className="px-2 text-white hover:text-gray-400"
						>
							Home
						</a>
						<a
							href="/contact"
							className="px-2 text-white hover:text-gray-400"
						>
							Contact
						</a>
						<a
							href="/login"
							className="px-2 text-white hover:text-gray-400"
						>
							Login
						</a>
						<button
							className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
							onClick={() => {
								window.location.href = "/signup";
							}}
						>
							Get Started
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
