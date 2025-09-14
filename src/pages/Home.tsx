import { Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SplitText from "../components/SplitText";

export default function Home() {
  return (
    <Box sx={{ textAlign: "center", mt: 6 }}>
      <SplitText
        text="Welcome to AuthApp"
        className="text-3xl font-bold"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        tag="h2"
      />

      <p style={{ marginTop: "10px", marginBottom: "30px" }}>
        A simple user & admin demo with localStorage.
      </p>

      <Button
        component={RouterLink}
        to="/register"
        variant="contained"
        sx={{ mr: 1 }}
      >
        Create account
      </Button>
      <Button component={RouterLink} to="/login" variant="outlined">
        Login
      </Button>
    </Box>
  );
}