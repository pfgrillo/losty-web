import RewardCard from "../features/dashboard/components/RewardCards";
import { ItemType, Marker, ReportType } from "../models/Marker";
import SectionMain from "../common/components/Section/SectionMain";

const Dashboard = () => {
  const rewardedMarkers: Marker[] = [
    {
      _id: "1",
      title: "Test",
      description: "This is a test",
      coordinates: {
        lat: 40.741907,
        lng: -74.010869,
      },
      reportType: ReportType.FOUND,
      itemType: ItemType.SUNGLASSES,
      label: "Sunglasses",
      place: "Test",
      reportDate: "01/01/2023",
      reportTime: "12:00",
      user: "user@user.com",
      reward: 0,
    },
    {
      _id: "1",
      title: "Test",
      description: "This is a test",
      coordinates: {
        lat: 40.741907,
        lng: -74.010869,
      },
      reportType: ReportType.FOUND,
      itemType: ItemType.SUNGLASSES,
      label: "Sunglasses",
      place: "Test",
      reportDate: "01/01/2023",
      reportTime: "12:00",
      user: "user@user.com",
      reward: 0,
    },
    {
      _id: "1",
      title: "Test",
      description: "This is a test",
      coordinates: {
        lat: 40.741907,
        lng: -74.010869,
      },
      reportType: ReportType.LOST,
      itemType: ItemType.SUNGLASSES,
      label: "Sunglasses",
      place: "Test",
      reportDate: "01/01/2023",
      reportTime: "12:00",
      user: "user@user.com",
      reward: 0,
    },
  ];

  const RewardedMarkers = () => {
    return (
      <>
        <div className="flex flex-row flex-wrap justify-between items-center">
          {rewardedMarkers.map((marker, index) => (
            <RewardCard key={index} marker={marker} />
          ))}
        </div>
      </>
    );
  };
  return (
    <SectionMain>
      <div className="flex flex-col grow mt-4">
        <div className="flex flex-col grow pl-3">
          <div className="text-white text-3xl font-[600] mb-5">Dashboard</div>
          <div className="p-4 flex flex-col flex-1 bg-indigo-100 rounded-md mb-2 shadow-[0_0_20px_0_rgba(255, 255, 255, 0.3)] ">
            <div className="text-white font-[600], text-2xl">Rewards</div>
            <div
              onClick={() => console.log("clicked")}
              className="cursor-pointer inline-flex flex-1, justify-end items-center"
            >
              <button className="text-white rounded-full border border-primary outline-primary mt-3 py-2 px-4">
                <div className="text-white text-s">See all</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionMain>
  );
};

export default Dashboard;
