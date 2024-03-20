import { useEffect, useRef } from 'react';
import { Marker, ReportType } from '../../models/Marker';
import mapStyles from '../../features/explore/mapStyles.json';

export interface Props {
  marker: Marker;
}

const SingleItemMap = ({ marker }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const position: google.maps.LatLngLiteral = {
      lat: marker.coordinates.lat,
      lng: marker.coordinates.lng,
    };
    // Display the map
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        styles: mapStyles,
        center: position,
        zoom: 16,
        disableDefaultUI: true,
      });

      new google.maps.Marker({
        position,
        map,
        icon: {
          url: marker.reportType === ReportType.FOUND
            ? (require('../../assets/icons/found.svg')).default
            : (require('../../assets/icons/lost.svg')).default,
          anchor: new google.maps.Point(17, 46),
          scaledSize: new google.maps.Size(32, 32),
        }
      });
    }
  }, [ref, marker.coordinates.lat, marker.coordinates.lng, marker.reportType]);

  return (
    <div
      ref={ref}
      className="rounded-md w-full h-full"
    />
  );
};

export default SingleItemMap;
