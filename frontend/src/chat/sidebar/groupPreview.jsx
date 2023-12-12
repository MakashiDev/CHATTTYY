import React from 'react';

const GroupPreview = (props) => {

    if (props.group.lastMessage.message.length > 50) {
        props.group.lastMessage.message = props.group.lastMessage.message.substring(0, 50) + '...';
    }


    if (props.group.lastMessage === undefined) {
        return (
            <div className='w-full flex-col flex pb-5 gap-2'>
                <div className='w-full flex justify-between'>
                    <div className='text-white text-3xl'>{props.group.name}</div>
                    <div className='text-slate-400 text-lg'>No messages</div>
                </div>
                <div className='w-5/6 text-slate-500 text-xl'>No messages</div>
                <hr class="w-5/6 h-1 border-0 rounded  dark:bg-gray-700"/>
        
                </div>
        );
    }


    return (
        <div className='w-full flex-col flex pb-5 gap-2'>
            <div className='w-full flex justify-between'>
                <div className='text-white text-3xl'>{props.group.name}</div>
                <div className='text-slate-400 text-lg'>{props.group.lastMessage.time}</div>
            </div>
            <div className='w-5/6 text-slate-500 text-xl'>{props.group.lastMessage.message}</div>
            <hr class="w-5/6 h-1 border-0 rounded  dark:bg-gray-700"/>
    
            </div>

    );
};


export default GroupPreview;
