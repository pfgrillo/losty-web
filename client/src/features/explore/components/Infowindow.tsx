import CardBox from "../../../common/components/Cards";
import { ReportedItem } from "../../../models/ReportedItem";
import ItemCard from "./ItemCard";

export interface Props {
  marker: ReportedItem;
}

const InfoWindow = ({ marker }: Props) => {
  return (
    <CardBox key={marker._id} minWidth="250px">
      <ItemCard marker={marker} />
    </CardBox>
  );
};

export default InfoWindow;
