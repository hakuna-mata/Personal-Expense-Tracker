import React, { useState, useEffect } from "react";
import { fetchExpenses } from "../api/api";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import Summary from "./Summary";


const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const getExpenses = async () => {
            try {
                const expenses = await fetchExpenses();
                setExpenses(expenses);
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };
        getExpenses();
    }, []);

    return (
        <div>
            <ExpenseForm expenses={expenses} setExpenses={setExpenses} />
            <ExpenseList expenses={expenses} setExpenses={setExpenses} />
            <Summary expenses={expenses} />
        </div>
    );
};

export default Dashboard;
