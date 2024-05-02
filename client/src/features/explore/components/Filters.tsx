import { ReactElement, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import MapFilters, { FilterOptions } from "./MapFilters";
import { motion } from "framer-motion";
import { Marker } from "../../../models/Marker";

interface Props {
    markers: Marker[];
    onFilteredMarkersChange: (filteredMarkers: Marker[] | null) => void;
}

const Filters = ({markers, onFilteredMarkersChange}: Props) => {

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filteredMarkers, setFilteredMarkers] = useState<Marker[] | null>(null);
  const [closeMarkers, setCloseMarkers] = useState<Marker[]>([]);

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
    onFilteredMarkersChange(filteredMarkers);
  }, [filteredMarkers, onFilteredMarkersChange]);

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
  
  return (
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
  );
};

export default Filters;
