import { hideModal, showModal } from "../groupCreate/modal";

function GroupAdd() {
	return (
		<div className=" absolute bottom-0 self-end py-5">
			<button
				className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 font-bold text-white duration-150 hover:bg-blue-600"
				onClick={showModal}
			>
				<svg
					stroke="currentColor"
					fill="currentColor"
					className="text-white"
					stroke-width="0"
					t="1551322312294"
					viewBox="0 0 1024 1024"
					version="1.1"
					pId="10297"
					height="1em"
					width="1em"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs></defs>
					<path
						d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"
						pId="10298"
					></path>
					<path
						d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"
						pId="10299"
					></path>
				</svg>
			</button>
		</div>
	);
}

export default GroupAdd;
