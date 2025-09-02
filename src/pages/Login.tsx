import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, TextField, Button, Typography, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (!form.email || !form.password) throw new Error("Complete all fields");
      const user = login(form);
      toast.success(`Welcome back, ${user.name}`);
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 520, margin: "0 auto" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
        <TextField name="email" label="Email" value={form.email} onChange={handleChange} />
        <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Box>
    </Paper>
  );
}
