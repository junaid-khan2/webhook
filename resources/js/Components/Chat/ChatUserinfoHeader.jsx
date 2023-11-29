export default function ChatUserInfoHeader({ receiver }) {
  return (
    <div className="user-info-header bg-white px-5 py-3">
      <div className="flex justify-between">
        <div className="flex items-center">
          {
            receiver?.avatar !== undefined ?
              <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" width="50" alt="" />
              :
              <i className="fa fa-user-circle text-gray-300 text-5xl"></i>
          }
          <h3 className="pl-4 text-sm text-gray-400">{receiver?.name}</h3>
        </div>

        <div className="">
          <i className="fa fa-message text-violet-300"></i>
          <i className="fa fa-video ml-3 text-gray-200"></i>
          <i className="fa fa-phone ml-3 text-gray-200"></i>
          <i></i>
          <i></i>
        </div>
      </div>
    </div>
  );
}