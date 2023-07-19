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

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const defaultTheme = createTheme();

const ForgotPass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serror, setSerror] = useState("");

  const handleCaptcha = (e) => {
    e.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      captcha: "",
    },
    validate,
    onSubmit: async (values) => {
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
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
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
            Reset Password
          </Typography>

          <form onSubmit={formik.handleSubmit}>
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

            <TextField
              margin="normal"
              required
              fullWidth
              label="captcha"
              id="captcha"
              name="captcha"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.captcha}
            />
            {formik.touched.captcha && formik.errors.captcha ? (
              <div>{formik.errors.captcha}</div>
            ) : null}

            <Grid container justifyContent={"space-around"}>
              {/* container makes Grid as flex container. so, Then I applied attribute of flexbox*/}
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleCaptcha}
              >
                Send
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset
              </Button>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  {"login"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
          {serror && <p>{serror}</p>}
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPass;

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
