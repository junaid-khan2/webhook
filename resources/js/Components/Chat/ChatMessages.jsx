import { Fragment, useEffect, useState } from "react";
import axios from "axios"; // Make sure to install axios: npm install axios

export default function ChatMessages({ receiverId, auth_id }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/chat/${auth_id}/${receiverId}`);
        // console.log(response);
        setMessages(response.data); // Assuming the response contains an array of messages
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [auth_id, receiverId]);

  const isReceivedMessage = (message) => {
    return message.receiver_id === auth_id;
  };

  return (
    <>
      {messages.map((message, index) => (
        <Fragment key={index}>
          <div
            className={`${
              isReceivedMessage(message) ? "received-chat" : "send-chat"
            } flex ${isReceivedMessage(message) ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`mb-2 max-w-[80%] rounded ${
                isReceivedMessage(message) ? "bg-violet-400" : "bg-violet-200"
              } px-5 py-2 text-sm ${
                isReceivedMessage(message) ? "text-white" : "text-slate-500"
              }`}
            >
              <p>{message?.message}</p>
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
}
