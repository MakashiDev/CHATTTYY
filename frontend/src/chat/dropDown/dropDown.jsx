import { Dropdown } from 'flowbite-react';
import { useState } from 'react';
import ArrowDown from './downArrow';
import FriendsMenu from '../friendsMenu';

function DropDown(props) {

  return (
    <div className='absolute top-0 right-0'>

    <Dropdown className='w-fit px-2 outline-none border-none text-white text-lg font-semibold' label="" dismissOnClick={false} renderTrigger={() => 
    
    <div className='h-12 w-12 cursor-pointer bg-blue-500 rounded-full'>
      <ArrowDown className='h-12 w-12' />
    </div>
    }>
      <Dropdown.Item
      onClick={
        () => {
          console.log('clicked');
          props.setShowFriendsMenu(!props.showFriendsMenu);

        }
      }
      >Friends</Dropdown.Item>
    <Dropdown.Item>Settings</Dropdown.Item>
    </Dropdown>
    </div>
  );
}

export default DropDown;