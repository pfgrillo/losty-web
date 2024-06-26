import { ReactElement, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { motion } from "framer-motion";
import { ReportedItem } from "../../../models/ReportedItem";
import CardBox from "../../../common/components/Cards";
import Buttons from "../../../common/components/Buttons";
import Button from "../../../common/components/Button";
import ItemCard from "./ItemCard";
import { MdMyLocation } from "react-icons/md";
import { openRoom } from "../../messages/messages.service";
import { useNavigate } from "react-router-dom";
import { UserState } from "../../../store/features/userSlice";
import useCloseMarkers from "../../../hooks/closeMarkersHook";
import { useAppSelector } from "../../../hooks/storeHook";
import {
  selectCloseItems,
  selectReportedItems,
} from "../../../store/features/reportSlice";

interface Props {
  user: UserState;
  cardsPerPage?: number;
}

const CloseItems = ({ user, cardsPerPage = 4 }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const reportedItems = useAppSelector(selectReportedItems);
  const closeMarkers = useCloseMarkers(reportedItems, 3);
  const closerMarkers = useAppSelector(selectCloseItems);

  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [paginatedCloseMarkers, setPaginatedCloseMarkers] = useState<
    ReportedItem[]
  >([]);

  useEffect(() => {
    setMaxPage(
      Math.ceil(
        closerMarkers.length === 0
          ? closeMarkers.length / cardsPerPage
          : closerMarkers.length / cardsPerPage
      )
    );
    setPaginatedCloseMarkers(
      closerMarkers.length === 0
        ? closeMarkers.slice(page * cardsPerPage, (page + 1) * cardsPerPage)
        : closerMarkers.slice(page * cardsPerPage, (page + 1) * cardsPerPage)
    );
  }, [closeMarkers, page, cardsPerPage, closerMarkers]);

  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  /* const [infoWindowPosition, setInfoWindowPosition] = useState<ReportedItem | null>(
    null
  ); */

  useEffect(() => {
    console.log("closerMarkers", closerMarkers);
  }, [closerMarkers]);

  const IconComponent = ({
    icon,
    color = "#6366F1",
  }: {
    icon: IconType;
    color?: string;
  }): ReactElement => {
    return icon({ size: 24, className: "", color });
  };

  /*  useEffect(() => {
    onCloseMarkersChange(closeMarkers);
  }, [closeMarkers, onCloseMarkersChange]);
 */
  const handleMouseEnter = (marker: ReportedItem) => {
    // setInfoWindowPosition(marker);
    setIsInfoWindowOpen(!isInfoWindowOpen);
  };

  const handleNextPage = () => {
    setPage((prevPage) => (prevPage + 1) % maxPage);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => (prevPage - 1 + maxPage) % maxPage);
  };

  const handleCardButtonClick = (item: ReportedItem) => {
    dispatch(
      openRoom({
        host: user.username!,
        guest: item.user,
        chatRoom: `${item._id}${user.id}`,
      })
    );
    navigate(`/chat/${item._id}${user.id}`, { state: { item } });
  };

  return (
    <div className="flex flex-col justify-center items-center lg:justify-start lg:items-center pr-2 mb-2">
      {/*       <div className="lg:overflow-y-auto lg:h-[650px] pr-2">*/}
      <div className="lg:overflow-y-auto pr-2">
        <motion.div
          className="flex overflow-visible overflow-x-auto sm:flex-wrap lg:flex-wrap justify-start items-start rounded-md w-[500px] pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {paginatedCloseMarkers.map((marker: ReportedItem) => {
            return (
              <motion.div
                className="flex w-[250px] h-[320px] px-2 pb-4"
                key={marker._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CardBox
                  key={marker._id}
                  minWidth="250px"
                  footer={
                    <Buttons className="p-3">
                      {marker.user !== user.username ? (
                        // eslint-disable-next-line react/jsx-no-undef
                        <Button
                          className="flex-1"
                          small
                          label="Claim"
                          color="main"
                          onClick={() => handleCardButtonClick!(marker)}
                        />
                      ) : (
                        <div></div>
                      )}
                      <Button
                        small
                        icon={MdMyLocation}
                        iconColor="white"
                        color="main"
                        onClick={() => handleMouseEnter(marker)}
                      />
                    </Buttons>
                  }
                >
                  <ItemCard
                    marker={marker}
                    onCardClick={(marker) => handleMouseEnter(marker)}
                  />
                </CardBox>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <div className="flex gap-x-6 justify-center">
        <div
          className="flex flex-1 justify-end items-center mt-2"
          onClick={
            page === 0 || page > maxPage - 1 ? undefined : handlePrevPage
          }
        >
          <div
            className={`${
              page === 0 || page > maxPage - 1
                ? "text-indigo-200"
                : "text-indigo-500 cursor-pointer"
            } border border-indigo-100 rounded-full bg-indigo-100 p-1`}
          >
            <IconComponent
              icon={IoIosArrowBack}
              color={
                page === 0 || page > maxPage - 1
                  ? "text-indigo-100"
                  : "text-indigo-500"
              }
            />
          </div>
        </div>
        <div
          className="flex flex-1 justify-between items-center mt-2"
          onClick={page < maxPage - 1 ? handleNextPage : undefined}
        >
          <div
            className={`${
              page < maxPage - 1
                ? "text-indigo-500 cursor-pointer"
                : "text-indigo-200"
            } border border-indigo-100 rounded-full bg-indigo-100 p-1`}
          >
            <IconComponent
              icon={IoIosArrowForward}
              color={page < maxPage - 1 ? "text-indigo-500" : "text-indigo-100"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloseItems;
