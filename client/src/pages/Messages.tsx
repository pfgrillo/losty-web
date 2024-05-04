import SectionMain from "../common/components/Section/SectionMain";
import { useSelector } from "react-redux";
import { selectUserChats } from "../store/features/userSlice";
import CardBox from "../common/components/Cards";
import { selectMarkers } from "../store/features/reportSlice";
import { Marker, ReportType } from "../models/Marker";
import { colorsBgLight } from "../colors";
import { useEffect, useState } from "react";
import { getMessages } from "../features/messages/messages.service";
import { selectChatRooms } from "../store/features/messageSlice";
import { useAppDispatch } from "../hooks/storeHook";
import ChatContainer from "../features/messages/components/ChatContainer";
import ItemCard from "../common/components/ItemCard";
import Button from "../common/components/Button";

const MessagesPage = () => {
  const dispatch = useAppDispatch();
  const userChats = useSelector(selectUserChats);
  const markers: Marker[] = useSelector(selectMarkers);
  const messagesStore = useSelector(selectChatRooms);
  const [chatRoom, setChatRoom] = useState<string>("");
  const [marker, setMarker] = useState<Marker | undefined>();

  // Get all messages for each chat room
  useEffect(() => {
    userChats.forEach((chat) => {
      dispatch(getMessages({ chatRoom: chat.chatRoom }));
    });
  }, [userChats, dispatch]);

  // Log messages for each chat room
  useEffect(() => {
    if (messagesStore) {
      console.log(messagesStore);
      userChats.forEach((chat) => {
        console.log(messagesStore[chat.chatRoom]);
      });
    }
  });

  const handleClick = (chat: any) => {
    setChatRoom(chat.chatRoom);

    setMarker(markers.find((marker) => marker._id === chat.item));
    //navigate(`/chat/${chat.chatRoom}`, { state: { item } });
  };

  return (
    <SectionMain>
      <div className="text-2xl font-semibold text-black mb-4">Messages</div>
      <div className="flex gap-4 w-full">
        <div>
          {userChats.length > 0 ? (
            userChats.map((chat, index) => (
              <CardBox
                key={index}
                className="mb-3 cursor-pointer"
                onClick={() => handleClick(chat)}
              >
                <div className="flex flex-row">
                    <div className="flex flex-col items-end rounded shadow-m pr-8">
                      <div>
                        {
                          markers.find((marker) => marker._id === chat.item)
                            ?.title
                        }
                      </div>
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
                    </div>

                  <div className="">New conversation with {chat.users[0]}</div>
                </div>
              </CardBox>
            ))
          ) : (
            <div>No chats</div>
          )}
        </div>
        <div className="w-full">
          {marker ? (
            <div className="flex flex-col flex-1 gap-x-4 w-full ">
              <ChatContainer guestId={marker!.user} chatRoom={chatRoom} />
              <div className="flex flex-col">
                <div>
                  <CardBox>
                    <ItemCard marker={marker!} />
                  </CardBox>
                </div>
                {localStorage.getItem("user") === marker!.user &&
                  marker!.reportType === ReportType.FOUND && (
                    <div className="bg-yellow-100 rounded-md my-5 p-3">
                      Warning:
                    </div>
                  )}
                <div className="my-5">
                  <Button
                    label="Return item"
                    color="main"
                    onClick={() => window.history.back()}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </SectionMain>
  );
};

export default MessagesPage;
