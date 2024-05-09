// Create a custom hook to fetch close markers
import { useEffect, useState } from "react";
import { ReportedItem, ItemCoordinates } from "../models/ReportedItem";

/// useFetchCloseMarkers hook gets the markers and radius as input and returns the close markers
/// to the users current position
const useCloseMarkers = (markers: ReportedItem[], radius: number) => {
  const [closeMarkers, setCloseMarkers] = useState<ReportedItem[]>([]);
  const [currentLocation, setCurrentLocation] = useState<ItemCoordinates | null>(
    null
  );

  useEffect(() => {
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        setCurrentLocation(pos);
      }
    );
  }, []);

  useEffect(() => {
    if (!currentLocation) return;

    const calculateDistance = (
      lat1: number,
      lon1: number,
      lat2: number,
      lon2: number
    ) => {
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in kilometers
      return distance;
    };

    // Function to convert degrees to radians
    const toRadians = (degrees: number) => {
      return (degrees * Math.PI) / 180;
    };
    const calculateCloseMarkers = (
      markers: ReportedItem[],
      radius: number,
      currentLocation: ItemCoordinates
    ) => {
      return markers.filter((marker) => {
        const distance = calculateDistance(
          currentLocation!.lat,
          currentLocation!.lng,
          marker.coordinates.lat,
          marker.coordinates.lng
        );
        return distance <= radius;
      });
    };

    const newCloseMarkers = calculateCloseMarkers(
      markers,
      radius,
      currentLocation
    );
    setCloseMarkers(newCloseMarkers);
  }, [markers, radius, currentLocation]);

  return closeMarkers;
};

export default useCloseMarkers;
