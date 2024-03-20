import { useEffect, useRef, useState } from 'react';
import { Coordinates, Marker, ReportType } from '../../../models/Marker';
import { MarkerClusterer, SuperClusterAlgorithm, Cluster } from '@googlemaps/markerclusterer';
import mapStyles from '../mapStyles.json';
import ReactDOMServer from 'react-dom/server';
import InfoWindow from './Infowindow';
import { useDispatch } from 'react-redux';
import Button from '../../../common/components/Button';
import { createRoot } from 'react-dom/client';
import Modal from '../../../common/components/Modal';
import CardBox from '../../../common/components/Cards';
import Buttons from '../../../common/components/Buttons';
import { createSearchParams, useNavigate } from 'react-router-dom';
import AddMarker from './AddMarker';

interface Props {
  markers: Marker[];
  onPositionChange?: (closeMarkers: Marker[]) => void;
  onItemCardHover?: Marker;
  isInfoWindowOpen?: boolean;
  infoWindowPosition?: Marker;
}

const GoogleMap = ({ markers, onPositionChange, onItemCardHover, isInfoWindowOpen, infoWindowPosition }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const dispatch = useDispatch();
  const [showModal, setshowModal] = useState(false);
  const [hideMarkers, setHideMarkers] = useState(false);
  const navigate = useNavigate();
  const [reportType, setReportType] = useState<ReportType | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentInfoWindow, setCurrentInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        setCurrentLocation(pos);
      }
    );
  }, []);

  if (isInfoWindowOpen && map && !currentInfoWindow) {
    const infowindow = new google.maps.InfoWindow();
    const position = new google.maps.LatLng(infoWindowPosition!.coordinates.lat, infoWindowPosition!.coordinates.lng);

    const marker = markers.filter((marker) => marker.coordinates.lng === infoWindowPosition!.coordinates.lng && marker.coordinates.lat === infoWindowPosition!.coordinates.lat)[0];

    // Create InfoWindow content (e.g., using ReactDOMServer)
    const infoWindowContent = (
      <InfoWindow marker={marker} />
    );

    infowindow.setContent(ReactDOMServer.renderToString(infoWindowContent));

    // Open the InfoWindow at the specified position
    infowindow.setPosition(position);
    infowindow.open(map);
    setCurrentInfoWindow(infowindow);
  }

  if (!isInfoWindowOpen && currentInfoWindow) {
    currentInfoWindow.close();
    setCurrentInfoWindow(null);
  }

  const handleRequestClose = (report?: ReportType) => {
    if (report != null) {
      setReportType(report);
      setHideMarkers(true);
    }
    setshowModal((prev) => !prev);
  };

  const modalButtons = (
    <Buttons className='p-3'>
      <Button color="main" label="Found" onClick={() => handleRequestClose(ReportType.FOUND)} />
      <Button color="main" label="Lost" onClick={() => handleRequestClose(ReportType.LOST)} />
    </Buttons>
  );

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

      const reportItemButton = (map: google.maps.Map): void => {
        const customControlElement = document.createElement("div");
        const root = createRoot(customControlElement);

        let customControl;

        if (reportType == null) {
          customControl = <Button className="mb-10 text-base" label="Report item" color="main" onClick={() => { onPositionChange!([]); setshowModal((prev) => !prev); }} />;
        } else {
          customControl = <Buttons className='mb-10 justify-around'>
            <Button className="text-base" color="success" label="Confirm" onClick={() => goToReportItem(map)} />
            <Button className="text-base" color="danger" outline label="Cancel" onClick={() => cancelReporItem()} />
          </Buttons>;
        }

        root.render(customControl);

        map.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(customControlElement);

        map.addListener('dragend', () => {
          if (reportType == null) {
            const markersDistance: {marker: Marker, distance: number}[] = [];
            // Get the new center of the map after dragging
            const newCenter = map.getCenter();
            // Filter markers based on their distance from the new center
            markers.forEach((marker) => {
              // Check if marker is within a certain radius of the new center
              const markerPosition = new window.google.maps.LatLng(marker.coordinates.lat, marker.coordinates.lng);
              const distance = window.google.maps.geometry?.spherical.computeDistanceBetween(newCenter!, markerPosition);
              if (distance <= 3000) {
                markersDistance.push({marker, distance});
                return;
              }
              return;
            });
            
            const closeMarkers: Marker[] = [...markersDistance.sort((a, b) => a.distance! - b.distance!).map((marker) => marker.marker)];

            const hasRewards: boolean = closeMarkers.some((marker) => marker.reward && marker.reward > 0);
            if (hasRewards) {
              closeMarkers.sort((a, b) => b.reward! - a.reward!);
            }

            onPositionChange!(closeMarkers);

            return closeMarkers;
          }
          else {
            return [];
          }
        });

        return;
      }

      // Add a cirlce polygon with a center at the current location with a radius of 1000 meters
      const circle = new google.maps.Circle({
        strokeColor: "rgb(165 180 252)",
        strokeOpacity: 0.2,
        strokeWeight: 5,
        fillColor: "rgb(165 180 252)",
        fillOpacity: 0.15,
        map,
        center: currentLocation,
        radius: 3000,
      });



      const goToReportItem = (map: any) => {
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
              url: reportType === ReportType.FOUND
                ? require('../../../assets/icons/found.svg').default
                : require('../../../assets/icons/lost.svg').default,
              anchor: new google.maps.Point(17, 46),
              scaledSize: new google.maps.Size(32, 32),
            },
          });
  
          console.log('map', position);
          navigate(`/explore/report-item`, { state: { item: {
            reportType: reportType,
            lat: position.lat,
            lng: position.lng,
          }} });

          return;
        }
      };

      const cancelReporItem = () => {
        setReportType(null);
        setHideMarkers(false);
      };

      reportItemButton(map);

      if (!hideMarkers) {
        // Lost cluster
        createMarkerClusterer(map, markers, ReportType.LOST, (marker) => { console.log(marker) });
        // Found cluster
        createMarkerClusterer(map, markers, ReportType.FOUND, (marker) => { console.log(marker) });
      } else {
        // Hide markers
        createMarkerClusterer(map, [], ReportType.LOST, (marker) => { console.log(marker) });
      }
    }
  }, [ref, currentLocation, markers, dispatch, reportType, hideMarkers, navigate]);

  return (
    <>
      <div
        ref={ref}
        style={{ borderRadius: '6px', width: '100%', height: '550px' }}
      />
      {reportType && <AddMarker reportType={reportType} onRequestClose={(report?: ReportType) => { }} />}

      <Modal showModal={showModal} onRequestClose={(report?: ReportType) => handleRequestClose(report)}>
        <div className="flex flex-col rounded-md"></div>
        <CardBox title="Report item" footer={modalButtons}></CardBox>
      </Modal>
    </>
  );
};

