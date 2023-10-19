import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import style from "./PolarArea.module.css";
import { PolarAreaDataModel } from '../../Model/PolarAreaDataModel';
import ProgressBar from 'react-bootstrap/ProgressBar';
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Title);

function PolarAreaCustom({ data, max, step, size, setSize, percentages, totalPercentage }) {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [backgroundColors, setBackgroundColors] = useState([]);
  const ref = useRef();

  const label = {
    "#1565c0": "Knowledge",
    "#70AD47": "Leadership Performance",
    "#C00000": "Behaviors",
    "#FFC000": "Skills",
  };

  const check = () => {
    if (ref.current) {
      setSizeValue(ref.current.width, ref.current.height);
    }
  };

  const resize = (e) => {
    setSizeValue(e.target.innerWidth, e.target.innerHeight);
  };

  const setSizeValue = (width, height) => {
    const newSize = width <= height ? width : height;
    setSize(newSize);
  };

  const sizeByBreakpoint = (width) => {
    if (width >= 1200) {
      return 692;
    } else if (width >= 992) {
      return 500;
    } else if (width >= 768) {
      return 700;
    } else if (width >= 576) {
      return 500;
    } else {
      return 400;
    }
  };

  useEffect(() => {
    const label = [];
    const value = [];
    const backgroundColor = [];

    data.forEach((el) => {
      label.push(el.label);
      value.push(el.value);
      backgroundColor.push(converHERtoRGBA(el.backgroundColor));
    });

    setLabels(label);
    setValues(value);
    setBackgroundColors(backgroundColor);

    window.addEventListener('resize', (e) => {
      resize(e);
    });

    const fixedSize = sizeByBreakpoint(window.innerWidth);

    check();

    return () => {
      window.removeEventListener('resize', (e) => {
        resize(e);
      });
    };
  }, [data]);

  const converHERtoRGBA = (hex) => {
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      const c = hex.substring(1).split('');
      if (c.length === 3) {
        c.push(c[0], c[1], c[2]);
      }
      const cHex = '0x' + c.join('');
      return 'rgba(' + [(cHex >> 16) & 255, (cHex >> 8) & 255, cHex & 255].join(',') + ',0.90)';
    }

    throw new Error('Bad Hex');
  };

  const dataPolarArea = {
    labels: labels,
    datasets: [
      {
        label: '#',
        data: values,
        backgroundColor: backgroundColors,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: max,
        angleLines: {
          display: true,
          color: "#000"
        },
        ticks: {
          stepSize: step,
          font: {
            size:22
          },
          backdropPadding: 0
        },
        grid: {
          circular: true,
          color: "#000",
          lineWidth: 1,
        },
        pointLabels: {
          display: true,
          centerPointLabels: true,
          font: {
            size: getSizeByScreen()
          },
          padding: 0
        },
      },
    },
  };
// Function to determine pointLabel font size based on screen size
function getSizeByScreen() {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1200) {
    return 12; // Extra Large (xl) screens
  } else if (screenWidth >= 992) {
    return 11; // Large (lg) screens
  } else if (screenWidth >= 768) {
    return 11; // Medium (md) screens
  } else if (screenWidth >= 576) {
    return 8; // Small (sm) screens
  } else {
    return 8; // Extra Small (xs) screens
  }
}
  const fixedSize = sizeByBreakpoint(window.innerWidth);

  const styleSize = {
    width: fixedSize + 'px',
    height: fixedSize + 'px',
  };

  const now = totalPercentage;
  let resultText;
  if (totalPercentage >= 0 && totalPercentage <= 59) {
    resultText = "Poor";
  } else if (totalPercentage >= 60 && totalPercentage <= 69) {
    resultText = "Average";
  } else if (totalPercentage >= 70 && totalPercentage <= 79) {
    resultText = "Good";
  } else if (totalPercentage >= 80 && totalPercentage <= 89) {
    resultText = "Excellent";
  } else if (totalPercentage >= 90 && totalPercentage <= 100) {
    resultText = "Brilliant";
  }


  return (
    <>
    
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <div style={styleSize}>
          <PolarArea ref={ref}  className={style.sheme} data={dataPolarArea} options={options} />
        </div>

        
  <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-2'>
          <ProgressBar className='bg-secondary' variant="dark" now={now} label={`${now}%`} />
          

        </div>
        
        <p className={ style.resultText }>{resultText}</p>
      </div>
    </>
  );
}

export default PolarAreaCustom;
