import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Link, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 3 }}>
      <Toolbar sx={{ background: "#fff", borderRadius: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Link component={RouterLink} to="/" underline="none">
            <Typography variant="h6" color="primary">
              AuthApp
            </Typography>
          </Link>
        </Box>
        {currentUser ? (
          <>
            <Typography sx={{ mr: 2 }}>Hello, {currentUser.name}</Typography>
            <Button onClick={() => navigate("/dashboard")} sx={{ mr: 1 }} variant="outlined">
              Dashboard
            </Button>
            {currentUser.role === "admin" && (
              <Button onClick={() => navigate("/admin")} sx={{ mr: 1 }} variant="contained">
                Admin
              </Button>
            )}
            <Button onClick={() => { logout(); navigate("/"); }} color="error">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button component={RouterLink} to="/login" sx={{ mr: 1 }}>
              Login
            </Button>
            <Button component={RouterLink} to="/register" variant="contained">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
