import React,{useState,useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createExpense } from "../api/api";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "../../public/ExpenseForm.css";
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

const ExpenseForm = ({expenses,setExpenses }) => {
    const [alert, setAlert] = React.useState(false);
    const [result, setResult] = useState(null);

  useEffect(() => {
    const storedResult = sessionStorage.getItem("loginResult");
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
  }, []);

    const validationSchema = Yup.object({
        amount: Yup.number()
            .min(1, "Amount must be greater than zero")
            .required("Amount is required"),
        category: Yup.string()
            .required("Category is required"),
        description: Yup.string()
            .required("Description is required")
    });

    const formik = useFormik({
        initialValues: {
            amount: "",
            category: "",
            description: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const savedExpense = await createExpense(values);
                setExpenses((prevExpenses) => [...prevExpenses, savedExpense]);
                setAlert(true);
                resetForm();
            } catch (err) {
                console.error("Error adding expense", err);
            }
        }
    });

    const handleAlert = () => {
        setAlert(!alert);
    };
   


    return (
        <div>
            {result && result.user ? (
        <Stack direction="row" spacing={1}>
          <Chip style={{marginTop:"8px",marginLeft:"10px"}} avatar={<Avatar>{result.user.username.charAt(0)}</Avatar>} label={result.user.username} />
        </Stack>
      ) : (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="warning">
            Please login to add expense
          </Alert>
        </Stack>
      )}
            {alert && (
                <div className='alert'>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert
                            severity="success"
                            action={
                                <Button color="inherit" size="small" onClick={handleAlert}>
                                    UNDO
                                </Button>
                            }
                        >
                            Your expense has been added
                        </Alert>
                    </Stack>
                </div>
            )}
            <div className="expense-form-container">
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        id="filled-basic"
                        label="Amount"
                        variant="filled"
                        type="number"
                        name="amount"
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.amount && Boolean(formik.errors.amount)}
                        helperText={formik.touched.amount && formik.errors.amount}
                    />
                    <TextField
                        id="filled-basic"
                        label="Category"
                        variant="filled"
                        type="text"
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.category && Boolean(formik.errors.category)}
                        helperText={formik.touched.category && formik.errors.category}
                    />
                    <TextField
                        id="filled-basic"
                        label="Description"
                        variant="filled"
                        type="text"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                    >
                        Add expense
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ExpenseForm;
