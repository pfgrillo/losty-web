import { useEffect } from "react";
import SectionMain from "../common/components/Section/SectionMain"
import { useLocation, useParams } from "react-router-dom";
import ItemCard from "../features/explore/components/ItemCard";
import { useSelector } from "react-redux";
import CardBox from "../common/components/Cards";
import { selectUser } from "../store/features/userSlice";
import ChatContainer from "../features/messages/components/ChatContainer";
import { Marker, ReportType } from "../models/Marker";
import Button from "../common/components/Button";
import Buttons from "../common/components/Buttons";



const ChatPage = () => {
    const location = useLocation();
    const roomId = useParams();
    const userStore = useSelector(selectUser);
    const item: Marker = location.state?.item;

    useEffect(() => {
        if (!userStore) {
            return;
        }
    }, [userStore]);

    return (
        <SectionMain>
            {item ? (
                <div className="flex flex-col flex-1 gap-x-4 w-full sm:flex-row lg:flex-row">
                    <ChatContainer guestId={item!.user} chatRoom={roomId.item!} />
                    <div className="flex flex-col">
                        <div>
                            <CardBox>
                                <ItemCard marker={item} />
                            </CardBox>
                        </div>
                        {localStorage.getItem('user') === item.user && item.reportType === ReportType.FOUND &&
                            <div className="bg-yellow-100 rounded-md my-5 p-3">
                                Warning:
                            </div>}
                        <div className="my-5">
                            <Button
                                label="Return item"
                                color="main"
                                onClick={() => window.history.back()}
                            />
                        </div>
                    </div>
                </div>) : null}
        </SectionMain>
    );
}

export default ChatPage;