function Modal() {
	return (
		<div
			id="groupCreateModal"
			className="absolute hidden h-screen w-screen items-center justify-center bg-black bg-opacity-50"
		>
			<div className="flex h-2/5 w-3/6 rounded-lg bg-gray-800">
				<div className="h-full w-4/6">
					<div className="flex h-1/6 justify-between p-4">
						<h1 className="text-4xl font-bold text-white">
							Create Group
						</h1>
						<button className="text-red-500" onClick={hideModal}>
							<svg
								stroke="currentColor"
								fill="currentColor"
								stroke-width="0"
								viewBox="0 0 1024 1024"
								height="1em"
								width="1em"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
							</svg>
						</button>
					</div>

					<div className="flex h-5/6 w-full flex-col justify-between px-4 py-6">
						<div className="flex h-3/4 w-full flex-col justify-around">
							<div className="flex w-full flex-col">
								<label className="text-white">Group Name</label>
								<input
									type="text"
									className="rounded-lg bg-gray-700 p-2 text-white outline-none"
									id="groupNameInput"
								/>
							</div>
							<div className="flex w-full flex-col">
								<label className="pt-5 text-white">
									Add Members
								</label>
								<input
									type="text"
									className="rounded-lg bg-gray-700 p-2 text-white outline-none"
									id="memberInput"
									onChange={hideAddMemberError}
								/>
								<span
									className="text-red-500"
									id="error"
								></span>
							</div>
						</div>
						<div className="flex  h-1/4 justify-between gap-2 pt-5">
							<button
								className="rounded-lg bg-blue-500 p-2 text-white"
								onClick={addMember}
							>
								Add Member
							</button>
							<button className="rounded-lg bg-green-500 p-2 text-white">
								Finsish
							</button>
						</div>
					</div>
				</div>
				<div className="flex h-full w-2/6 flex-col border-l-2 border-dashed border-gray-600">
					<h1 className="pl-4 pt-5 text-2xl font-bold text-white">
						Added Members
					</h1>
					<div
						id="members"
						className="flex flex-col overflow-y-scroll p-4"
					></div>
				</div>
			</div>
		</div>
	);
}

const members = [];

function addMember() {
	// TODO: Check if user is friends with the member via the backend

	const member = document.getElementById("members");
	const input = document.getElementById("memberInput");
	if (input.value === "") {
		showAddMemberError("Please enter a member");
		return;
	}
	if (members.includes(input.value)) {
		showAddMemberError("Member already added");
		return;
	}
	const newMember = document.createElement("p");
	newMember.className =
		"rounded-lg bg-gray-700 p-2 my-1 text-white cursor-pointer";
	newMember.innerHTML = input.value;
	member.appendChild(newMember);
	// Add the member to the members array
	members.push(input.value);
	input.value = "";
}

function showAddMemberError(error) {
	const errorSpan = document.getElementById("error");
	errorSpan.innerHTML = error;
}
function hideAddMemberError() {
	const errorSpan = document.getElementById("error");
	errorSpan.innerHTML = "";
}

function showModal() {
	const modal = document.getElementById("groupCreateModal");
	modal.classList.remove("hidden");
	modal.classList.add("flex");
}

function hideModal() {
	const modal = document.getElementById("groupCreateModal");
	modal.classList.add("hidden");
	modal.classList.remove("flex");
	// Clear the members list
	document.getElementById("members").innerHTML = "";
	// Clear the inputs
	document.getElementById("groupNameInput").value = "";
	document.getElementById("memberInput").value = "";
	// Hide the error
	hideAddMemberError();
}

export default Modal;
export { showModal, hideModal };
