"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";

interface Expense {
  id: string;
  type: string;
  cost: number;
}

const ExpensesTable: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [form, setForm] = useState({ type: "", cost: 0 });

  const API_URL = "http://localhost:5000/expenses"; // Change this to your actual backend URL

  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(API_URL);
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Calculate total cost
  const totalCost = expenses.reduce((sum, expense) => sum + expense.cost, 0);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit (Add or Edit)
  const handleSubmit = async () => {
    try {
      if (editMode && selectedExpense) {
        await axios.put(`${API_URL}/${selectedExpense.id}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      fetchExpenses();
      handleClose();
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  // Open modal for Add/Edit
  const handleOpen = (expense?: Expense) => {
    if (expense) {
      setEditMode(true);
      setSelectedExpense(expense);
      setForm({ type: expense.type, cost: expense.cost });
    } else {
      setEditMode(false);
      setSelectedExpense(null);
      setForm({ type: "", cost: 0 });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedExpense(null);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
       FRUMOS Expenses Tracker
      </Typography>

      <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ marginBottom: 2 }}>
        Add Expense
      </Button>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Type</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Cost</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id} sx={{ "&:nth-of-type(even)": { backgroundColor: "#f5f5f5" } }}>
                <TableCell>{expense.type}</TableCell>
                <TableCell>${expense.cost.toFixed(2)}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button color="primary" onClick={() => handleOpen(expense)} sx={{ marginRight: 1 }}>
                    Edit
                  </Button>
                  <Button color="error" onClick={() => handleDelete(expense.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Total Cost Display */}
      <Box sx={{ marginTop: 2, textAlign: "right" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Total Cost: ${totalCost.toFixed(2)}
        </Typography>
      </Box>

      {/* Dialog for Add/Edit Expense */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? "Edit Expense" : "Add Expense"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="type"
            label="Expense Type"
            type="text"
            fullWidth
            value={form.type}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="cost"
            label="Cost"
            type="number"
            fullWidth
            value={form.cost}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            {editMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExpensesTable;
