function Modal() {
	return (
		<div
			id="groupCreateModal"
			className=" absolute h-screen w-screen items-center justify-center bg-black bg-opacity-50"
		>
			<div className="h-1/2 w-1/2 rounded-lg bg-gray-800">
				<div className="flex justify-between p-4">
					<h1 className="font-bold text-white">Create Group</h1>
					<button className="text-red-500" onClick={hideModal}>
						x
					</button>
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
