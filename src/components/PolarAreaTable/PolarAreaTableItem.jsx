import React, { useState } from "react";

import './PolarAreaTable.css'
const PolarAreaTableItem = ({
  editItem,
  item,
  deleteItem,
  setIdEditMode,
  saveItem,
  cancelItem,
  percentages,
  totalPercentage,
  numberArray,
}) => {
  // Define the mapDimensionToItem function here
  const mapDimensionToItem = (index) => {
    const dimensionValues = [
      "Knowledge",
      "Leadership Performance",
      "Behaviors",
      "Skills",
    ];
    const dimensionIndex = Math.floor(index / 5);
    return dimensionValues[dimensionIndex];
  };

  const mapDimensionToColor = (dimension) => {
    switch (dimension) {
      case "Knowledge":
        return "#7BBDE5";
      case "Leadership Performance":
        return "#6BC98D";
      case "Behaviors":
        return "#E78686";
      case "Skills":
        return "#F3C74F";
      default:
        return "#FFFFFF"; // Default background color
    }
  };

  const [rating, setRating] = useState(item.value);
  const [dimensionColor, setDimensionColor] = useState(
    mapDimensionToColor(mapDimensionToItem(item.id))
  );

  const handleStarClick = (value) => {
    if (value === rating) {
      // Toggle the star state (filled or empty)
      value = 0;
    }
    setRating(value);

    // Update the item's value
    const updatedItem = { ...item, value: value };
    saveItem(updatedItem);
  };

  // Create an array of star icons with independent state
  const starIcons = [1, 2, 3, 4, 5].map((value) => (
    <i
      key={value}
      className={`fa-star ${rating >= value ? 'fas' : 'far'}`}
      data-rating={value}
      onClick={() => handleStarClick(value)}
      style={{ color: dimensionColor }}
      // style={{ color: "#FFD700" }}
    ></i>
  ));
  function getTooltipText(label) {
    switch (label) {

      // KNOWLEDGE
      case "Sectoral":
       
        return "Refers to specialized knowledge, insights, and understanding of a particular industry or sector .";
      case "Market":
        return "Refers to the knowledge of understanding of the dynamics, trends, competitors, and so on in the market.";
        case "Organizational":
       
        return "Refers to specialized knowledge, insights, and understanding of a particular industry or sector.";
      case "Operational":
            return "Refers to the knowledge of understanding of the dynamics, trends, competitors, and so on in the market.";
      case "Microlevel":
              return "Refers to the knowledge of understanding of the dynamics, trends, competitors, and so on in the market.";

      // LEADERSHIP PERFORMANCE
      case "Values-based leadership":
       
        return "Guiding individuals and teams through principles, ethics, and core valuess that drive decision-making and behaviour, fostering a culture of integrity and purpose-driven  actions.";
      case "Inspiring leadership":
        return "Motivating and guiding individuals through positive influence, empowering them to reach their full courage.";
        case "Visionary leadership":
       
        return "Inspire and guide individuals toward a shared future organizational vision, motivating them to exceed expectations and achieve ambitious goals in alignment with the corporate mission.";
      case "Progressive":
            return "Continuously adapts, innovates, and grows in response to changing environments,fostering sustainable development and positive impact.";
      case "Emerging leadership":
              return "Early stages of leadership development, where individuals are starting to exhibit leadership qualities.";
        

               // BEHAVIORS
      case "Directive":
       
      return "Leaders provide directions to employees.";
    case "Supportive":
      return "Leaders cooperate with employee’s initiatives.";
      case "Participative":
     
      return "Leaders involve and engage together with the employees.";
    case "Empowering":
          return "Leaders allow employees to lead with ownership and pride .";
    case "Adaptability":
            return "Leaders are acknowledging the current improved status of employees and accepting it with respect and joy.";

       // SKILLS
       case "Master":
       
       return "Represent a pinnacle level of mastery and proficiency in leadership, marked by exceptional wisdom, adaptability, and the capability to mentor, empower, and transcend individual achievements, shaping an enduring legacy of impactful leadership .";
     case "Expert":
       return "Highest level of leadership proficiency, characterized by a profound understanding of complex and multifaceted leadership concepts, strategic foresight, and the ability to inspire and influence at the highest level, consistently achieving exceptional results. ";
       case "Advance":
      
       return "Sophisticated competencies such as visionary thinking, change management, ethical decision-making, and fostering innovation, enabling them to drive transformative change . ";
     case "intermediate":
           return "More advanced abilities, including strategic thinking, conflict resolution, delegation, and adaptability, enhancing their capacity to guide and manage teams.";
     case "Basic":
             return "Fundamental abilities such as communication, teamwork, problem-solving, and decision-making.";
      
      default:
        return ""; 
    }
  }
  const groupIndex = Math.floor((item.id ) / 5); // Calculate the group index from item.id
  const columnIndex = (item.id ) % 5 + 1; // Calculate the column index within each group

  return (
    <>

    
    <tr>
      {editItem === item.id ? (
        <>
          {item.id % 5 === 0 ? (
            <th
            className=""
              rowSpan={5}
              style={{
                backgroundColor: dimensionColor,
              }}
            >
              {mapDimensionToItem(item.id)}
            </th>
          ) : null}

          {/* <td>{item.label}</td> */}
          <td>
            <div className="star-rating">{starIcons}</div>
          </td>

          {/* {item.id % 5 === 0 ? (
            <td rowSpan={5}>
              <div>{numberArray[item.id / 5]}</div>
            </td>
          ) : null} */}

          <td>{item.percentageValue.toFixed(0)}%</td>
        </>
      ) : (
        <>
         <th >{columnIndex}</th>
        
          {/* {item.id % 5 === 0 ? (
            <th
            className=""
              rowSpan={5}
              style={{
                backgroundColor: dimensionColor,
              }}
            >
              
              {mapDimensionToItem(item.id)} 
            </th>
          ) : null} */}

<td className="fixed-column" title={getTooltipText(item.label)}>
  {item.label}
</td>
          <td className="">
            <div className="star-rating">{starIcons}</div>
          </td>

          {/* {item.id % 5 === 0 ? (
            <td rowSpan={5}>
              <div>{numberArray[item.id / 5]}</div>
            </td>
          ) : null} */}

          <td className="">{item.percentageValue.toFixed(0)}%</td>
          {item.id % 5 === 0 ? (
            <td  className="fixed-column percentage-td" rowSpan={5}>
              <div>
                <strong>
                  {percentages[mapDimensionToColor(mapDimensionToItem(item.id))].toFixed(0)}%
                </strong>
              </div>
            </td>
          ) : null}
        </>

      )}
    </tr>
    
    </>
    
  );
};

export default PolarAreaTableItem;
