import React, { useState } from "react";
import Chart from "react-apexcharts";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface RoleData {
  name: string;
  value: number;
}

interface PieChartProps {
  roleData: RoleData[];
}

  const PieChart:React.FC<PieChartProps>=({roleData})=>{

   const series=roleData.map((data)=>data.value);
  //  console.log("series",series);
   const labels = roleData.map((data) => data.name);

   const options = {
    chart: {
      type: "pie",
    },
    labels: labels,
    // colors: ["#3498db", "#1abc9c", "#f39c12"], 
    colors: ["#275be8", "#c4e8ef", "#455be8"], // Define custom colors
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
    },
  };



  return (
    <div style={{display:"flex"}}>
    <div
       style={{
        backgroundColor: "#f8f9fa",
        padding: "10px",
        borderRadius: "8px",
        height: "430px", // Adjusted height to match BarChart
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div 
       style={{ marginLeft:"60px", paddingLeft:"10px", display:"flex", flexDirection:"column" }}
       >
      <h3>User Roles Distribution</h3>
      
      </div>
      <Chart
       options={options}
       series={series} type="pie" width="500" height="360"  />
    </div>

    </div>
  );
};

export default PieChart;