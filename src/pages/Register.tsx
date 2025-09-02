import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, TextField, Button, Paper, Typography, Radio, RadioGroup,
  FormControlLabel, FormControl
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (!form.name || !form.email || !form.password) throw new Error("Complete all fields");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      register(form as any);
      toast.success("Registered and logged in");
      navigate("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    }
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 520, margin: "0 auto" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Create an account
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
        <TextField name="name" label="Full name" value={form.name} onChange={handleChange} />
        <TextField name="email" label="Email" value={form.email} onChange={handleChange} />
        <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} />
        <FormControl>
          <Typography sx={{ mb: 1 }}>Role</Typography>
          <RadioGroup row name="role" value={form.role} onChange={handleChange}>
            <FormControlLabel value="user" control={<Radio />} label="User" />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          </RadioGroup>
        </FormControl>
        <Button type="submit" variant="contained">
          Register
        </Button>
      </Box>
    </Paper>
  );
}
