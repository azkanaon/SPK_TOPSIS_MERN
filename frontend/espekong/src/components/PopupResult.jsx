import { IoIosCloseCircleOutline } from "react-icons/io";
import PropTypes from "prop-types";
import { FaMedal } from "react-icons/fa";

const PopupResult = ({ dataRanking }) => {
  // console.log(dataRanking);
  const rank4 = dataRanking.filter((_, i) => i > 2);

  return (
    <div className="flex items-center justify-center absolute h-screen w-screen z-10 bg-black/80">
      <div className="bg-[#182453] overflow-auto rounded-xl h-[65%] w-[50%] text-white animate-fadeInZoom">
        {/* Close BUTTON */}
        <div className="flex justify-end sticky top-0">
          <span className="px-4 mr-2 mt-4 ">
            <IoIosCloseCircleOutline
              size={24}
              color="white"
              className="hover:scale-125 duration-300 transition-all cursor-pointer"
              onClick={() => {
                window.location.reload();
              }}
            />
          </span>
        </div>
        {/* END Close BUTTON */}
        {/* TULISAN HASIL */}
        <div className="text-center text-xl font-semibold">
          <h2>Hasil Perangkingan</h2>
        </div>
        {/* END TULISAN HASIL */}

        {/* LEADERBOARD */}
        <div className="w-full mt-3 flex justify-center items-end flex-row overflow-hidden">
          <div className="animate-bottomToTop2">
            <div className="text-center text-sm mb-2 font-semibold">
              <p className="w-28">{dataRanking[1].name}</p>
              <p>{dataRanking[1].skor.toFixed(3)}</p>
            </div>
            <div className="bg-white w-28 h-32 border-2 border-slate-300 ">
              <div className="flex justify-center">
                <FaMedal size={40} color="#ACACAC" />
              </div>
              <div className="mt-3 flex justify-center font-semibold text-sm text-black/80">
                Second
              </div>
            </div>
          </div>

          <div className="animate-bottomToTop3">
            <div className="text-center text-sm mb-2 font-semibold">
              <p className="w-28">{dataRanking[0].name}</p>
              <p>{dataRanking[0].skor.toFixed(3)}</p>
            </div>
            <div className="bg-white w-28 h-40 border-2 border-slate-300 ">
              <div className="flex justify-center">
                <FaMedal size={40} color="#FFD233" />
              </div>
              <div className="mt-3 flex justify-center font-semibold text-sm text-black/80">
                First
              </div>
            </div>
          </div>

          <div className="animate-bottomToTop">
            <div className="text-center text-sm mb-2 font-semibold">
              <p className="w-28">{dataRanking[2].name}</p>
              <p>{dataRanking[2].skor.toFixed(3)}</p>
            </div>

            <div className="bg-white w-28 h-24 border-2 border-slate-300 ">
              <div className="flex justify-center">
                <FaMedal size={40} color="#FFAA46" />
              </div>
              <div className="mt-3 flex justify-center font-semibold text-sm text-black/80">
                Third
              </div>
            </div>
          </div>
        </div>
        {/* END LEADERBOARD */}

        {/* TABEL */}
        {rank4.length > 0 ? (
          <div className="w-full px-6 my-6 rounded-lg h-64 animate-fadeIn">
            <table className="table-auto w-full border-collapse border border-gray-200 rounded-lg animate-fadeIn">
              <thead className="">
                <tr className="bg-[#EFEFEF] text-sm text-center text-[#182453] ">
                  <th className="border-2 p-2 w-6 font-medium text-center">
                    No
                  </th>
                  <th className="border-2  font-medium pl-3">Nama Tempat</th>
                  <th className="border-2 font-medium pl-3">Skor</th>
                </tr>
              </thead>
              <tbody>
                {rank4.map((item, index) => (
                  <tr className=" text-sm border-2" key={index}>
                    <td className="border-2 py-[16px] text-center">
                      {index + 4}
                    </td>
                    <td className="border-2 pl-3"> {item.name}</td>
                    <td className="border-2 pl-3">{item.skor.toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div></div>
        )}

        {/* END TABEL */}
      </div>
    </div>
  );
};

PopupResult.propTypes = {
  dataRanking: PropTypes.array,
};

export default PopupResult;
