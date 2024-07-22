import React, { useState } from "react";
import { registerUser } from "../api/api.js";
import "../../public/Register.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { loginUser } from '../api/api';

const Register = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState(null);

    const signupSchema = Yup.object({
        username: Yup.string().required("Enter username"),
        password: Yup.string().min(5, "Password must be at least 5 characters").required("Enter a strong password"),
        email: Yup.string().email("Enter a valid email").required("Enter email")
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            email: ""
        },
        validationSchema: signupSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await registerUser(values);
                const result = await loginUser(values);
                sessionStorage.setItem("loginResult", JSON.stringify(result));
                setAlert(true);
                setSubmitting(false);
                navigate("/dashboard");
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message;
                setError("Signup failed: " + errorMessage);
                setSubmitting(false);
            }
        }
    });

    const handleAlert = () => {
        setAlert(false);
    };

    return (
        <div className="register-container">
            <h3>Signup form</h3>
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
                            New user registered successfully
                        </Alert>
                    </Stack>
                </div>
            )}
            <form className="register-form" onSubmit={formik.handleSubmit}>
                <TextField
                    id="outlined-username"
                    label="Username"
                    variant="outlined"
                    type="text"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                    id="outlined-email"
                    label="Email"
                    variant="outlined"
                    type="text"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    id="outlined-password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    disabled={formik.isSubmitting}
                >
                    Register
                </Button>
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
};

export default Register;
