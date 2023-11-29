import { Link } from "@inertiajs/react";

export default function ChatSidebar({ recentMessages }) {
    return (
        <>
            <div className="searchbox h-10 text-slate-300">
                <div className="flex justify-between border-b border-r-slate-100 px-5 py-2">
                    <form className="flex justify-center item-center">
                        <i className="fa fa-search"></i>
                        <input type="text" name="" className="font-light border-none focus:outline-none" placeholder="Search" id="" />
                    </form>
                    <div className="">
                        <button className="relative">
                            <i className="fa fa-message"></i>
                            <i className="fa fa-plus absolute -top-2 text-sm"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="userlist h-screen overflow-y-auto pt-4">
                {recentMessages.map((user, index) => (
                    <Link
                    href={`/chat/${user.user_id}`}
                     key={index} className="flex px-5 py-3 transition hover:cursor-pointer hover:bg-slate-100">
                        <div className="pr-4">
                            {
                                user.avatar !== undefined ?
                                    <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" width="50" alt="" />
                                    :
                                    <i className="fa fa-user-circle text-gray-300 text-5xl"></i>
                            }

                        </div>
                        <div className="">
                            <h3 className="text-md text-violet-500">{user.name}</h3>
                            <p className="h-5 overflow-hidden text-sm font-light text-gray-400">{user.message}</p>
                        </div>
                    </Link>
                ))}

            </div>
        </>
    );
}
