import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { getMessages, saveMessage } from "../messages.service";
import { useAppDispatch } from "../../../hooks/storeHook";
import FormField from "../../../common/components/Form/FormField";
import InputField from "../../../common/components/Form/InputField";
import UserAvatar from "../../user/components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { selectUser } from "../../../store/features/userSlice";
import { VscSend } from "react-icons/vsc";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { selectReportedItems } from "../../../store/features/reportSlice";
import { RootState } from "../../../store";

interface Message {
  from: string;
  text: string;
}

interface Props {
  guestId: string;
  chatRoom: string;
}

const socket: Socket = io({
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const ChatContainer = ({ guestId, chatRoom }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [arrivalMessage, setArrivalMessage] = useState<Message | null>(null);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<FieldValues>();
  const userStore = useSelector(selectUser);
  const messagesStore = useSelector(
    (state: RootState) => state.messages.chatRooms[chatRoom]
  );
  const markers = useSelector(selectReportedItems);

  useEffect(() => {
    dispatch(getMessages({ chatRoom }));
  }, [dispatch, chatRoom]);

  useEffect(() => {
    if (messagesStore) {
      setMessages(messagesStore.messages);
    }
  }, [messagesStore]);

  useEffect(() => {
    socket.emit("add_user", userStore.username!);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [userStore.username]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [arrivalMessage, messages]);

  useEffect(() => {
    if (socket) {
      socket.on(
        "msg_recieve",
        (data: { message: string; from: string; chatRoom: string }) => {
          if (data.chatRoom === chatRoom) {
            setArrivalMessage({ text: data.message, from: data.from });
          }
        }
      );

      return () => {
        socket.off("msg_recieve");
        if (socket) {
          socket.disconnect();
        }
      };
    }
  }, [chatRoom]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const guestUsername = markers.find(
      (marker) => marker._id === chatRoom.substring(0, 24)
    )?.user;
    socket.emit("send-msg", {
      to:
        userStore.username === guestUsername
          ? messagesStore.host!
          : messagesStore.guest!,
      from: userStore.username!,
      message: data.chatMessage,
      chatRoom: chatRoom,
    });
    dispatch(
      saveMessage({
        from: userStore.username!,
        to: guestId,
        message: data.chatMessage,
        chatRoom,
      })
    );

    const msgs = [...messages];
    msgs.push({ text: data.chatMessage, from: userStore.username! });

    if (messagesStore.messages.find((msg) => msg.text === data.chatMessage)) {
      setMessages((prev) => msgs);
    }
    reset();
  };

  return (
    <div className="flex flex-col flex-1 rounded-md w-full">
      {messages ? (
        <div className="flex flex-col justify-between h-[600px] bg-white rounded-md shadow-xl p-4 overflow-y-auto">
          <ul className="flex flex-col">
            {messages.map((msg, index) => (
              <div
                key={uuidv4()}
                ref={scrollRef}
                className={`flex items-center gap-3 px-2 py-2 ${
                  msg.from === localStorage.getItem("user")
                    ? "self-end"
                    : "self-start"
                }`}
              >
                {msg.from !== localStorage.getItem("user") && (
                  <UserAvatar
                    username={msg.from!}
                    className="h-6 w-6"
                  ></UserAvatar>
                )}
                <div
                  className={`bg-indigo-100 rounded-md py-1 px-5 ${
                    msg.from !== localStorage.getItem("user")
                      ? "rounded-tl-none shadow-chat-received"
                      : "rounded-br-none shadow-chat-sent"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.from === localStorage.getItem("user") && (
                  <UserAvatar
                    username={msg.from}
                    className="h-6 w-6"
                  ></UserAvatar>
                )}
              </div>
            ))}
            <div ref={scrollRef}></div>
          </ul>
        </div>
      ) : null}
      <div className="py-3 w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 w-full">
          <FormField id="chatMessage" fullSize>
            <InputField
              type="text"
              id="chatMessage"
              register={register}
              icon={VscSend}
            />
          </FormField>
        </form>
      </div>
      <div className="py-2 flex justify-center text-sm text-main italic font-medium">
        If the item is returned please click on 'Return item' button
      </div>
    </div>
  );
};

export default ChatContainer;
