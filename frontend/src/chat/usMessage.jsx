import React from 'react'

function UsMessage(props) {
  return (

            <div className="self-end">
              <div className="ml-5 w-fit max-w-fit rounded-lg bg-blue-500 px-5 text-white">
                <p>{props.message.message}</p>
              </div>
            </div>
  )
}

export default UsMessage
