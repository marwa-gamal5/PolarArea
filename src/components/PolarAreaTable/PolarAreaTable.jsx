import React, { useState, useEffect, useRef } from "react";
import PolarAreaTableItem from "./PolarAreaTableItem";

import './PolarAreaTable.css'



const PolarAreaTable = ({ data, tableName, deleteItem, updateItem, addItem, percentages, totalPercentage, numberArray ,resetRanging}) => {
  // Function to handle dimension filtering and set the table header background color

  const [tableHeaderBackgroundColor, setTableHeaderBackgroundColor] = useState("#0B8FDA"); // Initial background color

  const knowledgeButtonRef = useRef(); // Create a ref for the "Knowledge" button

  const [selectedDimension, setSelectedDimension] = useState(null);
  const [show,setshow] =useState("none");

  // Filter the data based on the selected dimension
  const filteredData = selectedDimension
  ? data.filter((item) => item.backgroundColor === selectedDimension)
  : data;

  const th = tableName.map((el, index) => <th key={index}>{el}</th>);

  // Function to handle dimension filtering
  const handleFilterByDimension = (dimension ,backgroundColor) => {
    setshow('table')
    setSelectedDimension(dimension);
    setTableHeaderBackgroundColor(backgroundColor);
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
      resetRanging={resetRanging}
    />
  ));

  
  useEffect(() => {
    // Programmatically trigger a click event on the "Knowledge" button
    knowledgeButtonRef.current.click();
  }, []); // The empty dependency array ensures this effect runs only once, similar to componentDidMount
const [buttonColor, setButtonColor] = useState("#0B8FDA"); // Initial color

  return (
    <div>
    <div>
          <div className="SS d-flex justify-content-around align-content-around ">
     
       
    <button
      ref={knowledgeButtonRef}
      // onClick={() => handleFilterByDimension("#0B8FDA")}
      onClick={() => handleFilterByDimension("#0B8FDA", "#0B8FDA")}
      className={`active-overview-top-btn1 ms-1`}
      style={{
        backgroundColor: selectedDimension === "#0B8FDA" ? "#0B8FDA" : "#EFEFF0",
        color:selectedDimension === "#0B8FDA" ? "#fff" : "",
        borderRadius: selectedDimension === "#0B8FDA" ? "16px" : "16",
       
        // borderRight: selectedDimension === "#0B8FDA" ? "1px solid #000000" : "none",
        //  borderTop: selectedDimension === "#0B8FDA" ? "5px solid #000000" : "none"
      }}     
    > 
      <div className="d-flex justify-content-around align-items-around">
        <p className="m-0 titesize">Knowledge</p>
        <p className="m-0 ps-lg-3 ps-xl-4 ps-md-4 ps-sm-3 ps-1 titesize2">{percentages["#0B8FDA"].toFixed(0)}%</p>
      </div>
    </button>
    <div className="line mx-2"> </div>
    
   
  <button onClick={() => handleFilterByDimension("#7DBB6D", "#7DBB6D")}
            className={`active-overview-top-btn2`}
            style={{
              backgroundColor: selectedDimension === "#7DBB6D" ? "#7DBB6D" : "#EFEFF0",
              color:selectedDimension === "#7DBB6D" ? "#fff" : "",
             //#808080 
             borderRadius: selectedDimension === "#7DBB6D" ? "16px" : "16"
             
              // borderTop: selectedDimension === "#7DBB6D" ? "5px solid #000000" : "none"
            }}>
    <div className="d-flex justify-content-around align-items-center">
      <p className="m-0 titesize">Leadership Performance</p>
      <p className="m-0 lg- titesize2 " >{percentages["#7DBB6D"].toFixed(0)}%</p>
    </div>
  </button>
  <div className="line mx-2"> </div>
  <button onClick={() => handleFilterByDimension("#DE7676", "#DE7676")}
            className={`active-overview-top-btn3`}
            style={{
              backgroundColor: selectedDimension === "#DE7676" ? "#DE7676" : "#EFEFF0",
              color:selectedDimension === "#DE7676" ? "#fff" : "",
              borderRadius: selectedDimension === "#DE7676" ? "16px" : "16"
            }}>
    <div className="d-flex justify-content-around align-items-around">
      <p className="m-0 titesize2">Behaviors</p>
      <p className="m-0 ps-lg-3 ps-xl-5 ps-md-5 ps-sm-3 ps-1 titesize2">{percentages["#DE7676"].toFixed(0)}%</p>
    </div>
  </button>
  <div className="line mx-2"> </div>
  <button onClick={() => handleFilterByDimension("#EACE3E", "#EACE3E")}
            className={`active-overview-top-btn4`}
            style={{
              backgroundColor: selectedDimension === "#EACE3E" ? "#EACE3E" : "#EFEFF0",
              color:selectedDimension === "#EACE3E" ? "#fff" : "",
              borderRadius: selectedDimension === "#EACE3E" ? "16px" : "16"
              // borderTop: selectedDimension === "#EACE3E" ? "5px solid #000000" : "none" 
            }}>
    <div className="d-flex justify-content-around align-items-around">
      <p className="m-0 titesize2">Skills</p>
      <p className="m-0 ps-lg-3 ps-xl-5 ps-md-5 ps-sm-3 ps-1 titesize2">{percentages["#EACE3E"].toFixed(0)}%</p>
    </div>
  </button>
</div>



<div className="border mt-3">

        <table className={`table table-bordered  `} style={{ display: `${show}` }}>
        <thead>
            <tr>
            {/* <th scope="col">{th}</th> */}
            <th style={{ backgroundColor: tableHeaderBackgroundColor,color: "#FFF" }} scope="col">Sl No.</th>
            {/* <th scope="col">Dimension</th> */}
            <th  style={{ backgroundColor: tableHeaderBackgroundColor,color: "#FFF" }} className="fixed-column " scope="col">Element</th>
            <th style={{ backgroundColor: tableHeaderBackgroundColor,color: "#FFF" }}  scope="col ">Ranging</th>
            <th style={{ backgroundColor: tableHeaderBackgroundColor ,color: "#FFF"}} scope="col">Element Percentage</th>
            <th style={{ backgroundColor: tableHeaderBackgroundColor ,color: "#FFF"}} scope="col" className="ee"> Total Percentage</th>
              
            </tr>
          </thead>
          <tbody>
          
          
         {itemList}
          
          </tbody>
        </table>
        </div>
        <div className="mt-5"> 
        <button
  type="button"
  className="btn btn-secondary"
  onClick={resetRanging} // Call the resetRanging function when the button is clicked
>
  Reset Ranging
</button>
        
        </div>
      </div>
    </div>
  );
};

export default PolarAreaTable;
