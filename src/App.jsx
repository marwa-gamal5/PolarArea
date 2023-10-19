import React, { useState } from 'react';
import './App.css';
import PolarAreaCustom from './components/PolarArea/PolarArea';
import PolarAreaTable from './components/PolarAreaTable/PolarAreaTable';
import Customize from './components/Customize/Customize';
import html2canvas from 'html2canvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome CSS her

import { PolarAreaDataModel } from './Model/PolarAreaDataModel'; 

function App() {
  let test = [
    {
      id: 0,
      label: 'Sectoral',
      backgroundColor: '#7BBDE5',
      value: 3
    },
    {
      id: 1,
      label: 'Market',
      backgroundColor: '#7BBDE5',
      value: 2
    },
    {
      id: 2,
      label: 'Organizational',
      backgroundColor: '#7BBDE5',
      value: 5
    },
    {
      id: 3,
      label: 'Operational',
      backgroundColor: '#7BBDE5',
      value:4
    },
    {
      id: 4,
      label: 'Microlevel',
      backgroundColor: '#7BBDE5',
      value: 1
    },
    {
      id: 5,
      label: 'Values-based leadership',
      backgroundColor: '#6BC98D',
      value: 3
    },
    {
      id: 6,
      label: 'Inspiring leadership',
      backgroundColor: '#6BC98D',
      value: 2
    },
    {
      id: 7,
      label: 'Visionary leadership',
      backgroundColor: '#6BC98D',
      value: 5
    },
    {
      id: 8,
      label: 'Progressive leadership',
      backgroundColor: '#6BC98D',
      value: 4
    },
    {
      id: 9,
      label: 'Emerging leadership',
      backgroundColor: '#6BC98D',
      value: 3
    },
    {
      id: 10,
      label: 'Directive',
      backgroundColor: '#E78686',
      value: 5
    },
    {
      id: 11,
      label: 'Supportive',
      backgroundColor: '#E78686',
      value: 4
    },
    {
      id: 12,
      label: 'Participative',
      backgroundColor: '#E78686',
      value: 2
    },
    {
      id: 13,
      label: 'Empowering',
      backgroundColor: '#E78686',
      value: 5
    },
    {
      id: 14,
      label: 'Adaptability',
      backgroundColor: '#E78686',
      value: 5
    },
    {
      id: 15,
      label: 'Master',
      backgroundColor: '#F3C74F',
      value: 4
    },
    {
      id: 16,
      label: 'Expert',
      backgroundColor: '#F3C74F',
      value: 3
    },
    {
      id: 17,
      label: 'Advance',
      backgroundColor: '#F3C74F',
      value: 3
    },
    {
      id: 18,
      label: 'intermediate',
      backgroundColor: '#F3C74F',
      value: 4
    },
    {
      id: 19,
      label: 'Basic',
      backgroundColor: '#F3C74F',
      value: 5
    }
  ];
  let [max, setMax] = useState(5);
  let [step, setStep] = useState(1);
  let [size, setSize] = useState(800);
  let [data, setData] = useState(test);

  let addItem = (item) => {
    setData([...data, item]);
  };

  let updateItem = (item) => {
    setData(data.map((el) => (el.id === item.id ? item : el)));
  };

  let deleteItem = (id) => {
    setData(data.filter((el) => el.id !== id));
  };

  let clear = () => {
    setData(
      data.map((item) => {
        item.value = 0;
        return item;
      })
    );
  };

  // let clearNames = () => {
  //   setData(
  //     data.map((item) => {
  //       item.label = '';
  //       return item;
  //     })
  //   );
  // };

  let print = () => {
    var container = document.getElementById('htmltoimage'); /* full page */
    if (container)
      html2canvas(container, { allowTaint: true, useCORS: true, logging: true }).then(function (canvas) {
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.download = 'balance_wheel.jpg';
        link.href = canvas.toDataURL('image/pdf');
        link.target = '_blank';
        link.click();
      });
  };
  // Define "Dimension" values
  const dimensionValues = [
    "Knowledge",
    "Leadership Performance",
    "Behaviors",
    "Skills",
  ];
    // Create a mapping function to determine "Dimension" value for each item
  const mapDimensionToItem = (index) => {
    const dimensionIndex = Math.floor(index / 5);
    return dimensionValues[dimensionIndex];
  };
// Initialize variables for each color
const colors = ["#7BBDE5", "#6BC98D", "#E78686", "#F3C74F"];
const percentages = {};
let number ;
  let counter ;
  const numberArray = [];

colors.forEach((color) => {
  number = 0;
  counter = 0;

  data.forEach((item) => {
    if (item.backgroundColor === color) {
      number += item.value;
      counter++;
    }
  });


  const total = max * counter;
  
  const percent = (number / total) * 100;
  console.log("percent" ,percent)
  numberArray.push(number); // Push the number value into the array
  // console.log(number)
  // console.log(percent)
  percentages[color] = percent;
});
// Calculate the total percentage

const totalPercentage = ((percentages["#7BBDE5"] + percentages["#6BC98D"] + percentages["#E78686"] + percentages["#F3C74F"]) / 400) * 100;

console.log("totalPercentage" ,totalPercentage)

// Calculate the total percentage
const calculatePercentageValue = (value) => {
  return (value / max) * 100;
};

data.forEach((item) => {
  item.percentageValue = calculatePercentageValue(item.value);
  // console.log("item.percentageValue= ",item.percentageValue)
});


  return (
    // <div className="App  row d-flex flex-column justify-content-between align-items-between  ">
    <div className="contener  ">
      
       <p className=" title font-weight-bold text-dark text-center fs-2 fs-sm-2 fs-xm-2 fs-md-1 fs-lg-1 fs-xl-1">Leadership Functional Index (LFI)</p>
    <div className="App  d-flex flex-column flex-lg-row flex-xl-row flex-md-column flex-sm-column justify-content-around align-items-center " >
    
    <div className=' ms-5 col-xl-5 col-lg-4 col-md-9 col-sm-6 col-6 ' >
      <div className="">
      <div id="htmltoimage">
        <PolarAreaCustom setSize={setSize} max={max} size={size} step={step} data={data} percentages={percentages} totalPercentage={totalPercentage} />
      </div>
      </div>
      </div>

<br>
</br>
<br>
</br>

      <div className="col-xl-6 col-lg-6 col-md-9 col-sm-11 col-11 ">
        <PolarAreaTable
          data={data}
          // tableName={["Dimension","Element","Base", "Dgree", "Color", "Edit", "Delete"]}
          tableName={["Dimension","Element", "Rateing","Element","Percentage "]}
          updateItem={updateItem}
          deleteItem={deleteItem}
          addItem={addItem}
          percentages={percentages} // Pass the percentages object as a prop
          totalPercentage={totalPercentage}
          numberArray ={numberArray}
        />
        </div>
       
        
        {/* <div className="">
        <Customize
          // clearNames={clearNames}
          setMax={setMax}
          setStep={setStep}
          clear={clear}
          print={print}
          max={max}
          size={size}
          step={step}
        />
      </div> */}
      </div>
      </div>
  );
}

export default App;
