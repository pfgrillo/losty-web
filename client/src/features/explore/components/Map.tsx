import { useEffect, useRef, useState } from "react";
import { Coordinates, Marker, ReportType } from "../../../models/Marker";
import {
  MarkerClusterer,
  SuperClusterAlgorithm,
  Cluster,
} from "@googlemaps/markerclusterer";
import mapStyles from "../mapStyles.json";
import ReactDOMServer from "react-dom/server";
import InfoWindow from "./Infowindow";
import { useDispatch } from "react-redux";
import Button from "../../../common/components/Button";
import { createRoot } from "react-dom/client";
import Modal from "../../../common/components/Modal";
import Buttons from "../../../common/components/Buttons";
import { useNavigate } from "react-router-dom";
import AddMarker from "./AddMarker";

interface Props {
  markers: Marker[];
  onPositionChange?: (closeMarkers: Marker[]) => void;
  onItemCardHover?: Marker;
  isInfoWindowOpen?: boolean;
  infoWindowPosition?: Marker;
}

const GoogleMap = ({
  markers,
  onPositionChange,
  onItemCardHover,
  isInfoWindowOpen,
  infoWindowPosition,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
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
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        setCurrentLocation(pos);
      }
    );
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

  // Create the Google Map and handle related functionalities when component mounts
  useEffect(() => {
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        styles: mapStyles,
        center: currentLocation,
        zoom: 16,
        disableDefaultUI: true,
        zoomControl: true,
      });

      if (map) {
        setMap(map);
      }

      // Function to handle the report item button and its behavior
      const renderReportItemButton = (map: google.maps.Map): void => {
        const customControlElement = document.createElement("div");
        const rootContainer = createRoot(customControlElement);

        let customControl;

        if (reportType == null) {
          customControl = (
            <Button
              className="mb-10 text-base"
              label="Report item"
              color="main"
              onClick={() => {
                onPositionChange!([]);
                setShowModal((prev) => !prev);
              }}
            />
          );
        } else {
          customControl = (
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
          );
        }

        // Render the custom control button on the bottom center of the map
        rootContainer.render(customControl);
        map.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(
          customControlElement
        );

        // Listener to update markers when map is dragged
        map.addListener("dragend", () => {
          if (reportType == null) {
            const markersDistance: { marker: Marker; distance: number }[] = [];
            // Get the new center of the map after dragging
            const newCenter = map.getCenter();
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
                markersDistance.push({ marker, distance });
                return;
              }
              return;
            });

            const closeMarkers: Marker[] = [
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

            // Update markers based on new center
            onPositionChange!(closeMarkers);

            return closeMarkers;
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
          const position: Coordinates = {
            lat: selectedPosition?.lat()!,
            lng: selectedPosition?.lng()!,
          };

          new google.maps.Marker({
            position,
            map,
            icon: {
              url:
                reportType === ReportType.FOUND
                  ? require("../../../assets/icons/found.svg").default
                  : require("../../../assets/icons/lost.svg").default,
              anchor: new google.maps.Point(17, 46),
              scaledSize: new google.maps.Size(32, 32),
            },
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
    onPositionChange,
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

const createMarkerClusterer = (
  map: google.maps.Map,
  markers: Marker[],
  type: ReportType,
  onMarkerClick: (marker: google.maps.Marker) => void
): MarkerClusterer => {
  const clusterer = new MarkerClusterer({
    renderer: {
      render: ({ count, position }: Cluster, stats: any) => {
        const marker = new google.maps.Marker({
          label: {
            text: String(count),
            color: type === ReportType.FOUND ? "#23C16B" : "#FF5247",
            fontSize: "15px",
            fontWeight: "bold",
            fontFamily: "Inter",
          },
          icon: {
            url:
              type === ReportType.FOUND
                ? require("../../../assets/icons/cluster_found.svg").default
                : require("../../../assets/icons/cluster_lost.svg").default,
            anchor: new google.maps.Point(17, 46),
            scaledSize: new google.maps.Size(42, 42),
          },
          position: position,
          map,
          zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
        });
        return marker;
      },
    },
    map,
    algorithm: new SuperClusterAlgorithm({
      radius: 150,
    }),
  });

  const markersWithListeners: google.maps.Marker[] = [];

  markers
    .filter((marker) => marker.reportType === type)
    .forEach((marker) => {
      const position: google.maps.LatLngLiteral = {
        lat: marker.coordinates.lat,
        lng: marker.coordinates.lng,
      };

      const markerOptions: google.maps.MarkerOptions = {
        position,
        map,
        icon: {
          url:
            marker.reportType === ReportType.FOUND
              ? require("../../../assets/icons/found.svg").default
              : require("../../../assets/icons/lost.svg").default,
          anchor: new google.maps.Point(17, 46),
          scaledSize: new google.maps.Size(32, 32),
        },
      };

      const googleMarker = new google.maps.Marker(markerOptions);

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
