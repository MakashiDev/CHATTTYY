function FriendsMenu (props) {

    return (
        <div className="flex justify-center items-center h-screen w-screen absolute">
            <div className="w-2/4 h-2/5 bg-gray-900 text-white px-2 text-red-500">
            <button
            onClick={
                () => {
                    props.setShowFriendsMenu(!props.showFriendsMenu);
                }
            }
            >X</button>
            <div className="px-1 text-white">Friends</div>
            <div className="px-1 py-4 text-white cursor-pointer">Add Friends</div>
            </div>
        </div>
        
    )
    

}



export default FriendsMenu;