function Modal() {
	return (
		<div
			id="groupCreateModal"
			className=" absolute h-screen w-screen items-center justify-center bg-black bg-opacity-50"
		>
			<div className="h-1/4 w-1/4d rounded-lg bg-gray-800">
				<div className="flex justify-between p-4 h-1/6">
					<h1 className="font-bold text-white">Create Group</h1>
					<button className="text-red-500" onClick={hideModal}>
					<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
					</button>
				</div>

				<div className="flex flex-col p-4 justify-between h-5/6 w-full ">
					<label className="text-white">Group Name</label>
					<input
						type="text"
						className="rounded-lg bg-gray-700 p-2 outline-none"
					/>

					<div>
						<label className="text-white">Add Members</label>
						<input
							type="text"
							className="rounded-lg bg-gray-700 p-2 outline-none"
						/>
						<div>
							<button className="bg-blue-500 text-white rounded-lg p-2">
								Add
							</button>
						</div>
					</div>
			</div>

		</div>
		</div>
	);
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
}

export default Modal;
export { showModal, hideModal };
