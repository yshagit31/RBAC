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
