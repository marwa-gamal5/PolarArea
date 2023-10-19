import React, { useState, useEffect, useRef } from "react";
import PolarAreaTableItem from "./PolarAreaTableItem";

import './PolarAreaTable.css'
import Table from 'react-bootstrap/Table';


const PolarAreaTable = ({ data, tableName, deleteItem, updateItem, addItem, percentages, totalPercentage, numberArray }) => {

 

  const knowledgeButtonRef = useRef(); // Create a ref for the "Knowledge" button

  const [selectedDimension, setSelectedDimension] = useState(null);
  const [show,setshow] =useState("none");

  // Filter the data based on the selected dimension
  const filteredData = selectedDimension
  ? data.filter((item) => item.backgroundColor === selectedDimension)
  : data;

  const th = tableName.map((el, index) => <th key={index}>{el}</th>);

  // Function to handle dimension filtering
  const handleFilterByDimension = (dimension) => {
    setshow('table')
    setSelectedDimension(dimension);
  };

  const [editItem, setEditItem] = useState(null);

  const deleteItemFunc = (id) => {
    deleteItem(id);
  };

  const setIdEditMode = (id) => {
    setEditItem(id);
  };

  const saveItem = (item) => {
    updateItem(item);
    setEditItem(null);
  };

  const cancelItem = () => {
    setEditItem(null);
  };

  const itemList = filteredData.map((item) => (
    <PolarAreaTableItem
      key={item.id}
      item={item}
      editItem={editItem}
      deleteItem={deleteItemFunc}
      updateItem={updateItem}
      setIdEditMode={setIdEditMode}
      saveItem={saveItem}
      cancelItem={cancelItem}
      percentages={percentages}
      totalPercentage={totalPercentage}
      numberArray={numberArray}
    />
  ));

  useEffect(() => {
    // Programmatically trigger a click event on the "Knowledge" button
    knowledgeButtonRef.current.click();
  }, []); // The empty dependency array ensures this effect runs only once, similar to componentDidMount
const [buttonColor, setButtonColor] = useState("#7BBDE5"); // Initial color

  return (
    <div>
      <div className="">
      <div className="d-flex align-items-center ">
    <button
      ref={knowledgeButtonRef}
      // onClick={() => handleFilterByDimension("#7BBDE5")}
      onClick={() => handleFilterByDimension("#7BBDE5")}
      className={`active-overview-top-btn1`}
      style={{
        backgroundColor: selectedDimension === "#7BBDE5" ? "#498fba" : "#7BBDE5",
         
         borderTop: selectedDimension === "#7BBDE5" ? "5px solid #000000" : "none"
      }}     
    > 
      <div className="d-flex justify-content-between align-items-between">
        <p className="m-0 titesize">Knowledge</p>
        <p className="m-0 ps-lg-3 ps-xl-5 ps-md-4 ps-sm-3 ps-1 titesize2">{percentages["#7BBDE5"].toFixed(0)}%</p>
      </div>
    </button>
  <button onClick={() => handleFilterByDimension("#6BC98D")}
            className={`active-overview-top-btn2`}
            style={{
              backgroundColor: selectedDimension === "#6BC98D" ? "#49ab6d" : "#6BC98D",
             //#808080 
              borderTop: selectedDimension === "#6BC98D" ? "5px solid #000000" : "none"
            }}>
    <div className="d-flex justify-content-between align-items-center">
      <p className="m-0 titesize">Leadership Performance</p>
      <p className="m-0 lg- titesize2 " >{percentages["#6BC98D"].toFixed(0)}%</p>
    </div>
  </button>
  <button  onClick={() => handleFilterByDimension("#E78686")}
            className={`active-overview-top-btn3`}
            style={{
              backgroundColor: selectedDimension === "#E78686" ? "#db7676" : "#E78686",
              
              borderTop: selectedDimension === "#E78686" ? "5px solid #000000" : "none"
            }}>
    <div className="d-flex justify-content-between align-items-between">
      <p className="m-0 titesize2">Behaviors</p>
      <p className="m-0 ps-lg-3 ps-xl-5 ps-md-5 ps-sm-3 ps-1 titesize2">{percentages["#E78686"].toFixed(0)}%</p>
    </div>
  </button>
  <button onClick={() => handleFilterByDimension("#F3C74F")}
            className={`active-overview-top-btn4`}
            style={{
              backgroundColor: selectedDimension === "#F3C74F" ? "#e6b739" : "#F3C74F",
              borderTop: selectedDimension === "#F3C74F" ? "5px solid #000000" : "none" 
            }}>
    <div className="d-flex justify-content-between align-items-between">
      <p className="m-0 titesize2">Skills</p>
      <p className="m-0 ps-lg-3 ps-xl-5 ps-md-5 ps-sm-3 ps-1 titesize2">{percentages["#F3C74F"].toFixed(0)}%</p>
    </div>
  </button>
</div>





        <table className={`table table-bordered `} style={{ display: `${show}` }}>
        <thead class="thead-dark">
            <tr>
            {/* <th scope="col">{th}</th> */}
            <th scope="col">#</th>
            {/* <th scope="col">Dimension</th> */}
            <th className="fixed-column" scope="col">Element</th>
            <th  scope="col ">Rateing</th>
            <th scope="col">Element Percentage</th>
            <th scope="col" className="ee"> Total Percentage</th>
              
            </tr>
          </thead>
          <tbody>
          
          
         {itemList}
          
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PolarAreaTable;
