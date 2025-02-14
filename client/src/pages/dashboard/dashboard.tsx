import React, { useEffect, useState } from 'react';
import {
  Dashboard as LayoutDashboard,
  People as Users,
  Settings,
  Notifications as Bell,
  Search,
  AccountCircle as UserCircle,
  BarChart as BarChart3,
  Security as Shield,
  Chat as MessageSquare,
  Description as FileText,
  Delete as Trash2,
  Edit,
  Visibility as Eye,
  Add as Plus,
  FilterList as Filter,
  FileDownload as Download,
  Send,
  Email as Mail,
  Lock,
  AccessTime as Clock,
} from '@mui/icons-material';

import { People, Notifications, Assessment, CheckCircle } from "@mui/icons-material";
import { Card, CardContent, Typography, Box } from "@mui/material";
import useUsers from '../../UseUsers';
import StatCard from './StatCard'
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BusinessIcon from "@mui/icons-material/Business";

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800';
    case 'Away':
      return 'bg-yellow-100 text-yellow-800';
    case 'Inactive':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusDot = (isOnline: boolean) => {
  return isOnline ? 
    <span className="h-2.5 w-2.5 bg-green-500 rounded-full mr-2"></span> : 
    <span className="h-2.5 w-2.5 bg-gray-300 rounded-full mr-2"></span>;
};

export const Dashboard = () => {

  // const [users,loading,error,fetchUsers]=useUsers();
  const users=useUsers();

  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [reports, setReports] = useState(0);


  useEffect(()=>{
    const calculateStats=()=>{
      console.log("Length", setTotalUsers(state.users?.length));
     }
     calculateStats();
  },[])
 

  return (
    <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "repeat(4, 1fr)" }} gap={3} mb={3}>
    <StatCard title="Total Users" value={totalUsers} icon={PeopleIcon} color="blue" />
    <StatCard title="Admins" value={unreadNotifications} icon={AdminPanelSettingsIcon} color="orange" />
    <StatCard title="Clients" value={reports} icon={BusinessIcon} color="purple" />
    <StatCard title="Active Users" value={activeUsers} icon={PersonIcon} color="green" />
  </Box>
  )
}


