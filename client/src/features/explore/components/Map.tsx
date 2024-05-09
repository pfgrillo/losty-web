import { useCallback, useEffect, useRef, useState } from "react";
import {
  ReportedItem,
  ItemCoordinates,
  ReportType,
} from "../../../models/ReportedItem";
import {
  MarkerClusterer,
  SuperClusterAlgorithm,
  Cluster,
} from "@googlemaps/markerclusterer";
import ReactDOMServer from "react-dom/server";
import InfoWindow from "./Infowindow";
import Button from "../../../common/components/Button";
import { createRoot } from "react-dom/client";
import Modal from "../../../common/components/Modal";
import Buttons from "../../../common/components/Buttons";
import { useNavigate } from "react-router-dom";
import AddMarker from "./AddItem";
import { LuFilter } from "react-icons/lu";
import { setCloseItems } from "../../../store/features/reportSlice";
import { useAppDispatch } from "../../../hooks/storeHook";
import foundIcon from "../../../assets/icons/found.svg";
import lostIcon from "../../../assets/icons/lost.svg";

interface Props {
  markers: ReportedItem[];
  onItemCardHover?: ReportedItem;
  isInfoWindowOpen?: boolean;
  infoWindowPosition?: ReportedItem;
  onFilterToggle?: (value: boolean) => void;
}

const mapId = process.env.REACT_APP_GOOGLE_MAPS_ID;

