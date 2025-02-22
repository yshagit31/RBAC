import { useContext } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { ColorModeContext } from "../../contexts/color-mode";

const StatCard = ({ title, value, icon: Icon, color }) => {
  const {mode}=useContext(ColorModeContext)
  return (
    <Card sx={{ boxShadow: "none", backgroundColor: "transparent" }}>
   <CardContent 
    sx={{ 
      backgroundColor: mode === "dark" ? "#1e1e1e" : "#f8f9fa",
      border: "none",  
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" ,
      borderRadius: "8px",
    }}
  >
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
