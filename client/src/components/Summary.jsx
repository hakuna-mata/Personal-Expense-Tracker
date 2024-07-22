import React from "react";
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Summary = ({ expenses }) => {
    const totalSpending = expenses.reduce((total, expense) => total + expense.amount, 0);

    const spendingByCategory = expenses.reduce((acc, expense) => {
        acc[expense.category] = acc[expense.category] ? acc[expense.category] + expense.amount : expense.amount;
        return acc;
    }, {});

    return (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Box mb={2}>
                <Typography variant="h6" component="h2">
                    Total Spending: Rs.{totalSpending}
                </Typography>
            </Box>
            <Box mt={3}>
                <Typography variant="h6" component="h3">
                    Spending by Category:
                </Typography>
                <List>
                    {Object.entries(spendingByCategory).map(([category, amount]) => (
                        <React.Fragment key={category}>
                            <ListItem>
                                <ListItemText primary={`${category}: Rs.${amount}`} />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Box>
        </Paper>
    );
};

export default Summary;