const GoogleMap = ({
  markers,
  onItemCardHover,
  isInfoWindowOpen,
  infoWindowPosition,
  onFilterToggle,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [currentInfoWindow, setCurrentInfoWindow] =
    useState<google.maps.InfoWindow | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [hideMarkers, setHideMarkers] = useState(false);
  const [reportType, setReportType] = useState<ReportType | null>(null);

  // Get users current location
  useEffect(() => {
    const fetchUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) => {
          const pos = { lat, lng };
          setCurrentLocation(pos);
        }
      );
    };

    // Check if the user has already granted permission to access their location
    if ("geolocation" in navigator) {
      fetchUserLocation();
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  // Open or close info window based on props changes
  if (map && isInfoWindowOpen && !currentInfoWindow) {
    // Create new info window
    const infowindow = new google.maps.InfoWindow();
    // Get position for the info window
    const position = new google.maps.LatLng(
      infoWindowPosition!.coordinates.lat,
      infoWindowPosition!.coordinates.lng
    );
    // Find the marker associated with the info window
    const marker = markers.filter(
      (marker) =>
        marker.coordinates.lng === infoWindowPosition!.coordinates.lng &&
        marker.coordinates.lat === infoWindowPosition!.coordinates.lat
    )[0];

    // Create and set InfoWindow content
    const infoWindowContent = <InfoWindow marker={marker} />;
    infowindow.setContent(ReactDOMServer.renderToString(infoWindowContent));

    // Set InfoWindow at the specified position
    infowindow.setPosition(position);
    // Open the info window on the map
    infowindow.open(map);
    setCurrentInfoWindow(infowindow);
  }

  // Close info window if it's supposed to be closed and it's currently open
  if (!isInfoWindowOpen && currentInfoWindow) {
    currentInfoWindow.close();
    setCurrentInfoWindow(null);
  }

  // Handler for opening/closing the modal to report an item
  const handleModalToggle = (report?: ReportType) => {
    if (report != null) {
      setReportType(report);
      setHideMarkers(true);
    }
    setShowModal((prev) => !prev);
  };

  // JSX for buttons in the modal
  const modalButtons = (
    <Buttons className="p-3">
      <Button
        color="main"
        label="Found"
        onClick={() => handleModalToggle(ReportType.FOUND)}
      />
      <Button
        color="main"
        label="Lost"
        onClick={() => handleModalToggle(ReportType.LOST)}
      />
    </Buttons>
  );

  // Handler for toggling the filter options
  /*   const handleFilterToggle = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation(); // Stop event propagation to prevent map reload
    if (onFilterToggle) {
      onFilterToggle(true); // Emit true to open the filter options
    }
  }; */

  const handleFilterToggle = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation(); // Stop event propagation to prevent map reload
      if (onFilterToggle) {
        onFilterToggle(true); // Emit true to open the filter options
      }
    },
    [onFilterToggle]
  );
  // Function to create a custom control element and render a React component inside it
  const createMapHTMLElement = (
    map: google.maps.Map,
    position: google.maps.ControlPosition,
    component: JSX.Element
  ) => {
    // Create the custom control element
    const customControlElement = document.createElement("div");

    // Create a root container for the custom control element
    const rootContainer = createRoot(customControlElement);

    // Render the React component inside the custom control element
    rootContainer.render(component);

    // Push the custom control element to the specified position on the map
    map.controls[position].push(customControlElement);
  };

  // Create the Google Map and handle related functionalities when component mounts
  useEffect(() => {
    if (ref.current) {
      const mapOptions = {
        //styles: mapStyles,
        center: currentLocation,
        zoom: 16,
        disableDefaultUI: true,
        zoomControl: true,
        mapId,
      };

      const map = new window.google.maps.Map(ref.current, mapOptions);

      if (map) {
        setMap(map);
      }

      // Function to handle the report item button and its behavior
      const renderReportItemButton = (map: google.maps.Map): void => {
        createMapHTMLElement(
          map,
          window.google.maps.ControlPosition.BOTTOM_CENTER,
          reportType == null ? (
            <Button
              className="mb-10 text-base"
              label="Report item"
              color="main"
              onClick={() => {
                // onPositionChange!([]);  maybe this needs to be changed to useAppDispatch(setCloseItems([]))
                setShowModal((prev) => !prev);
              }}
            />
          ) : (
            <Buttons className="mb-10 justify-around">
              <Button
                className="text-base"
                color="success"
                label="Confirm"
                onClick={() => handleReportItem(map)}
              />
              <Button
                className="text-base"
                color="danger"
                outline
                label="Cancel"
                onClick={() => cancelReportItem()}
              />
            </Buttons>
          )
        );

        // Create a custom control for the filter button
        createMapHTMLElement(
          map,
          window.google.maps.ControlPosition.TOP_RIGHT,
          <Button
            small
            icon={LuFilter}
            iconColor="white"
            color="main"
            onClick={(e) => handleFilterToggle(e)}
            className="m-5"
          />
        );

        // Listener to update markers when map is dragged
        map.addListener("dragend", () => {
          if (reportType == null) {
            const markersDistance: {
              marker: ReportedItem;
              distance: number;
            }[] = [];
            // Get the new center of the map after dragging
            const newCenter = map.getCenter();
            console.log(newCenter?.lat());
            // Filter markers based on their distance from the new center
            markers.forEach((marker) => {
              // Check if marker is within a certain radius of the new center
              const markerPosition = new window.google.maps.LatLng(
                marker.coordinates.lat,
                marker.coordinates.lng
              );
              const distance =
                window.google.maps.geometry?.spherical.computeDistanceBetween(
                  newCenter!,
                  markerPosition
                );

              if (distance <= 3000) {
                console.log(distance);
                markersDistance.push({ marker, distance });
                return;
              }
              return;
            });

            const closeMarkers: ReportedItem[] = [
              ...markersDistance
                .sort((a, b) => a.distance! - b.distance!)
                .map((marker) => marker.marker),
            ];

            const hasRewards: boolean = closeMarkers.some(
              (marker) => marker.reward && marker.reward > 0
            );
            if (hasRewards) {
              closeMarkers.sort((a, b) => b.reward! - a.reward!);
            }
            dispatch(setCloseItems(closeMarkers));
          } else {
            return [];
          }
        });

        return;
      };

      // Add a cirlce polygon with a center at the current location with a radius of 1000 meters
      new google.maps.Circle({
        strokeColor: "rgb(165 180 252)",
        strokeOpacity: 0.2,
        strokeWeight: 5,
        fillColor: "rgb(165 180 252)",
        fillOpacity: 0.15,
        map,
        center: currentLocation,
        radius: 3000,
      });

      const handleReportItem = (map: any) => {
        const selectedPosition = map.getCenter();

        if (reportType && selectedPosition) {
          const position: ItemCoordinates = {
            lat: selectedPosition?.lat()!,
            lng: selectedPosition?.lng()!,
          };
          const img = document.createElement("img");
          img.src = reportType === ReportType.FOUND ? foundIcon : lostIcon;
          img.style.width = "32px";
          img.style.height = "32px";

          new google.maps.marker.AdvancedMarkerElement({
            position,
            map,
            content: img,
          });
          navigate(`/explore/report-item`, {
            state: {
              item: {
                reportType: reportType,
                lat: position.lat,
                lng: position.lng,
              },
            },
          });

          return;
        }
      };

      const cancelReportItem = () => {
        setReportType(null);
        setHideMarkers(false);
      };

      renderReportItemButton(map);

      if (!hideMarkers) {
        // Lost cluster
        createMarkerClusterer(map, markers, ReportType.LOST, (marker) => {});
        // Found cluster
        createMarkerClusterer(map, markers, ReportType.FOUND, (marker) => {});
      } else {
        // Hide markers
        createMarkerClusterer(map, [], ReportType.LOST, (marker) => {});
      }
    }
  }, [
    ref,
    currentLocation,
    markers,
    dispatch,
    reportType,
    hideMarkers,
    navigate,
    onFilterToggle,
    handleFilterToggle,
  ]);

  return (
    <>
      <div
        ref={ref}
        style={{ borderRadius: "6px", width: "100%", height: "550px" }}
      />
      {reportType && (
        <AddMarker
          reportType={reportType}
          onRequestClose={(report?: ReportType) => {}}
        />
      )}

      <Modal
        showModal={showModal}
        onRequestClose={(report?: ReportType) => handleModalToggle(report)}
      >
        <div className="flex flex-col rounded-md">
          <div className="flex justify-between items-center rounded-t-md bg-indigo-100 p-3 cursor-pointer">
            Report item
          </div>
          <div>{modalButtons}</div>
          {/*         <CardBox title="Report item" footer={modalButtons}></CardBox>
           */}{" "}
        </div>
      </Modal>
    </>
  );
};

