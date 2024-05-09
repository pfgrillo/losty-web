import { useEffect, useState } from "react";
import MapFilters, { FilterOptions } from "./MapFilters";
import { ReportedItem } from "../../../models/ReportedItem";

interface Props {
  markers: ReportedItem[];
  onFilteredMarkersChange: (filteredMarkers: ReportedItem[] | null) => void;
}

const Filters = ({ markers, onFilteredMarkersChange }: Props) => {
  const [filteredMarkers, setFilteredMarkers] = useState<ReportedItem[] | null>(
    null
  );
  const [closeMarkers, setCloseMarkers] = useState<ReportedItem[]>([]);

  useEffect(() => {
    onFilteredMarkersChange(filteredMarkers);
  }, [filteredMarkers, onFilteredMarkersChange]);

  const updateMarkers = (filterOptions: FilterOptions) => {
    const returnArray: ReportedItem[] = filterMarkers(markers, filterOptions);

    setFilteredMarkers(returnArray.length > 0 ? returnArray.flat() : []);

    if (closeMarkers.length > 0) {
      const closeArray: ReportedItem[] = filterMarkers(
        closeMarkers,
        filterOptions
      );

      setCloseMarkers(closeArray.length > 0 ? closeArray.flat() : []);
    }
  };

  const filterMarkers = (
    araryToFilter: ReportedItem[],
    filterOptions: FilterOptions
  ): ReportedItem[] => {
    const reportArray: ReportedItem[] = [];
    let itemsArray: ReportedItem[] = [];
    let returnArray: ReportedItem[] = [];

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
      <div className="flex justify-between items-center rounded-t-md bg-indigo-100 p-3 cursor-pointer">
        <div className="text-2xl font-semibold p-2">Filters</div>
      </div>
      <MapFilters
        onFilterChange={(filterOptions: FilterOptions) =>
          updateMarkers(filterOptions)
        }
      />
    </div>
  );
};

export default Filters;
