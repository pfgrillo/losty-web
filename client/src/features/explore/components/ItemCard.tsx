import { colorsBgLight } from "../../../colors";
import Icon from "../../../common/components/Icon";
import { Marker, ReportType } from "../../../models/Marker";
import { toCamelCase } from "../../../utils/string.utils";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";

interface Props {
    marker: Marker;
    onCardClick?: (marker: Marker) => void;
};

const ItemCard = ({ marker, onCardClick }: Props) => {
    return (
        <div className="flex flex-col flex-1 justify-between" onClick={() => onCardClick ? onCardClick(marker) : null}>
            <div className="flex justify-between w-full">
                {marker.reward > 0 && (<div className="flex items-center">
                    <Icon className="mr-1" icon={LiaMoneyBillWaveSolid} size={25} color="#6366f1" />
                    <div className="text-sm text-indigo-500 font-bold">${marker.reward}</div>
                </div>)}
                <div className={`text-sm w-fit self-end px-1 border rounded-md 
                        ${marker.reportType === ReportType.FOUND ? colorsBgLight.success : colorsBgLight.danger}`}>
                    {marker.itemType}
                </div>
            </div>
            <div className="self-center text-xl font-semibold mb-2">{toCamelCase(marker.title)}</div>
            <div className="flex flex-col justify-between mb-1">
                {marker.reportType === ReportType.LOST && !!marker.image && (<div className="self-center h-[100px] w-[200px] bg-white rounded-md mb-1">
                    {!!marker.image && (<img className="h-full w-full object-contain rounded-md" src={require(`../../../assets/${marker.image}`)} alt="item" />)}
                </div>)}
                    <div className="text-sm"><b>Report date:</b> {marker.reportDate}</div>
                    <div className="text-sm"><b>Description:</b> {marker.description}</div>
                    <div className="text-sm"><b>Place:</b> {marker.place}</div>
            </div>
        </div>
    );
};

export default ItemCard;