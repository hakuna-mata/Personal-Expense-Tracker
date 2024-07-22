import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { loginUser } from '../api/api';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import '../../public/Login.css';
import{useNavigate} from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(null);

  const loginSchema = Yup.object({
    username: Yup.string().required("Please enter the username"),
    password: Yup.string().required("Please enter your password"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const result = await loginUser(values);
        setAlert(true);
        setSubmitting(false);
        sessionStorage.setItem("loginResult",JSON.stringify(result))
        navigate("/dashboard")
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error('Login failed:', errorMessage);
        setError('Login failed: ' + errorMessage);
        setSubmitting(false);
      }
    },
  });

  const handleAlert = () => {
    setAlert(false);
  };

  return (
    <div className="login-container">
      <h3>Login form</h3>
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
              User logged in successfully
            </Alert>
          </Stack>
        </div>
      )}
      <form className="login-form" onSubmit={formik.handleSubmit}>
        <TextField
          id="outlined-username"
          label="Username"
          variant="outlined"
          type="text"
          name="username"
          value={formik.values.username}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          id="outlined-password"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button variant="contained" color="success" type="submit" disabled={formik.isSubmitting}>
          Login
        </Button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
