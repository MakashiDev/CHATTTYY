import { useState } from "react";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({
    username: "",
    message: "",
  });

  const [username, setUsername] = useState("");

  const [users, setUsers] = useState([]);

  const sendMessage = () => {
    if (message) {
      if (!message.message == "") {
        const newMessages = [...messages, message];
        setMessages(newMessages);
        setMessage({ username: "", message: "" });
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-800">
      <div className="w-1/6 bg-gray-900 p-4">
        <h2 className="mb-4 text-2xl font-bold text-white">Users</h2>
        <ul className="text-white">
          <li>Some Guy</li>
          <li>Some Girl</li>
        </ul>
      </div>

      <div className="flex h-screen w-5/6 flex-col overflow-y-auto bg-gray-800">
        <div className="flex h-full flex-col justify-between p-4 md:w-1/2 md:self-center">
          <div
            className="mb-3 flex h-full flex-col justify-end space-y-2"
            id="messages"
          >
            <div className="self-end">
              <div className="ml-5 w-fit max-w-fit rounded-lg bg-blue-500 px-5 text-white">
                <p>hey bbay</p>
              </div>
            </div>

            <div className="flex-start">
              <span className="max-w-fit text-white">jessica</span>
              <div className="ml-5 w-fit max-w-fit rounded-lg bg-gray-600 px-5 text-white">
                <p>hello</p>
              </div>
            </div>

            {messages.map((message) =>
              message.username === username ? (
                <div className="self-end">
                  <div className="ml-5 w-fit max-w-fit rounded-lg bg-blue-500 px-5 text-white">
                    <p>{message.message}</p>
                  </div>
                </div>
              ) : (
                <div className="flex-start">
                  <span className="max-w-fit text-white">
                    {message.username}
                  </span>
                  <div className="ml-5 w-fit max-w-fit rounded-lg bg-gray-600 px-5 text-white">
                    <p>{message.message}</p>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="w-full self-end border-t p-4">
            <div className="flex w-full">
              <input
                id="message"
                type="text"
                placeholder="Type your message..."
                className="focus:shadow-outline w-full flex-1 rounded-full bg-gray-200 p-2 outline-none"
                value={message.message}
                onChange={(e) =>
                  setMessage({ ...message, message: e.target.value })
                }
                onSubmit={sendMessage}
              />
              <button
                id="sendMessage"
                className="ml-2 flex h-10
                w-10 items-center justify-center rounded-full bg-blue-500 text-white"
                onClick={sendMessage}
              >
                <svg
                  className="h-6 w-6 -rotate-90 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M0 0l20 10L0 20V0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
