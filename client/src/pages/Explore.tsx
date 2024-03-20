import { Wrapper } from "@googlemaps/react-wrapper";
import GoogleMap from "../features/explore/components/Map";
import { useDispatch, useSelector } from "react-redux";
import { ReactElement, useEffect, useState } from "react";
import { fetchMarkers } from "../features/explore/services/report.service";
import { AppDispatch } from "../store";
import { useAppSelector } from "../hooks/storeHook";
import { selectMarkers } from "../store/features/reportSlice";
import MapFilters, {
  FilterOptions,
} from "../features/explore/components/MapFilters";
import { Marker, ReportType } from "../models/Marker";
import CardBox from "../common/components/Cards";
import ItemCard from "../features/explore/components/ItemCard";
import { IconType } from "react-icons";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../store/features/userSlice";
import { openRoom } from "../features/messages/messages.service";
import Buttons from "../common/components/Buttons";
import Button from "../common/components/Button";
import { MdMyLocation } from "react-icons/md";

const Explore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const markers = useAppSelector(selectMarkers);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filteredMarkers, setFilteredMarkers] = useState<Marker[] | null>(null);

  const [closeMarkers, setCloseMarkers] = useState<Marker[]>([]);
  const [page, setPage] = useState(0);
  const cardsPerPage = 4;
  const maxPage = Math.ceil(closeMarkers.length / cardsPerPage);
  const paginatedCloseMarkers = closeMarkers.slice(
    page * cardsPerPage,
    (page + 1) * cardsPerPage
  );

  const [itemCoordinates, setItemCoordinates] = useState<Marker | null>(null);

  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const [infoWindowPosition, setInfoWindowPosition] = useState<Marker | null>(
    null
  );

  const handleMouseEnter = (marker: Marker) => {
    setInfoWindowPosition(marker);
    setIsInfoWindowOpen(!isInfoWindowOpen);
  };

  const IconComponent = ({
    icon,
    color = "#6366F1",
  }: {
    icon: IconType;
    color?: string;
  }): ReactElement => {
    return icon({ size: 24, className: "", color });
  };

  useEffect(() => {
    dispatch(fetchMarkers());
  }, [dispatch]);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>;
  }

  const handleNextPage = () => {
    setPage((prevPage) => (prevPage + 1) % maxPage);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => (prevPage - 1 + maxPage) % maxPage);
  };

  const updateMarkers = (filterOptions: FilterOptions) => {
    const returnArray: Marker[] = filterMarkers(markers, filterOptions);

    setFilteredMarkers(returnArray.length > 0 ? returnArray.flat() : []);

    if (closeMarkers.length > 0) {
      const closeArray: Marker[] = filterMarkers(closeMarkers, filterOptions);

      setCloseMarkers(closeArray.length > 0 ? closeArray.flat() : []);
    }
  };
  const filterMarkers = (
    araryToFilter: Marker[],
    filterOptions: FilterOptions
  ): Marker[] => {
    const reportArray: Marker[] = [];
    let itemsArray: Marker[] = [];
    let returnArray: Marker[] = [];

    araryToFilter.forEach((marker) => {
      if (filterOptions.reportType.length === 1) {
        if (marker.reportType === filterOptions.reportType[0]) {
          console.log(marker.reportType === filterOptions.reportType[0]);
          reportArray.push(marker);
        }
      } else {
        reportArray.push(marker);
      }

      if (filterOptions.itemType !== "All") {
        if (marker.itemType === filterOptions.itemType) {
          itemsArray = reportArray.filter(
            (marker) => marker.itemType === filterOptions.itemType
          );
        }
      } else {
        itemsArray = reportArray;
      }

      returnArray = itemsArray.filter((marker) => {
        return (
          (filterOptions.reportDate.reportDay === "" ||
            marker.reportDate.includes(filterOptions.reportDate.reportDay)) &&
          (filterOptions.reportDate.reportTime === "" ||
            marker.reportDate.includes(filterOptions.reportDate.reportTime)) &&
          (filterOptions.place === "" ||
            marker.place?.includes(filterOptions.place)) &&
          (filterOptions.description === "" ||
            marker.description?.includes(filterOptions.description)) &&
          (filterOptions.title === "" ||
            marker.title?.includes(filterOptions.title)) /* &&
          (filterOptions.reward === 0 ||
            !!marker.reward ? marker.reward === filterOptions.reward : false) */ /*&&
          (filterOptions.isEvent === false ||
            marker.isEvent === filterOptions.isEvent) */
        );
      });

      return;
    });
    return returnArray;
  };

  const updateCloseMarkers = (closerMarkers: Marker[]) => {
    setCloseMarkers(closerMarkers);
  };

  const handleCardButtonClick = (item: Marker) => {
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
    <div className="flex flex-col mt-6 lg:flex-row">
      <div className="flex flex-col gap-2 px-3 mb-3 rounded-md">
        <div className="flex flex-col mb-2 shadow-xl w-full min-h-[550px]">
          {/* <Wrapper apiKey={apiKey}>
            <GoogleMap markers={filteredMarkers ? filteredMarkers : markers}
              onPositionChange={(closerMarkers: Marker[]) => updateCloseMarkers(closerMarkers)}
              onItemCardHover={itemCoordinates!}
              isInfoWindowOpen={isInfoWindowOpen}
              infoWindowPosition={infoWindowPosition!}/>
          </Wrapper> */}
        </div>
        <div className="flex flex-col gap-4 justify-between shadow-xl">
          <div className="flex flex-col w-full justify-between">
            <div
              className="flex justify-between items-center rounded-t-md bg-indigo-100 p-3 cursor-pointer"
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <div className="text-2xl font-semibold p-2">Filters</div>
              {!showFilters && <IconComponent icon={IoIosArrowDown} />}
              {showFilters && <IconComponent icon={IoIosArrowUp} />}
            </div>
            <motion.div
              initial="closed"
              animate={showFilters ? "open" : "closed"}
              variants={{
                open: { height: "auto", opacity: 1 },
                closed: { height: 0, opacity: 0 },
              }}
            >
              <MapFilters
                onFilterChange={(filterOptions: FilterOptions) =>
                  updateMarkers(filterOptions)
                }
              />
            </motion.div>
          </div>
        </div>
      </div>
      {closeMarkers.length > 0 ? (
        <div className="flex flex-col justify-center items-center lg:justify-start lg:items-center pr-2 mb-2">
          <div className="lg:overflow-y-auto lg:h-[650px] pr-2">
            <motion.div
              className="flex overflow-visible overflow-x-auto sm:flex-wrap lg:flex-wrap justify-start items-start rounded-md w-[500px] pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {paginatedCloseMarkers.map((marker: Marker) => {
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
                  color={
                    page < maxPage - 1 ? "text-indigo-500" : "text-indigo-100"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Explore;
