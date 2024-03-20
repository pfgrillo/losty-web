import SingleItemMap from './SingleItemMap';
import { Marker } from '../../models/Marker';
import { Wrapper } from '@googlemaps/react-wrapper';

export interface Props {
    marker: Marker;
}

const ItemCard = ({ marker }: Props) => {

    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return <div>Cannot display the map: google maps api key missing</div>;
    }

    return (
        <div className="text-white">
            <div className="rounded-t-lg opacity-10 bg-white w-full h-24
            ">Image</div>
            <div className="h-24">Description</div>
            <div className="p-2 h-36 rounded-md">
                <Wrapper apiKey={apiKey}><SingleItemMap marker={marker} /></Wrapper>
            </div>
        </div>
    )
}

export default ItemCard;