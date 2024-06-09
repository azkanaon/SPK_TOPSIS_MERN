import Sidebar from "../components/Sidebar";
import MainSection from "../components/MainSection";
import PopupResult from "../components/PopupResult";
import { useState } from "react";

const MainPages = () => {
  const [isHitungClick, setIsHitungClick] = useState(false);
  const [dataRanking, setDataRanking] = useState([]);

  const getDataTopsis = (isClick, data) => {
    setIsHitungClick(isClick);
    setDataRanking(data);
  };

  return (
    <div>
      {isHitungClick && <PopupResult dataRanking={dataRanking} />}
      <div className="flex">
        <div className="w-80 h-screen bg-gradient-to-b from-[#235E86] to-[#9C9C9C] sticky top-0">
          <Sidebar />
        </div>
        <div className="w-full bg-gradient-to-tr from-[#182453] to-[#235E86] bg-blue-300 h-screen overflow-y-auto">
          <MainSection getDataTopsis={getDataTopsis} />
        </div>
      </div>
    </div>
  );
};

export default MainPages;
