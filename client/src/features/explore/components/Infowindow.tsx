import CardBox from "../../../common/components/Cards";
import { Marker } from "../../../models/Marker";
import ItemCard from "./ItemCard";

export interface Props {
    marker: Marker;
}

const InfoWindow = ({ marker }: Props) => {
    return (
        <CardBox key={marker._id} minWidth="250px">
            <ItemCard marker={marker} />
        </CardBox>
    );
};

export default InfoWindow;