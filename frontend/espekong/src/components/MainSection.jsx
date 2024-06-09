import { useEffect, useState } from "react";
import AlternativeTable from "./AlternativeTable";
import Form from "./Form";
import TopsisTable from "./TopsisTable";
import { getAllItems } from "../api";
import PropTypes from "prop-types";

const MainSection = ({ getDataTopsis }) => {
  const [items, setItems] = useState([]);
  const [allDataFromAlternative, setAllDataFromAlternative] = useState([]);

  // get all data
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllItems();
        setItems(data.items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  // get all check data from alternativeTable
  const getAllCheckData = (e) => {
    setAllDataFromAlternative(e);
  };

  return (
    <div>
      <div className="h-screen">
        <Form />
        <AlternativeTable items={items} getAllCheckData={getAllCheckData} />
        <TopsisTable
          items={allDataFromAlternative}
          getDataTopsis={getDataTopsis}
        />
        {/* untuk spacing bawah */}
        <div className="opacity-100 h-[10px]"></div>
      </div>
    </div>
  );
};

MainSection.propTypes = {
  getDataTopsis: PropTypes.func,
};

export default MainSection;
