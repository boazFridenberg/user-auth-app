import { useState } from "react";
import {
  Paper, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent,
  TextField, DialogActions, Button, MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import type { User } from "../types";

export default function AdminPanel() {
  const { users, updateUser, deleteUser } = useAuth();
  const [editing, setEditing] = useState<User | null>(null);

  function handleSave() {
    if (!editing?.name || !editing?.email) {
      toast.error("Name and email required");
      return;
    }
    updateUser(editing);
    toast.success("Saved");
    setEditing(null);
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Admin — Users
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Joined</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>{new Date(u.createdAt).toLocaleString()}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => setEditing(u)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => { if (confirm("Delete user?")) { deleteUser(u.id); toast.success("Deleted"); } }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!editing} onClose={() => setEditing(null)}>
        <DialogTitle>Edit user</DialogTitle>
        <DialogContent sx={{ display: "grid", gap: 2, width: 400, mt: 1 }}>
          <TextField
            label="Name"
            value={editing?.name || ""}
            onChange={(e) => setEditing((prev) => prev && { ...prev, name: e.target.value })}
          />
          <TextField
            label="Email"
            value={editing?.email || ""}
            onChange={(e) => setEditing((prev) => prev && { ...prev, email: e.target.value })}
          />
          <TextField
            select
            label="Role"
            value={editing?.role || "user"}
            onChange={(e) => setEditing((prev) => prev && { ...prev, role: e.target.value as "user" | "admin" })}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditing(null)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
