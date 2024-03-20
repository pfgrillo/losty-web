import ItemCard from '../../../common/components/ItemCard'
import { Marker } from '../../../models/Marker'

const RewardCard = ({ marker }: { marker: Marker }) => {
    return (
        <>
            <div className="border-2 border-primary rounded-md m-5 max-w-[250] min-h-[350px] flex flex-col flex-1 justify-between">
                <ItemCard marker={marker} />
                <div className="text-white justify-self-end self-center flex flex-col items-center p-2 border-t border-t-primary w-full bg-zinc-800">
                    <div className="font-medium text-xl">Reward:</div>
                    <div className="font-bold text-3xl text-primary">$500</div>
                </div>
            </div>
        </>
    )
}

export default RewardCard