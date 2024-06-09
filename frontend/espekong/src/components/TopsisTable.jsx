import PropTypes from "prop-types";
import { cn, formatPrice } from "../utils";
import { create, all } from "mathjs";
import { CiCircleAlert } from "react-icons/ci";

const config = {};
const math = create(all, config);

const TopsisTable = ({ items, getDataTopsis }) => {
  const data = items.map((item) => ({
    name: item.namaTempat,
    criteriaValues: [
      item.tiketMasuk / 1000,
      item.jarak,
      item.ratingGoogle,
      item.fasilitas,
      item.waktuKunjungan,
      item.aksesibilitas,
    ],
  }));
  const performTopsisAnalysis = (data) => {
    // Decision Matrix (alternative x criteria)
    const X = data.map((item) => item.criteriaValues);

    // Weights of criteria
    const weights = [4.3, 4.07, 3.8, 4.67, 3.83, 4.2];

    // Impacts (1 for benefit, 0 for cost)
    const impacts = [0, 0, 1, 1, 1, 1];

    // Step 1: Normalize the decision matrix
    const norm = math.map(
      math.sum(
        math.map(X, (row) => math.square(row)),
        0
      ),
      Math.sqrt
    );
    const X_normalized = X.map((row) => row.map((value, i) => value / norm[i]));

    // Step 2: Weighted normalized decision matrix
    const weighted_normalized = X_normalized.map((row) =>
      row.map((value, i) => value * weights[i])
    );

    // Step 3: Determine the ideal and negative-ideal solutions
    const ideal_best = Array(X[0].length).fill(0);
    const ideal_worst = Array(X[0].length).fill(0);

    for (let i = 0; i < X[0].length; i++) {
      if (impacts[i] === 1) {
        // Benefit criteria
        ideal_best[i] = Math.max(...weighted_normalized.map((row) => row[i]));
        ideal_worst[i] = Math.min(...weighted_normalized.map((row) => row[i]));
      } else {
        // Cost criteria
        ideal_best[i] = Math.min(...weighted_normalized.map((row) => row[i]));
        ideal_worst[i] = Math.max(...weighted_normalized.map((row) => row[i]));
      }
    }

    // Step 4: Calculate the distance to the ideal and negative-ideal solutions
    const distance_to_best = weighted_normalized.map((row) =>
      math.sqrt(
        math.sum(
          math.map(math.subtract(row, ideal_best), (val) => math.square(val))
        )
      )
    );
    const distance_to_worst = weighted_normalized.map((row) =>
      math.sqrt(
        math.sum(
          math.map(math.subtract(row, ideal_worst), (val) => math.square(val))
        )
      )
    );
    // Step 5: Calculate the relative closeness to the ideal solution
    const closeness = distance_to_worst.map(
      (dist, i) => dist / (dist + distance_to_best[i])
    );

    const dataWithScore = data.map((dat, i) => ({
      ...dat,
      skor: closeness[i],
    }));

    // sorting descending by skor
    const sortedDataWithScore = dataWithScore.sort((a, b) => b.skor - a.skor);
    // setRankedAlternatives(sortedDataWithScore);
    getDataTopsis(true, sortedDataWithScore);
  };
  return (
    <div>
      <div className="m-4 bg-white rounded-2xl max-h-[40%] overflow-auto relative">
        <div className="mx-4 mt-5 ">
          {/* START BUTTON */}
          <div className="flex justify-between mb-2">
            <p className="font-bold text-lg">
              Tabel Alternatif Perhitungan TOPSIS
            </p>
            <div className="flex w-[19%]">
              <div className="flex w-full justify-end mr-4">
                <button
                  className={cn(
                    "bg-[#182453] text-white px-6 py-1 mr-1 rounded-2xl  border-[#182453] border-2  duration-300  transition-all",
                    items.length >= 0 &&
                      items.length < 3 &&
                      "bg-slate-400 text-slate-300 border-slate-400 cursor-not-allowed ",
                    items.length >= 3 &&
                      "hover:text-[#182453] hover:scale-110 hover:bg-white"
                  )}
                  type="submit"
                  disabled={items.length === 0}
                  onClick={() => performTopsisAnalysis(data)}
                >
                  Hitung
                </button>
                {/* INFORMASI HOVER */}
                <div className="group">
                  <CiCircleAlert className="h-full cursor-pointer" size={20} />
                  <div className="h-7 group-hover:flex hidden   bg-[#182453] w-32 rounded top-12 absolute right-10 items-center justify-center">
                    <p className="text-xs text-white">Minimal 3 data</p>
                  </div>
                </div>
                {/* END INFORMASI HOVER */}
              </div>
            </div>
          </div>
          {/* END BUTTON */}

          {/* START TABLE */}
          <div className="w-full mb-6 rounded-lg">
            <table className="table-auto w-full border-collapse border border-gray-200 rounded-lg">
              <thead className="">
                <tr className="bg-[#EFEFEF] text-sm text-left ">
                  <th className="border-2 p-2 w-6 font-medium text-center">
                    No
                  </th>
                  <th className="border-2 w-1/5 font-medium pl-3">
                    Nama Tempat
                  </th>
                  <th className="border-2 w-32 font-medium pl-3">
                    Harga Tiket Masuk
                  </th>
                  <th className="border-2 w-24 font-medium pl-3">Jarak</th>
                  <th className="border-2 w-24 font-medium pl-3">
                    Rating Google
                  </th>
                  <th className="border-2 w-24 font-medium pl-3">Fasilitas</th>
                  <th className="border-2 w-28 font-medium pl-3">
                    Jam Kunjungan
                  </th>
                  <th className="border-2 w-40 font-medium pl-3">
                    Aksesibilitas Kendaraan
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <tr className=" text-sm border-2" key={item._id}>
                      <td className="border-2 py-[16px] text-center">
                        {index + 1}
                      </td>
                      <td className="border-2 pl-3"> {item.namaTempat}</td>
                      <td className="border-2 pl-3">
                        Rp. {formatPrice(item.tiketMasuk)}
                      </td>
                      <td className="border-2 pl-3">{item.jarak} KM</td>
                      <td className="border-2 pl-3"> {item.ratingGoogle}</td>
                      <td className="border-2 pl-3">{item.fasilitas}</td>
                      <td className="border-2 pl-3">
                        {item.waktuKunjungan} Jam
                      </td>
                      <td className="border-2 pl-3 ">
                        {" "}
                        {(item.aksesibilitas === 1 && "Sulit Dijangkau") ||
                          (item.aksesibilitas === 2 &&
                            "Cukup Mudah Dijangkau") ||
                          (item.aksesibilitas === 3 && "Mudah Dijangkau")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center py-4 text-slate-600">
                      Data Tidak Tersedia
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* END TABLE */}
        </div>
      </div>
    </div>
  );
};

TopsisTable.propTypes = {
  items: PropTypes.array.isRequired,
  getDataTopsis: PropTypes.func,
};

export default TopsisTable;
