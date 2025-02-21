import { Card, CardContent, Typography, Box } from "@mui/material";

const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle2" color="textSecondary">{title}</Typography>
          <Icon sx={{ color }} />
        </Box>
        <Typography variant="h5" fontWeight="bold">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;


// import React, { useState } from "react";
// import Chart from "react-apexcharts";
// import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

// interface ChartOptions {
//   chart: {
//     type: string;
//   };
//   xaxis: {
//     categories: string[];
//   };
//   colors: string[];
//   plotOptions: {
//     bar: {
//       horizontal: boolean;
//       borderRadius: number;
//       columnWidth: string;
//     };
//   };
//   dataLabels: {
//     enabled: boolean;
//   };
//   grid: {
//     show: boolean;
//   };
// }

// interface ChartProps {
//   userCounts: { [key: string]: number }; // Data in { "Jan 2024": 50, "Feb 2024": 70, ... }
// }

// const PieChart: React.FC<ChartProps> = ({ userCounts }) => {
//   const [selectedYear, setSelectedYear] = useState<string>(() => {
//     return new Date().getFullYear().toString();
//   });

//   // Extract unique years
//   const uniqueYears = Array.from(
//     new Set(Object.keys(userCounts).map((key) => key.split(" ")[1]))
//   );

//   const months = ["Jan", "Feb"];

//   // Generate categories for selected year (without showing the year)
//   const categories = months.map((month) => month);

//   // Generate data array for chart
//   const data = categories.map((month) => userCounts[`${month} ${selectedYear}`] || 0);

//   const series = [
//     {
//       name: "Users",
//       data: data,
//     },
//   ];

//   const options: ChartOptions = {
//     chart: {
//       type: "bar",
//     },
//     xaxis: {
//       categories: categories,
//     },
//     colors: ["#3498db"],
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         borderRadius: 5,
//         columnWidth: "50%", // Adjust bar width
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     grid: {
//       show: false, // Removes extra grid lines
//     },
//   };

//   return (
//     <div style={{ textAlign: "center", maxWidth: "800px", margin: "auto" }}>
//       <h2>Total Users Distribution</h2>
//       <FormControl style={{ minWidth: 120, marginBottom: "20px" }}>
//         <InputLabel>Select Year</InputLabel>
//         <Select
//           value={selectedYear}
//           onChange={(e) => setSelectedYear(e.target.value)}
//           variant="outlined"
//         >
//           {uniqueYears.map((year) => (
//             <MenuItem key={year} value={year}>
//               {year}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <Chart options={options} series={series} type="bar" width="800" />
//     </div>
//   );
// };

// export default PieChart;

