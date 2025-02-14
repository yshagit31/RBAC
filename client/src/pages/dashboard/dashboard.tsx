// import React, { useEffect, useState } from 'react';
// import { People, Notifications, Assessment, CheckCircle } from "@mui/icons-material";
// import { Card, CardContent, Typography, Box } from "@mui/material";
// import useUsers from '../../UseUsers';
// import StatCard from './StatCard'
// import PeopleIcon from "@mui/icons-material/People";
// import PersonIcon from "@mui/icons-material/Person";
// import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
// import BusinessIcon from "@mui/icons-material/Business";
// import axios from "axios";

// interface IUser {
//   _id: string;
//   name: string;
//   email: string;
//   avatar: string;
//   lastLogin?: string;
//   createdAt?: string;
//   role?: string;
// }

// // const getStatusColor = (status: string) => {
// //   switch (status) {
// //     case 'Active':
// //       return 'bg-green-100 text-green-800';
// //     case 'Away':
// //       return 'bg-yellow-100 text-yellow-800';
// //     case 'Inactive':
// //       return 'bg-gray-100 text-gray-800';
// //     default:
// //       return 'bg-gray-100 text-gray-800';
// //   }
// // };

// // const getStatusDot = (isOnline: boolean) => {
// //   return isOnline ? 
// //     <span className="h-2.5 w-2.5 bg-green-500 rounded-full mr-2"></span> : 
// //     <span className="h-2.5 w-2.5 bg-gray-300 rounded-full mr-2"></span>;
// // };

// export const Dashboard = () => {


//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalAdmin, setTotalAdmin] = useState(0);
//   const [totalClient, setTotalClient] = useState(0);
//   const [totalactiveUsers, settotalActiveUsers] = useState(0);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:8000/api/v1/users");
//       const usersWithSno = response.data.map((user: IUser, index: number) => ({
//         ...user,
//         sno: index + 1,
//       }));
//       setUsers(usersWithSno);
//       setLoading(false);
//     } catch (err) {
//       setError("Error fetching users");
//       console.error("Error fetching users:", err);
//       setLoading(false);
//     }
//   };

//     let AdminCount=0;
//     let ClientCount=0,ActiveUser=0;
//       const calculateStats=()=>{
//         setTotalUsers(users?.length);
//         users.forEach((user: IUser ) => {
//             if(user?.role==="ADMIN")
//             {
//               AdminCount++;
//             }
//             else if(user?.role==="CLIENT")
//               {
//                 ClientCount++;
//               }
//               if(user.lastLogin)
//               {
//                 const Currentdate=new Date();
//                 const Logindate=new Date(user.lastLogin);
//                  const diffInMs=Currentdate.getTime()-Logindate.getTime();
//                  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
//                 if(diffInDays<=30)
//                 {
//                   ActiveUser++;
//                 }
//               }
           
//         });
//         setTotalAdmin(AdminCount);
//         setTotalClient(ClientCount);
//         settotalActiveUsers(ActiveUser);
//      }

//   useEffect(() => {
//     fetchUsers();
//     calculateStats();
//   },);

 
//   return (
//     <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "repeat(4, 1fr)" }} gap={3} mb={3}>
//     <StatCard title="Total Users" value={totalUsers} icon={PeopleIcon} color="blue" />
//     <StatCard title="Admins" value={totalAdmin} icon={AdminPanelSettingsIcon} color="orange" />
//     <StatCard title="Clients" value={totalClient} icon={BusinessIcon} color="purple" />
//     <StatCard title="Active Users" value={totalactiveUsers} icon={PersonIcon} color="green" />
//   </Box>
//   )
// }


import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Box } from "@mui/material";
import StatCard from './StatCard';
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BusinessIcon from "@mui/icons-material/Business";
import axios from "axios";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalClient, setTotalClient] = useState(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);
  const [monthlyUsers, setMonthlyUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/users");
        const usersData = response.data;
        setUsers(usersData);
        setTotalUsers(usersData.length);
        
        let adminCount = 0, clientCount = 0, activeUsers = 0;
        const newUserCounts = {};
        
        usersData.forEach(user => {
          if (user.role === "ADMIN") adminCount++;
          if (user.role === "CLIENT") clientCount++;
          
          if (user.createdAt) {
            const month = new Date(user.createdAt).toLocaleString('default', { month: 'short' });
            newUserCounts[month] = (newUserCounts[month] || 0) + 1;
          }

          if (user.lastLogin) {
            const currentDate = new Date();
            const loginDate = new Date(user.lastLogin);
            const diffDays = (currentDate - loginDate) / (1000 * 60 * 60 * 24);
            if (diffDays <= 30) activeUsers++;
          }
        });

        setTotalAdmin(adminCount);
        setTotalClient(clientCount);
        setTotalActiveUsers(activeUsers);
        
        setMonthlyUsers(Object.entries(newUserCounts).map(([month, count]) => ({ month, count })));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const roleData = [
    { name: "Admins", value: totalAdmin },
    { name: "Clients", value: totalClient },
    { name: "Others", value: totalUsers - totalAdmin - totalClient },
  ];

  return (
    <Box>
      <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "repeat(4, 1fr)" }} gap={3} mb={3}>
        <StatCard title="Total Users" value={totalUsers} icon={PeopleIcon} color="blue" />
        <StatCard title="Admins" value={totalAdmin} icon={AdminPanelSettingsIcon} color="orange" />
        <StatCard title="Clients" value={totalClient} icon={BusinessIcon} color="purple" />
        <StatCard title="Active Users" value={totalActiveUsers} icon={PersonIcon} color="green" />
      </Box>

      {/* Bar Chart for New Users per Month */}
      <Box mb={4}>
        <h3>New Users Per Month</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyUsers}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Pie Chart for User Role Distribution */}
      <Box>
        <h3>User Role Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={roleData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
              {roleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};
