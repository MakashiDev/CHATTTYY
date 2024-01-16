import Navbar from "./navbar";

function Login() {
	function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);

		let username = data.username;
		let password = data.password;
		console.log(username, password);

		const body = { username: username, password: password };

		const options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		};

		fetch("http://localhost:4001/api/v1/user/login", options)
			.then((response) => response.json())
			.then((response) => {
				if (response["status"] === "success") {
					localStorage.setItem("token", response["token"]);
					window.location.href = "/chat";
				} else {
					alert(response["error"]);
				}
			})
			.catch((err) => console.error(err));
	}

	return (
		<div className="flex h-screen flex-col bg-gray-900 text-white">
			<Navbar />
			<div className="flex h-screen items-center justify-center bg-gray-900 text-white">
				<div className="w-1/2 p-8">
					<h1 className="mb-4 text-4xl font-bold">
						Welcome to CHATTTYY
					</h1>
					<p className="text-gray-400">
						Connect with friends and chat in real-time. Join the
						conversation!
					</p>
				</div>

				<div className="w-2/6 rounded-md bg-gray-800 p-8 shadow-md">
					<h2 className="mb-6 text-2xl font-bold">
						Login to your account
					</h2>

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
								Username or Email
							</label>
							<input
								type="text"
								id="username"
								name="username"
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
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
