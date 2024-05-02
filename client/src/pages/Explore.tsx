import { Wrapper } from "@googlemaps/react-wrapper";
import GoogleMap from "../features/explore/components/Map";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMarkers } from "../features/explore/services/report.service";
import { AppDispatch } from "../store";
import { useAppSelector } from "../hooks/storeHook";
import { selectMarkers } from "../store/features/reportSlice";
import { Marker } from "../models/Marker";
import { selectUser } from "../store/features/userSlice";
import Filters from "../features/explore/components/Filters";
import CloseMarkers from "../features/explore/components/CloseMarkers";

const Explore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const markers = useAppSelector(selectMarkers);
  const user = useSelector(selectUser);
  const [filteredMarkers, setFilteredMarkers] = useState<Marker[] | null>(null);
  const [closeMarkers, setCloseMarkers] = useState<Marker[]>([]);
  const [itemCoordinates, setItemCoordinates] = useState<Marker | null>(null);
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const [infoWindowPosition, setInfoWindowPosition] = useState<Marker | null>(
    null
  );

  const handleFilteredMarkersChange = (filteredMarkers: Marker[] | null) => {
    setFilteredMarkers(filteredMarkers);
  };

  const handleCloseMarkersChange = (closeMarkers: Marker[]) => {
    setCloseMarkers(closeMarkers);
  };

  useEffect(() => {
    dispatch(fetchMarkers());
  }, [dispatch]);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>;
  }

  const updateCloseMarkers = (closerMarkers: Marker[]) => {
    setCloseMarkers(closerMarkers);
  };

  return (
    <div className="flex flex-col mt-6 lg:flex-row">
      <div className="flex flex-col gap-2 px-3 mb-3 rounded-md">
        <div className="flex flex-col mb-2 shadow-xl w-full min-h-[550px]">
          <Wrapper apiKey={apiKey}>
            <GoogleMap
              markers={filteredMarkers ? filteredMarkers : markers}
              onPositionChange={(closerMarkers: Marker[]) =>
                updateCloseMarkers(closerMarkers)
              }
              onItemCardHover={itemCoordinates!}
              isInfoWindowOpen={isInfoWindowOpen}
              infoWindowPosition={infoWindowPosition!}
            />
          </Wrapper>
        </div>
        <div className="flex flex-col gap-4 justify-between shadow-xl">
          <Filters
            markers={markers}
            onFilteredMarkersChange={handleFilteredMarkersChange}
          />
        </div>
      </div>
      {closeMarkers.length > 0 ? (
        <CloseMarkers
          closeMarkers={closeMarkers}
          user={user}
          onCloseMarkersChange={handleCloseMarkersChange}
        ></CloseMarkers>
      ) : null}
    </div>
  );
};

export default Explore;
