import { Box, Paper, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function UserDashboard() {
  const { currentUser } = useAuth();

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Dashboard
      </Typography>
      <Box>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Welcome back, {currentUser?.name}.
        </Typography>
        {currentUser?.role === "user" && (
          <Typography variant="body2">This is your user area. Enjoy a clean and simple experience.</Typography>
        )}
        {currentUser?.role === "admin" && (
          <Typography variant="body2">You are an admin. Go to the Admin panel to manage users.</Typography>
        )}
      </Box>
    </Paper>
  );
}
