import { Dropdown } from 'flowbite-react';

function DropDown() {
  return (
    <div className='absolute top-0 right-0'>
    <Dropdown className='w-fit px-2 outline-none border-none text-white text-lg font-semibold' label="" dismissOnClick={false} renderTrigger={() => 
    
    <div className='h-12 w-12 bg-red-700 rounded-full'>

    </div>
    }>
      <Dropdown.Item>Friends</Dropdown.Item>
    <Dropdown.Item>Settings</Dropdown.Item>
    </Dropdown>
    </div>
  );
}

export default DropDown;