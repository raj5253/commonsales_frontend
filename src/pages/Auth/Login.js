import { useFormik } from "formik";
import * as React from "react";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authActions } from "../../store/authSlice";
import { cartActions } from "../../store/cartSlice";

// import styles from "./Login.module.css";

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length > 20) {
    errors.password = "wrong password";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const defaultTheme = createTheme();

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serror, setSerror] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      // dispatch(makeLoginCall(values));
      setSerror("");

      const BASE_URL = process.env.REACT_APP_SERVER_URL;

      const res = await fetch(`${BASE_URL}/login`, {
        headers: {
          "content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      console.log(data);

      if (data.status === "error") {
        setSerror(data.mssg);
      } else {
        localStorage.removeItem("cart"); //for clearing old cart if any
        dispatch(
          cartActions.replaceData({
            items: [],
            totalPrice: 0,
            totalQuantity: 0,
          })
        ); //for clearing old cart if any

        localStorage.setItem("token", data.user); //<------- this thing ie data.user is actualy a token received from server
        dispatch(authActions.login(data.user));
        dispatch(authActions.setAdmim(data.isAdmin)); //<-- depends on value of isAdmin received
        localStorage.setItem("isAdmin", data.isAdmin);
        navigate("/profile");
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <div className={styles.loginContianer}> */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Log in
          </Typography>

          {/* <Box
            component="form" */}
          <form
            onSubmit={formik.handleSubmit}
            // sx={{ mt: 1 }}
            // className={styles.form}
          >
            {/* <label htmlFor="email">Email</label> */}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}

            {/* <label htmlFor="password">Password</label> */}
            <TextField
              margin="normal"
              required
              fullWidth
              label="password"
              id="password"
              name="password"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="/forgotPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
          {/* </Box> */}
          {serror && (
            <p style={{ color: "red", fontStyle: "oblique" }}>{serror}</p>
          )}
          <Copyright sx={{ mt: 8, mb: 4 }} />
          {/* </div> */}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright ©"}
      <Link color="inherit" href="https://mui.com/">
        CommonShop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// const token = localStorage.getItem("token");
// if (token) {
//   const user = jwt.decode(token);
//   if (!user) {
//     localStorage.removeItem("token");
//      <Navigate to="/login"/>
//   }
// }

// const req = await fetch("url", {
//   headers: {
//     "x-access-token": localStorage.getItem("token"),
//   },
// });
