import { Dropdown } from "flowbite-react";
import { useState } from "react";
import ArrowDown from "./downArrow";
import FriendsMenu from "../friendsMenu";
import { showFriendsMenu, hideFriendsMenu } from "../friendsMenu";

function DropDown(props) {
	return (
		<div className="absolute right-0 top-0">
			<Dropdown
				className="w-fit border-none px-2 text-lg font-semibold text-white outline-none"
				label=""
				dismissOnClick={false}
				renderTrigger={() => (
					<div className="h-12 w-12 cursor-pointer rounded-full bg-blue-500">
						<ArrowDown className="h-12 w-12" />
					</div>
				)}
			>
				<Dropdown.Item
					onClick={() => {
						console.log("clicked");
						showFriendsMenu();
					}}
				>
					Friends
				</Dropdown.Item>
				<Dropdown.Item>Settings</Dropdown.Item>
			</Dropdown>
		</div>
	);
}

export default DropDown;
