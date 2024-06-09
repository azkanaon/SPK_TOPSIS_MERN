import { useEffect, useState } from "react";
import Frame1 from "../assets/frame1.png";
import { cn } from "../utils";
import { createItem } from "../api";
import { CiCircleAlert } from "react-icons/ci";

const Form = () => {
  const [namaTempat, setNamaTempat] = useState("");
  const [jarak, setJarak] = useState(null);
  const [ratingGoogle, setRatingGoogle] = useState(null);
  const [fasilitas, setFasilitas] = useState(null);
  const [tiketMasuk, setTiketMasuk] = useState(null);
  const [waktuKunjungan, setWaktuKunjungan] = useState(null);
  const [aksesibilitas, setAksesibilitas] = useState(null);

  const [isFull, setIsFull] = useState(false);

  const handleChangeAksesibilitas = (event) => {
    setAksesibilitas(event.target.value);
  };
  // CONDITION FOR SUBMIT BUTTON
  useEffect(() => {
    const allFieldsFilled =
      namaTempat &&
      jarak &&
      ratingGoogle &&
      fasilitas &&
      tiketMasuk &&
      waktuKunjungan &&
      aksesibilitas;

    setIsFull(allFieldsFilled);
  }, [
    aksesibilitas,
    namaTempat,
    jarak,
    ratingGoogle,
    fasilitas,
    tiketMasuk,
    waktuKunjungan,
  ]);

  // ADD NEW ITEM
  const addItem = async () => {
    try {
      const data = {
        namaTempat,
        jarak,
        ratingGoogle,
        fasilitas,
        tiketMasuk,
        waktuKunjungan,
        aksesibilitas,
      };
      await createItem(data);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <div className="grid grid-cols-6 m-4 overflow-hidden rounded-2xl">
      {/* BAGIAN FOTO FORM ALTERNATIF */}
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Frame1})` }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-white leading-[50px] font-bebas mt-4">
            <p className="text-[76px] ">FORM</p>
            <p className="text-[30px] tracking-wide">ALTERNATIF BARU</p>
          </div>
        </div>
      </div>
      {/* END BAGIAN FOTO FORM ALTERNATIF */}

      {/* FORM */}
      <div className="w-full  h-full col-span-5 bg-white">
        <div className="m-6 mx-12">
          {/* FORM DIMULAI DISINI */}
          <form className="">
            {/* FORM BARIS 1 */}
            <div className="flex justify-between">
              <div className="flex flex-col  w-full mx-3">
                <label htmlFor="">Nama Alternatif</label>
                <input
                  className="bg-[#EFEFEF] outline-none w-full py-1 pl-3 rounded-lg border-2 border-[#9E9E9E] "
                  type="text"
                  onChange={(e) => {
                    setNamaTempat(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* END FORM BARIS 1 */}

            {/* FORM BARIS 2 */}
            <div className="flex justify-between mt-4">
              <div className="flex flex-col  w-full mx-3">
                <label htmlFor="">Harga Tiket Masuk</label>
                <input
                  className="bg-[#EFEFEF] outline-none w-full py-1 pl-3 rounded-lg border-2 border-[#9E9E9E] "
                  type="number"
                  onChange={(e) => {
                    setTiketMasuk(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col  w-full mx-3">
                <label htmlFor="">Rating Google</label>
                <input
                  className="bg-[#EFEFEF] outline-none w-full py-1 pl-3 rounded-lg border-2 border-[#9E9E9E] "
                  type="number"
                  step="0.01"
                  onChange={(e) => {
                    setRatingGoogle(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col relative w-full mx-3">
                <div className="flex">
                  <label className="mr-1">Jam Kunjungan</label>
                  <div className="group">
                    <CiCircleAlert
                      className="h-full cursor-pointer"
                      size={20}
                    />
                    {/* INFORMASI HOVER */}
                    <div className="h-16 p-2 group-hover:block hidden bg-[#182453] w-52 rounded top-4 absolute right-9 items-center justify-center">
                      <p className="text-xs text-white">Informasi : </p>
                      <p className="text-xs text-white">
                        Waktu tutup - waktu buka (dalam jam)
                      </p>
                    </div>
                    {/* END INFORMASI HOVER */}
                  </div>
                </div>
                <input
                  className="bg-[#EFEFEF] outline-none w-full py-1 pl-3 rounded-lg border-2 border-[#9E9E9E] "
                  type="number"
                  step="0.01"
                  onChange={(e) => {
                    setWaktuKunjungan(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* END FORM BARIS 2 */}

            {/* FORM BARIS 3 */}
            <div className="flex justify-between mt-4">
              <div className="flex flex-col  w-full mx-3">
                <label htmlFor="">Jarak</label>
                <input
                  className="bg-[#EFEFEF] outline-none w-full py-1 pl-3 rounded-lg border-2 border-[#9E9E9E] "
                  type="number"
                  onChange={(e) => {
                    setJarak(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col  w-full mx-3">
                <label htmlFor="">Aksesibilitas</label>
                <select
                  value={aksesibilitas}
                  onChange={handleChangeAksesibilitas}
                  className="bg-[#EFEFEF] outline-none w-full py-1 pl-3 rounded-lg border-2 border-[#9E9E9E]"
                >
                  <option value="">--Pilih--</option>
                  <option value={3}>Mudah DIjangkau</option>
                  <option value={2}>Cukup Mudah Dijangkau</option>
                  <option value={1}>Sulit Dijangkau</option>
                </select>
              </div>
              <div className="flex flex-col  w-full mx-3 relative">
                <div className="flex">
                  <label htmlFor="">Fasilitas</label>
                  <div className="group">
                    <CiCircleAlert
                      className="h-full cursor-pointer"
                      size={20}
                    />
                    {/* INFORMASI HOVER */}
                    <div className="h-fit p-2 group-hover:block hidden bg-[#182453] w-72 rounded -top-8 absolute right-4 items-center justify-center text-xs text-white">
                      <p className="">Informasi : </p>
                      <p className="">Jumlah Fasilitas</p>
                      <p className="mt-2">List Fasilitas</p>
                      <div className="flex w-full justify-between">
                        <div>
                          <p>1. WC</p>
                          <p>2. Tempat Ibadah</p>
                          <p>3. Tempat Makan</p>
                          <p>4. Tempat Parkir</p>
                          <p>5. ATM</p>
                        </div>
                        <div>
                          <p>6. Transportasi Internal</p>
                          <p>7. Toko Sovenir</p>
                          <p>8. Tempat Penginapan</p>
                          <p>9. Pos Kesehatan</p>
                          <p>10. Pusat Informasi</p>
                        </div>
                      </div>
                    </div>
                    {/* END INFORMASI HOVER */}
                  </div>
                </div>
                <input
                  className="bg-[#EFEFEF] outline-none w-full py-1 pl-3 rounded-lg border-2 border-[#9E9E9E] "
                  type="number"
                  onChange={(e) => {
                    setFasilitas(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* END FORM BARIS 3 */}

            {/* BUTTON */}
            <div className="w-full flex justify-end mt-3 ">
              <button
                className={cn(
                  "bg-[#182453] text-white px-6 py-1 mr-3 rounded-2xl  border-[#182453] border-2  duration-300  transition-all",
                  !isFull &&
                    "bg-slate-400 text-slate-300 border-slate-400 cursor-not-allowed ",
                  isFull &&
                    "hover:text-[#182453] hover:scale-110 hover:bg-white"
                )}
                disabled={!isFull}
                type="submit"
                onClick={() => {
                  addItem();
                }}
              >
                Submit
              </button>
            </div>
            {/* END BUTTON */}
          </form>
          {/* FORM END DISINI */}
        </div>
      </div>
      {/* END FORM */}
    </div>
  );
};

export default Form;