export default GoogleMap;

const createMarkerClusterer = async (
  map: google.maps.Map,
  markers: ReportedItem[],
  type: ReportType,
  onMarkerClick: (marker: google.maps.marker.AdvancedMarkerElement) => void
): Promise<MarkerClusterer> => {
  const { AdvancedMarkerElement } = (await google.maps.importLibrary(
    "marker"
  )) as google.maps.MarkerLibrary;

  const clusterer = new MarkerClusterer({
    renderer: {
      render: ({ count, position }: Cluster, stats: any) => {
        const priceTag = document.createElement("div");
        priceTag.className = `w-[32px] h-[32px] flex items-center justify-center text-bold text-lg border-2 rounded-full ${
          type === ReportType.FOUND
            ? "bg-[#BEFFC780] border-[#6CE1A1] text-[#23C16B]"
            : "bg-[#FCAFA380] border-[#FF827A] text-[#FF5247]"
        }`;
        priceTag.textContent = String(count);

        const marker = new google.maps.marker.AdvancedMarkerElement({
          content: priceTag,
          position: position,
          map,
        });
        return marker;
      },
    },
    map,
    algorithm: new SuperClusterAlgorithm({
      radius: 150,
    }),
  });

  const markersWithListeners: google.maps.marker.AdvancedMarkerElement[] = [];

  markers
    .filter((marker) => marker.reportType === type)
    .forEach((marker) => {
      const position: google.maps.LatLngLiteral = {
        lat: marker.coordinates.lat,
        lng: marker.coordinates.lng,
      };

      const img = document.createElement("img");
      img.src = type === ReportType.FOUND ? foundIcon : lostIcon;
      img.style.width = "32px";
      img.style.height = "32px";

      const googleMarker = new AdvancedMarkerElement({
        position,
        map,
        content: img,
      });

      const infowindow = new google.maps.InfoWindow();

      googleMarker.addListener("click", () => {
        const marker = markers.filter(
          (marker) =>
            marker.coordinates.lng === position.lng &&
            marker.coordinates.lat === position.lat
        )[0];
        const infoWindowContent = <InfoWindow marker={marker} />;

        infowindow.setContent(ReactDOMServer.renderToString(infoWindowContent));
        infowindow.open(map, googleMarker);
      });

      markersWithListeners.push(googleMarker);
    });

  clusterer.addMarkers(markersWithListeners);

  return clusterer;
};
