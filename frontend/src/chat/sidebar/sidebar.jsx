import GroupPreview from "./groupPreview";

function Sidebar(props){
    return  (
        <div className="w-1/6 bg-gray-900 p-4">
        
        <ul className="text-white">
            {
                props.groups.map((group) => (
                    <GroupPreview group={group} key={group.id} />
                ))
            }
        </ul>
      </div>
    )
}

export default Sidebar;