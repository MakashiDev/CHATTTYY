function Sidebar(props){
    return  (
        <div className="w-1/6 bg-gray-900 p-4">
        
        <ul className="text-white">
            {
                props.users.map((user) => (
                    <li key={user.id} className="mb-2">
                        {user.username}
                    </li>
                ))
            }
        </ul>
      </div>
    )
}

export default Sidebar;