import { Fragment } from "react";

export default function ChatMessages({ messages, auth_id }) {

    const isRecevedMessage = (message) => {

        return message.receiver_id == auth_id;

    }
    return (
        <>
            {
                (messages || []).map((message, index) => (
                    <Fragment key={index}>
                        <div className={`${isRecevedMessage(message) ? 'recived-chat' : 'send-chat'} flex ${isRecevedMessage(message) ? 'justify-start' : 'justify-end'}`}>
                            <div className={`mb-2 max-w-[80%] rounded ${isRecevedMessage(message) ? 'bg-violet-400' : 'bg-violet-200'} px-5 py-2 text-sm ${isRecevedMessage(message) ? 'text-white' : 'text-slate-500'}`}>
                                <p>{message?.message}</p>
                            </div>
                        </div>
                    </Fragment>
                ))
            }

        </>
    );
}