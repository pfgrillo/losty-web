import SectionMain from "../common/components/Section/SectionMain";
import { useSelector } from "react-redux";
import { selectUserChats } from "../store/features/userSlice";
import CardBox from "../common/components/Cards";
import { useNavigate } from "react-router-dom";
import { selectMarkers } from "../store/features/reportSlice";
import { Marker, ReportType } from "../models/Marker";
import { colorsBgLight } from "../colors";

const MessagesPage = () => {
  const userChats = useSelector(selectUserChats);
  const navigate = useNavigate();
  const markers: Marker[] = useSelector(selectMarkers);

  const handleClick = (chat: any) => {
    const item = markers.find((marker) => marker._id === chat.item);
    navigate(`/chat/${chat.chatRoom}`, { state: { item } });
  };

  return (
    <SectionMain>
      <div>
        <div className="text-2xl font-semibold text-black mb-4">Messages</div>
        {userChats.length > 0 ? (
          userChats.map((chat, index) => (
            <CardBox
              key={index}
              className="mb-3 cursor-pointer"
              onClick={() => handleClick(chat)}
            >
              <div className=" flex flex-row">
                <div className="w-full flex-1">
                  New conversation with {chat.users[0]}
                </div>
                <div className="flex flex-col items-end">
                  <div
                    className={`text-sm w-fit self-end px-1 border rounded-md 
                        ${
                          markers.find((marker) => marker._id === chat.item)
                            ?.reportType === ReportType.FOUND
                            ? colorsBgLight.success
                            : colorsBgLight.danger
                        }`}
                  >
                    {
                      markers.find((marker) => marker._id === chat.item)
                        ?.itemType
                    }
                  </div>
                  <div>
                    {markers.find((marker) => marker._id === chat.item)?.title}
                  </div>
                </div>
              </div>
            </CardBox>
          ))
        ) : (
          <div>No chats</div>
        )}
      </div>
    </SectionMain>
  );
};

export default MessagesPage;
