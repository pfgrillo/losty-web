import { useEffect, useState } from "react";
import SectionMain from "../common/components/Section/SectionMain";
import { useAppDispatch } from "../hooks/storeHook";
import { fetchUser } from "../features/user/services/user.service";
import { selectUser } from "../store/features/userSlice";
import { useSelector } from "react-redux";
import { ReportedItem, ReportType } from "../models/ReportedItem";
import { deleteReportedItem } from "../features/explore/services/report.service";
import Button from "../common/components/Button";
import Modal from "../common/components/Modal";
import { selectReportState } from "../store/features/reportSlice";
import CardBoxUser from "../features/user/components/User";
import CardBox from "../common/components/Cards";
import ItemCard from "../features/explore/components/ItemCard";
import { useNavigate } from "react-router-dom";
import { IoMailUnreadOutline } from "react-icons/io5";

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const reportState = useSelector(selectReportState);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const openModal = (id: string) => {
    setShowModal((prev) => !prev);
    setSelectedItem(id);
  };

  const deleteItem = (id: string): void => {
    dispatch(deleteReportedItem(id));

    if (!reportState.loading) {
      setShowModal((prev) => !prev);
      dispatch(fetchUser());
    }
  };

  const handleClick = (chat: string, item: ReportedItem) => {
    navigate(`/chat/${chat}`, { state: { item } });
  };

  const ProfileItemCard = ({
    items,
    reportType,
  }: {
    items: ReportedItem[];
    reportType: ReportType;
  }) => {
    return (
      <div className="flex flex-1 flex-col text-black p-2">
        <div className="text-2xl font-[600] mb-5">
          {reportType === ReportType.FOUND ? "Found Items" : "Lost Items"}
        </div>
        <div className="flex">
          {items.map((item, index) => (
            <CardBox
              className="mx-2 max-w-[250px]"
              key={index}
              footer={
                <div className="flex flex-row justify-around">
                  {user.chats.length > 0 &&
                    user.chats.map(
                      (chat, index) =>
                        chat.chatRoom.includes(item._id!) && (
                          <div
                            className="flex justify-around cursor-pointer"
                            onClick={() => {
                              handleClick(chat.chatRoom, item);
                            }}
                          >
                            <div className="flex items-center m-3 p-1 bg-main rounded-md">
                              <Button
                                small
                                icon={IoMailUnreadOutline}
                                color="main"
                              />
                              <div
                                key={index}
                                className="text-sm text-white mx-1"
                              >
                                New messages!
                              </div>
                            </div>
                          </div>
                        )
                    )}
                  <Button
                    className="flex-1 p-1 m-3 justify-end"
                    small
                    label="Delete"
                    color="transparent"
                    onClick={() => openModal(item._id!)}
                  ></Button>
                </div>
              }
            >
              <ItemCard marker={item}></ItemCard>
            </CardBox>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <SectionMain>
        <CardBoxUser className="mb-6" />
        <div className="text-black text-2xl font-[600] mb-5">My Items</div>
        {user.items.length > 0 ? (
          <div className="flex flex-col justify-between px-2">
            {user.items.filter((item) => item.reportType === ReportType.FOUND)
              .length > 0 && (
              <ProfileItemCard
                items={user.items.filter(
                  (item) => item.reportType === ReportType.FOUND
                )}
                reportType={ReportType.FOUND}
              />
            )}
            {user.items.filter((item) => item.reportType === ReportType.LOST)
              .length > 0 && (
              <ProfileItemCard
                items={user.items.filter(
                  (item) => item.reportType === ReportType.LOST
                )}
                reportType={ReportType.LOST}
              />
            )}
          </div>
        ) : (
          <div className="text-slate-500 text-l mb-5">
            You don't have any reported items
          </div>
        )}
      </SectionMain>
      <Modal onRequestClose={() => {}} showModal={showModal}>
        <CardBox title="Are you sure you want to delete this item?">
          <div className="m-5 text-black">
            Are you sure you want to delete this item?
          </div>
          <div className="flex flex-row justify-around m-3">
            <Button
              className="p-2"
              label="Delete"
              color="main"
              onClick={() => deleteItem(selectedItem!)}
            />
            <Button
              className="p-2"
              label="Cancel"
              color="transparent"
              onClick={() => setShowModal((prev) => !prev)}
            />
          </div>
        </CardBox>
      </Modal>
    </>
  );
};

export default ProfilePage;
