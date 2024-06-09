import Logo from "../assets/logo.png";
import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.jpg";
import profile3 from "../assets/profile3.jpg";

const Sidebar = () => {
  const data = [
    {
      name: "M. Azka Atqiya",
      nim: "2100812",
      photo: profile1,
    },
    {
      name: "M. Kamal Robbani",
      nim: "2102313",
      photo: profile2,
    },
    {
      name: "Rasyid Andriansyah",
      nim: "2101963",
      photo: profile3,
    },
  ];

  return (
    <div className="">
      {/* BAGIAN LOGO */}
      <div className="flex justify-center">
        <img width={175} src={Logo} alt="logo" />
      </div>

      <hr className="mx-4 border-2 rounded-md" />

      {/* BAGIAN LATAR BELAKANG */}
      <div className="mt-4 mx-4 text-white">
        <h2 className="font-semibold text-sm">Latar Belakang : </h2>
        <p className="text-[13px] text-justify-hyphens">
          SPK TOPSIS digunakan untuk memilih tempat study tour SMA dengan
          mempertimbangkan beberapa kriteria. Dengan membandingkan setiap opsi
          dengan solusi ideal dan negatif, metode ini membantu sekolah dalam
          membuat keputusan objektif dan efisien dalam menentukan tempat study
          tour yang memberikan manfaat maksimal bagi siswa.
        </p>
      </div>
      {/* BAGIAN PENGEMBANG */}
      <div className="mt-4 mx-4 text-white">
        <h2 className="text-sm font-semibold">Pengembang: </h2>
        {data.map((dat, i) => (
          <div className="flex mt-3" key={i}>
            <div className="overflow-hidden rounded-full w-[72px] h-[72px]">
              <img src={dat.photo} alt="" />
            </div>
            <div className="flex items-center">
              <div className="ml-3 text-sm">
                <p className="line-clamp-1 mb-1">{dat.name}</p>
                <p>{dat.nim}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
