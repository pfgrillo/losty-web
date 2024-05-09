import { Wrapper } from "@googlemaps/react-wrapper";
import GoogleMap from "../features/explore/components/Map";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchReportedItems } from "../features/explore/services/report.service";
import { AppDispatch } from "../store";
import { useAppSelector } from "../hooks/storeHook";
import { selectReportedItems } from "../store/features/reportSlice";
import { ReportedItem } from "../models/ReportedItem";
import { selectUser } from "../store/features/userSlice";
import Filters from "../features/explore/components/Filters";
import CloseItems from "../features/explore/components/CloseItems";

const Explore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reportedItems = useAppSelector(selectReportedItems);
  const user = useSelector(selectUser);
  const [filteredMarkers, setFilteredMarkers] = useState<ReportedItem[] | null>(
    null
  );
  const [itemCoordinates, setItemCoordinates] = useState<ReportedItem | null>(
    null
  );
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const [infoWindowPosition, setInfoWindowPosition] =
    useState<ReportedItem | null>(null);

  const [showFilters, setShowFilters] = useState(false); // State to control the visibility of Filters

  useEffect(() => {
    dispatch(fetchReportedItems());
  }, [dispatch]);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>;
  }

  const handleFilteredMarkersChange = (
    filteredMarkers: ReportedItem[] | null
  ) => {
    setFilteredMarkers(filteredMarkers);
  };

  return (
    <div className="flex flex-col gap-2 px-3 mb-3 rounded-md mt-6 lg:flex-row">
      <div className="flex flex-col gap-2 px-3 mb-3 rounded-md">
        <div className="flex mb-2 shadow-xl min-h-[550px] lg:flex-row">
          <Wrapper apiKey={apiKey}>
            <GoogleMap
              markers={filteredMarkers ? filteredMarkers : reportedItems}
              onItemCardHover={itemCoordinates!}
              isInfoWindowOpen={isInfoWindowOpen}
              infoWindowPosition={infoWindowPosition!}
              onFilterToggle={() => setShowFilters(!showFilters)}
            />
          </Wrapper>
          {showFilters && (
            <div className="flex flex-col ml-4">
              <Filters
                markers={reportedItems}
                onFilteredMarkersChange={handleFilteredMarkersChange}
              />
            </div>
          )}
        </div>

        <div className="flex justify-evenly mt-5">
          <div className="flex flex-col">
            <div className="text-xl font-semibold p-2">Last items reported</div>
              <CloseItems
                user={user}
                cardsPerPage={2}
              ></CloseItems>
          </div>
          <div className="flex flex-col">
            <div className="text-xl font-semibold p-2">
              Items reported close to you
            </div>
              <CloseItems
                user={user}
                cardsPerPage={2}
              ></CloseItems>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
