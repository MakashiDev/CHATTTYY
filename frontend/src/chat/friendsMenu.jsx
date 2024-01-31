import { useState } from "react";

function FriendsMenu() {
	const [page, setPage] = useState(0);
	const [friends, setFriends] = useState([
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
	]);
	const [requests, setRequests] = useState([
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
	]);

	return (
		<div
			className="absolute hidden h-screen w-screen items-center justify-center"
			id="friendsMenu"
		>
			<div className="h-2/5 w-2/4 rounded-xl bg-gray-900 text-white">
				<button
					className="relative right-0 top-0 h-4 w-4 text-xl text-red-500"
					onClick={() => {
						document.getElementById("friendsMenu").style.display =
							"none";
					}}
				>
					X
				</button>
				<div className="1/5 items-around flex w-full rounded-xl border-b-4 border-solid border-gray-900 bg-gray-900 text-center text-xl font-bold">
					<div
						onClick={() => {
							setPage(0);
							document
								.getElementById("friendsMenuFriends")
								.classList.add("bg-gray-700");
							document
								.getElementById("friendsMenuRequests")
								.classList.remove("bg-gray-700");
						}}
						id="friendsMenuFriends"
						className="w-1/2 cursor-pointer rounded-xl border-r-2 border-solid border-gray-800 bg-gray-700 py-3"
					>
						Friends
					</div>
					<div
						onClick={() => {
							setPage(1);
							document
								.getElementById("friendsMenuFriends")
								.classList.remove("bg-gray-700");
							document
								.getElementById("friendsMenuRequests")
								.classList.add("bg-gray-700");
						}}
						className=" w-1/2 cursor-pointer py-3"
						id="friendsMenuRequests"
					>
						Requests
					</div>
				</div>
				<div className="h-4/5 w-full">
					{page === 0 ? (
						<FriendsPage friends={friends} />
					) : (
						<RequestsPage requests={requests} />
					)}
				</div>
			</div>
		</div>
	);
}

function FriendsPage({ friends }) {
	return (
		<div className="flex h-full w-full flex-col">
			<div className="mt-3 flex w-full justify-center">
				<input
					type="text"
					placeholder="Add Friends"
					className="rounded-lg bg-gray-700 px-2 py-1 text-white "
				/>
				<button className="rounded-md bg-blue-600 px-3 text-white">
					Add
				</button>
			</div>
			<div className="flex h-full w-full flex-col overflow-y-auto">
				{friends.map((friend) => (
					<div className="group flex h-1/5 w-full items-center justify-around">
						<p>{friend.name}</p>
						<button className="invisible rounded-md bg-red-600 px-2 py-1 hover:bg-red-700 group-hover:visible">
							Remove
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

function RequestsPage({ requests }) {
	return (
		<div className="flex h-full w-full flex-col">
			<div className="flex h-full w-full flex-col overflow-y-auto">
				{requests.map((request) => (
					<div className="group flex h-1/5 w-full items-center justify-around">
						<p>{request.name}</p>
						<div>
							<button className="invisible rounded-md bg-green-600 px-2 py-1 hover:bg-green-700 group-hover:visible">
								Accept
							</button>
							<button className="invisible rounded-md bg-red-600 px-2 py-1 hover:bg-red-700 group-hover:visible">
								Decline
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
function showFriendsMenu() {
	document.getElementById("friendsMenu").style.display = "flex";
}

function hideFriendsMenu() {
	document.getElementById("friendsMenu").style.display = "hidden";
}

export default FriendsMenu;
export { showFriendsMenu, hideFriendsMenu };
