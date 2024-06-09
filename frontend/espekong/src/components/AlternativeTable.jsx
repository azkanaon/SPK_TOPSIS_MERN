import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";
import { cn, formatPrice } from "../utils";
import { useEffect, useState } from "react";
import { deleteItem } from "../api";

const AlternativeTable = ({ items, getAllCheckData }) => {
  const [updateData, setUpdateData] = useState(items);
  const [allCheckData, setAllCheckData] = useState([]);
  const [checkboxIsCheck, setCheckboxIsCheck] = useState(false);

  // Menambah value checked di setiap objek pada array
  useEffect(() => {
    const updatedItems = items.map((item) => ({
      ...item,
      checked: false,
    }));

    setUpdateData(updatedItems);
  }, [items]);

  // untuk keperluan disable button
  useEffect(() => {
    const x = updateData.filter((item) => item.checked);
    if (x.length > 0) {
      setCheckboxIsCheck(true);
    } else {
      setCheckboxIsCheck(false);
    }
  }, [updateData, allCheckData]);

  // handle perubahan ketika checkbox dipencet
  const handleCheckboxChange = (idItem) => {
    setUpdateData((prevItems) => {
      const newItems = prevItems.map((item) => {
        if (item._id === idItem) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
      return newItems;
    });
  };

  // memasukkan semua variabel terceklis ke allcheckdata
  const handlePilihButton = (e) => {
    e.preventDefault();
    setAllCheckData(updateData.filter((item) => item.checked));
    getAllCheckData(updateData.filter((item) => item.checked));
  };

  // Delete Item
  const deleteData = async (id) => {
    try {
      await deleteItem(id);
      // Perbarui state setelah item dihapus
      setUpdateData((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error delete item:", error);
    }
  };

  return (
    <div className="m-4 bg-white rounded-2xl max-h-[40%] overflow-auto">
      <div className="mx-4 mt-5 ">
        {/* START FORM */}
        <div className="flex justify-between mb-2">
          <p className="font-bold text-lg">
            Tabel Alternatif Tempat Pemilihan Study Tour
          </p>
          <div className="flex w-[28%]">
            <form action="" className="flex w-full justify-end mr-4">
              <button
                className={cn(
                  "bg-[#182453] text-white px-6 py-1 mr-3 rounded-2xl  border-[#182453] border-2  duration-300  transition-all",
                  !checkboxIsCheck &&
                    "bg-slate-400 text-slate-300 border-slate-400 cursor-not-allowed ",
                  checkboxIsCheck &&
                    "hover:text-[#182453] hover:scale-110 hover:bg-white"
                )}
                disabled={!checkboxIsCheck}
                onClick={handlePilihButton}
              >
                Pilih
              </button>
            </form>
          </div>
        </div>
        {/* END FORM */}

        {/* START TABLE */}
        <div className="w-full mb-6 rounded-lg">
          <table className="table-auto w-full border-collapse border border-gray-200 rounded-lg">
            <thead className="">
              <tr className="bg-[#EFEFEF] text-sm text-left ">
                <th className="border-2 p-2 w-6 font-medium text-center">No</th>
                <th className="border-2 w-1/5 font-medium pl-3">Nama Tempat</th>
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
                <th className="border-2 w-16 font-medium text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {updateData?.length > 0 &&
              allCheckData.length !== updateData.length ? (
                updateData
                  .filter(
                    (updateItem) =>
                      !allCheckData.some(
                        (checkItem) => checkItem._id === updateItem._id
                      )
                  )
                  .map((item, i) => (
                    <tr className=" text-sm border-2 " key={i}>
                      <td className="border-2 py-[16px] text-center">
                        {1 + i}
                      </td>
                      <td className="border-2 pl-3">{item.namaTempat}</td>
                      <td className="border-2 pl-3">
                        {formatPrice(item.tiketMasuk)}
                      </td>
                      <td className="border-2 pl-3">{item.jarak} KM</td>
                      <td className="border-2 pl-3">{item.ratingGoogle}</td>
                      <td className="border-2 pl-3">{item.fasilitas}</td>
                      <td className="border-2 pl-3">
                        {item.waktuKunjungan} Jam
                      </td>
                      <td className="border-2 pl-3">
                        {(item.aksesibilitas === 1 && "Sulit Dijangkau") ||
                          (item.aksesibilitas === 2 &&
                            "Cukup Mudah Dijangkau") ||
                          (item.aksesibilitas === 3 && "Mudah Dijangkau")}
                      </td>
                      <td className="border-2 pl-3">
                        <div className="flex items-center justify-around">
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => handleCheckboxChange(item._id)}
                            className="relative h-5 w-5 appearance-none cursor-pointer bg-slate-300 rounded checked:bg-[#182453] before:content-[''] before:absolute before:left-[6px] before:w-2 before:h-4 before:border-[3px] before:border-solid before:border-slate-300 before:border-l-0 before:border-t-0 before:rotate-45 before:scale-100"
                          />

                          <FaTrash
                            className="text-red-700 cursor-pointer"
                            size={18}
                            onClick={() => {
                              deleteData(item._id);
                            }}
                          />
                        </div>
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
  );
};

AlternativeTable.propTypes = {
  items: PropTypes.array,
  getAllCheckData: PropTypes.func,
};

export default AlternativeTable;
