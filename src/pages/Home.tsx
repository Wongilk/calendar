import WeeklyCalendar from "../components/mainView/WeeklyCalendar";
import LeftSideBar from "../components/sideBar/leftSideBar/LeftSideBar";
import RightSideBar from "../components/sideBar/rightSideBar/RightSideBar";

const Home = () => {
  return (
    <div className="flex">
      <LeftSideBar />
      <WeeklyCalendar />
      <RightSideBar />
    </div>
  );
};

export default Home;
