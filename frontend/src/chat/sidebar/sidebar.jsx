import GroupPreview from "./groupPreview";
import GroupAdd from "./groupAdd";

function Sidebar(props){
    return  (
        <div className="w-1/6 bg-gray-900 p-4 h-screen flex flex-col">
        
        <ul className="text-white">
            {
                props.groups.map((group) => (
                    <GroupPreview group={group} key={group.id} />
                ))
            }
        </ul>
        <GroupAdd />
      </div>
    )
}

export default Sidebar;