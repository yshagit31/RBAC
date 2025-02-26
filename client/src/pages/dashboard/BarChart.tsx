import React, { useContext, useState } from "react";
import Chart from "react-apexcharts";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ColorModeContext } from "../../contexts/color-mode";

interface ChartOptions {
  chart: {
    type: "bar";
    toolbar: {
      show: boolean
        },
  };
  xaxis:{
    categories:string[];
    labels:{
      style:{
        colors: string,
      }
    }
  };
  yaxis: {
    labels:{
      style:{
        colors: string,
      }
    }
  };
  colors: string[];
  plotOptions:{
    bar:{
      horizontal:boolean;
      borderRadius:number;
      columnWidth:string;
      distributed: boolean,
    };
  };
  dataLabels:{
    enabled:boolean;
  };
  grid: {
        show: boolean;
      };
      legend:{
        show:boolean;
      }
}

interface ChartProps{
userCounts:{[key:string]:number};
}

const BarChart: React.FC<ChartProps> = ({userCounts}) => {
 const {mode}=useContext(ColorModeContext)
  
  const uniqueYears=Array.from(
    new Set(Object.keys(userCounts).map((key)=>key.split(" ")[1]))  
  );
  // console.log("uniqueYears",uniqueYears);

  const [selectedYear,setSelectedYear]=useState<string> (
    uniqueYears.length> 0 ? uniqueYears[0] : new Date().getFullYear().toString()
);
  
  // console.log("selcetd tyear",selectedYear);
  // console.log(uniqueYears);

  const months= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 

  const categories=months.map((month)=>month);

  const data=categories.map((month)=> userCounts[`${month} ${selectedYear}`]||0);

  const series = [
    {
      name: "Users",
      data: data, 
      // data: [10,12,5], 
    },
  ];


  const options: ChartOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false, // Hides the three-dot menu
      },
    },
    xaxis: {
      categories: categories, 
      labels:{
        style:{
          colors: mode==="dark" ? "#ffffff":""
        }
      }
    },
    yaxis: {
      labels:{
        style:{
          colors: mode==="dark" ? "#ffffff":""
        }
      }
    },
    // colors: ["#3498db"], // Bar color
    // colors: ["#0056b3"], 
    // colors: ["#275be8"], 
    colors: ["#CFC8FF", "#475BE8"],

    plotOptions: {
      bar: {
        horizontal: false, // Vertical bars
        borderRadius: 5,
        columnWidth: "80%", 
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false, // Hide data labels
    },
    grid:{
      show:true,
    },
    legend:{
      show:false,
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedYear(event.target.value as string);
  };
  // console.log("data",data);


  return (
    // <div style={{display:"flex", marginLeft:"30px"}}>
    <div style={{display:"flex"}}>
    <div
    style={{
      backgroundColor: mode === "dark" ? "#1e1e1e" : "#f8f9fa",
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
       style={{ marginLeft:"60px", paddingLeft:"10px", display:"flex", flexDirection:"column" }}>
      <h3>Total Users Distribution</h3>
      <FormControl style={{maxWidth:120, marginLeft:"280px"}}>
        <InputLabel id="selected-year">Year</InputLabel>
        <Select
          labelId="selected-year"
          id="selected-year"
          value={selectedYear}
          label="Year"
          onChange={handleChange}
          sx={{
            borderColor: "#5F5E5E", // Change border color
            height: "36px", // Reduce height
          }}
        >
          {uniqueYears.map((year)=>(
            <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}

        </Select>
      </FormControl>
      </div>
      <Chart options={options} series={series} type="bar" width="520" />
    </div>
    <div style={{ backgroundColor:"#f8f9fa"}}>

    </div>
    </div>
  );
};

export default BarChart;