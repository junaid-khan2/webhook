import ChatSidebar from '@/Components/Chat/ChatSidebar';
import ChatUserInfoHeader from '@/Components/Chat/ChatUserinfoHeader';
import ChatMessages from '@/Components/Chat/ChatMessages';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';
import ChatInput from '@/Components/Chat/ChatInput';

export default function Chat(props) {
  console.log(props);
  return (
    <AuthenticatedLayout
      user={props.auth.user}
    >

      <div className="">
        <div className="messanger h-screen overflow-hidden  pt-3">
          <div className="flex">
            <div className="basis-2/6 border-r border-slate-100 pb-2 bg-white">
              <ChatSidebar recentMessages={props.recentMessages} />
            </div>
            <div className="basis-4/6">
              {
                props.receiver?.id ?
                  <>
                    <ChatUserInfoHeader receiver={props.receiver}/>

                    <div className="messenger mt-4">
                      <div className="px-4">
                        <ChatMessages messages={props.messages} auth_id={props.auth.user.id}/>
                      </div>
                      <ChatInput receiver={props.receiver}/>
                    </div>
                  </>
                  :
                  <div className="flex justify-center items-center bg-slate-100 h-screen">
                    <p className="font-bold text-3xl text-gray-500">please Select user to start Chating .....</p>
                  </div>
              }



            </div>
          </div>
        </div>
      </div>


    </AuthenticatedLayout>
  );
}

