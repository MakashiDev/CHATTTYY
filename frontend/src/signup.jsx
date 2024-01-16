import Navbar from "./navbar";
import { useState, useEffect } from "react";

function Signup() {
	const [username, setUsername] = useState("");

	useEffect(() => {
		closeError();
		if (username == "") {
			return;
		}
		// Check if username is taken
		const options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username: username }),
		};

		fetch("http://localhost:4001/api/v1/user/username", options)
			.then((response) => response.json())
			.then((data) => {
				if (data.status != "success") {
					console.log(data.error);
					error(data.error);
				}
			})
			.catch((err) => console.error(err));
	}, [username]);

	function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);

		let email = data.email;
		let password = data.password;

		// Check if email is valid (contains @ and .)
		if (!email.includes("@") || !email.includes(".")) {
			error("Invalid email");
			return;
		}

		// Check if password is valid
		if (password.length < 8) {
			error("Password must be at least 8 characters long");
			return;
		}
		// Check if password contains a number and a letter and a special character (regex)
		if (
			!password.match(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
			)
		) {
			error(
				"Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
			);
			return;
		}

		if (username == "") {
			error("Username cannot be empty");
			return;
		}

		if (username.length < 4) {
			error("Username must be at least 4 characters long");
			return;
		}

		// Make sure username is alphanumeric
		if (!username.match(/^[a-z0-9]+$/i)) {
			error("Username must be alphanumeric");
			return;
		}

		const body = { username: username, email: email, password: password };

		const options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		};

		fetch("http://localhost:4001/api/v1/user/register", options)
			.then((response) => response.json())
			.then((data) => {
				if (data.success != "success") {
					error(data.error);
				}
				if (data.success == "success") {
					window.location.href = "/login";
				}
			})
			.catch((err) => console.error(err));
	}

	function error(message) {
		document.getElementById("error").classList.remove("hidden");
		document.getElementById("error-message").innerHTML = message;
	}

	function closeError() {
		document.getElementById("error").classList.add("hidden");
	}

	return (
		<div className="flex h-screen flex-col bg-gray-900 text-white">
			<Navbar />
			<div className="flex h-screen items-center justify-center bg-gray-900 text-white">
				<div className="w-1/2 p-8">
					<h1 className="mb-4 text-4xl font-bold">
						Welcome to CHATTTYY
					</h1>
					<p className="text-gray-400">Sign up here!</p>
				</div>

				<div className="w-2/6 rounded-md bg-gray-800 p-8 shadow-md">
					<h2 className="mb-6 text-2xl font-bold"> Sign up here!</h2>

					<div
						className="relative hidden w-full rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
						role="alert"
						id="error"
					>
						<strong className="text-lg font-bold ">Error!</strong>
						<span className="block" id="error-message"></span>
						<button
							className="absolute bottom-0 right-0 top-0 px-4 py-3"
							onClick={() => {
								document
									.getElementById("error")
									.classList.add("hidden");
							}}
						>
							Close
						</button>
					</div>

					<form
						action="#"
						method="POST"
						className="space-y-4"
						onSubmit={handleSubmit}
					>
						<div>
							<label
								for="username"
								className="block text-sm font-medium text-gray-300"
							>
								Username
							</label>
							<input
								type="text"
								id="username"
								name="username"
								className="mt-1 w-full rounded-md border bg-gray-700 p-2 text-gray-100"
								onChange={(e) => {
									setUsername(e.target.value);
								}}
								value={username}
							/>
						</div>
						<div>
							<label
								for="email"
								className="block text-sm font-medium text-gray-300"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								className="mt-1 w-full rounded-md border bg-gray-700 p-2 text-gray-100"
							/>
						</div>

						<div>
							<label
								for="password"
								className="block text-sm font-medium text-gray-300"
							>
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								className="mt-1 w-full rounded-md border bg-gray-700 p-2 text-gray-100"
							/>
						</div>

						<div className="flex items-center">
							<input
								type="checkbox"
								id="remember"
								name="remember"
								className="mr-2"
							/>
							<label
								for="remember"
								className="text-sm text-gray-400"
							>
								Remember me
							</label>
						</div>

						<button
							type="submit"
							className="focus:shadow-outline-blue rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none active:bg-blue-800"
						>
							Get Started!
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Signup;
