import React, { useEffect, useState } from "react";
import { deleteExpense } from "../api/api";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Divider from '@mui/material/Divider';
import { Tooltip } from "@mui/material";
import Zoom from '@mui/material/Zoom';

const ExpenseList = ({ expenses, setExpenses }) => {

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== id));
    } catch (err) {
      console.error("Error deleting expense", err);
    }
  };

  return (
    <div>
      <List>
        {expenses.map((expense) => (
          <div key={expense._id}>
            <ListItem>
              <ListItemText
                primary={`${new Date(expense.date).toLocaleTimeString()} - ${new Date(expense.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
                secondary={`Rs.${expense.amount} - ${expense.category} - ${expense.description}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(expense._id)}>
                <Tooltip TransitionComponent={Zoom} title="Delete">
                  <DeleteIcon color="warning"/>
                  </Tooltip>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};

export default ExpenseList;
