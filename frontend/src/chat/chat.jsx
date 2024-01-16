import { useState, useEffect } from "react";
import Sidebar from "./sidebar/sidebar";
import SendButton from "./sendButton";
import UsMessage from "./usMessage";
import TheirMessage from "./theirMessage";

function Chat() {
	const token = localStorage.getItem("token");

	const [messages, setMessages] = useState([]);
	const [username, setUsername] = useState("");
	const [message, setMessage] = useState({
		username: "",
		message: "",
		isFromMe: true,
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log("useEffect");
		if (token) {
			// Request user info
			fetch("http://localhost:4001/api/v1/user/info", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					if (data["status"] === "success") {
						console.log(data["data"]);
						setMessage({
							...message,
							username: data["user"]["username"],
						});
						setUsername(data["user"]["username"]);
						setLoading(false);
					} else {
						window.location.href = "/login";
					}
				});
		} else {
			window.location.href = "/login";
		}
	}, []);

	console.log(username);

	const [users, setUsers] = useState([]);

	const sendMessage = () => {
		if (message) {
			if (!message.message == "") {
				const newMessages = [...messages, message];
				setMessages(newMessages);
				setMessage({ username: username, message: "", isFromMe: true });
			}
		}
	};

	let chats = {
		groups: [
			{
				id: 1,
				name: "jessica",
				lastMessage: {
					message:
						"hello, is the really awesome chat app? my friend told me about it and i wanted to check it out",
					time: "12:00",
				},
			},
			{
				id: 2,
				name: "james",
				lastMessage: {
					message: "hello",
					time: "12:00",
				},
			},
		],
	};

	return (
		<div className="flex h-screen bg-gray-800">
			<input
				type="checkbox"
				name=""
				id=""
				onChange={(e) => {
					if (e.target.checked) {
						// ask for username
						const username = prompt("Please enter your username");
						setMessage({
							...message,
							username: username,
							isFromMe: false,
						});
					} else {
						// remove username
						setMessage({
							...message,
							username: "",
							isFromMe: true,
						});
					}
				}}
			/>

			<Sidebar groups={chats.groups} />
			<div className="flex h-screen w-5/6 flex-col overflow-y-auto bg-gray-800">
				<div className="flex h-full flex-col justify-between p-4 md:w-1/2 md:self-center">
					<div
						className="mb-3 flex h-full flex-col justify-end space-y-2 overflow-y-clip"
						id="messages"
					>
						{messages.map((message) =>
							message.isFromMe ? (
								<UsMessage message={message} />
							) : (
								// <usMessage message={message} />
								<TheirMessage message={message} />
								// <theirMessage message={message} />
							)
						)}
					</div>

					<div className="w-full self-end border-t p-4">
						<form
							className="flex w-full"
							onSubmit={(e) => {
								e.preventDefault();
								sendMessage();
							}}
						>
							<input
								id="message"
								type="text"
								placeholder="Type your message..."
								className="focus:shadow-outline w-full flex-1 rounded-full bg-gray-200 p-2 outline-none"
								value={message.message}
								onChange={(e) =>
									setMessage({
										...message,
										message: e.target.value,
									})
								}
								onSubmit={sendMessage}
							/>
							<button
								id="sendMessage"
								className="ml-2 flex h-10
                w-10 items-center justify-center rounded-full bg-blue-500 text-white"
								onClick={sendMessage}
							>
								<SendButton />
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Chat;
