import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import SendButton from "./sendButton";
import UsMessage from "./usMessage";
import TheirMessage from "./theirMessage";

function Chat() {
  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState({
    username: "",
    message: "",
    isFromMe: true,
  });

  useEffect(() => {
    const username = prompt("Please enter your username");
    setMessage({ ...message, username: username });
  }, []);

  console.log(message);
  const [username, setUsername] = useState("");

  const [users, setUsers] = useState([]);

  const sendMessage = () => {
    if (message) {
      if (!message.message == "") {
        const newMessages = [...messages, message];
        setMessages(newMessages);
        setMessage({ username: "", message: "", isFromMe: true });
      }
    }
  };

  let chats = {
    "users":
    [
      {
        "id": 1,
        "username": "jessica"
      },
      {
        "id": 2,
        "username": "james"
      }
    ]
  }

  return (
    <div className="flex h-screen bg-gray-800">

    <Sidebar users={chats.users} />
      <div className="flex h-screen w-5/6 flex-col overflow-y-auto bg-gray-800">
        <div className="flex h-full flex-col justify-between p-4 md:w-1/2 md:self-center">
          <div
            className="mb-3 flex h-full flex-col justify-end space-y-2 overflow-y-clip"
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
              message.isFromMe ? (
                <UsMessage message={message} />
                // <usMessage message={message} />
              ) : (
                <TheirMessage message={message} />
                // <theirMessage message={message} />
              )
              
            )}
          </div>

          <div className="w-full self-end border-t p-4">
            <form className="flex w-full" onSubmit={
              (e) => {
                e.preventDefault();
                sendMessage();
              }
            }>
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
                <SendButton />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
