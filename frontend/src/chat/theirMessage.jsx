import React from 'react';


function TheirMessage(props) {
    return (
        <div className="flex-start">
        <span className="max-w-fit text-white">
          {props.message.username}
        </span>
        <div className="ml-5 w-fit max-w-fit rounded-lg bg-gray-600 px-2 text-white">
          <p>{props.message.message}</p>
        </div>
      </div>
    );
}

export default TheirMessage;