export default GoogleMap;

const createMarkerClusterer = (map: google.maps.Map, markers: Marker[], type: ReportType, onMarkerClick: (marker: google.maps.Marker) => void): MarkerClusterer => {
  const clusterer = new MarkerClusterer({
    renderer: {
      render: ({ count, position }: Cluster, stats: any) => {
        const marker = new google.maps.Marker({
          label: {
            text: String(count),
            color: type === ReportType.FOUND ? '#23C16B' : '#FF5247',
            fontSize: '15px',
            fontWeight: 'bold',
            fontFamily: 'Inter',
          },
          icon: {
            url: type === ReportType.FOUND
              ? (require('../../../assets/icons/cluster_found.svg')).default
              : (require('../../../assets/icons/cluster_lost.svg')).default,
            anchor: new google.maps.Point(17, 46),
            scaledSize: new google.maps.Size(42, 42),
          },
          position: position,
          map,
          zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
        });
        return marker;
      }
    },
    map,
    algorithm: new SuperClusterAlgorithm({
      radius: 150,
    }),
  });

  const markersWithListeners: google.maps.Marker[] = [];

  markers.filter((marker) => marker.reportType === type).forEach((marker) => {
    const position: google.maps.LatLngLiteral = {
      lat: marker.coordinates.lat,
      lng: marker.coordinates.lng,
    };

    const markerOptions: google.maps.MarkerOptions = {
      position,
      map,
      icon: {
        url: marker.reportType === ReportType.FOUND
          ? (require('../../../assets/icons/found.svg')).default
          : (require('../../../assets/icons/lost.svg')).default,
        anchor: new google.maps.Point(17, 46),
        scaledSize: new google.maps.Size(32, 32),
      },
    };

    const googleMarker = new google.maps.Marker(markerOptions);

    const infowindow = new google.maps.InfoWindow();

    googleMarker.addListener('click', () => {
      const marker = markers.filter((marker) => marker.coordinates.lng === position.lng && marker.coordinates.lat === position.lat)[0];
      const infoWindowContent = (
        <InfoWindow marker={marker} />
      );

      infowindow.setContent(ReactDOMServer.renderToString(infoWindowContent));
      infowindow.open(map, googleMarker);
    });

    markersWithListeners.push(googleMarker);
  });

  clusterer.addMarkers(markersWithListeners);

  return clusterer;
};
