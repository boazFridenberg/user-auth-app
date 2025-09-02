import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
  return (
    <Box sx={{ textAlign: "center", mt: 6 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to AuthApp
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        You can add to the app here!
      </Typography>
      <Button component={RouterLink} to="/register" variant="contained" sx={{ mr: 1 }}>
        Create account
      </Button>
      <Button component={RouterLink} to="/login" variant="outlined">
        Login
      </Button>
    </Box>
  );
}
