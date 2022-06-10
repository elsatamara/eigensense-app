import React from "react";
import LoginImage from "./loginimage.png";
import Logo from "../../lib/HeaderBar/logo.png";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
} from "@mui/material";
import styles from "./LoginPage.module.css";
import { textTransform } from "@mui/system";
import { Translate } from "@mui/icons-material";

const LoginPage = () => {
  const [loginEmail, setLoginEmail] = React.useState<string>("");
  const [loginPassword, setLoginPassword] = React.useState<string>("");
  return (
    <div className={styles.parentContainer}>
      <div className={styles.leftColumn}>
        <Box
          component="img"
          sx={{
            height: 33,
            width: 150,
            top: "40px",
            left: "50px",
            zIndex: 1,
            position: "absolute",
          }}
          alt="Your logo."
          src={Logo}
        />
        {/* <img src={LoginImage} className={styles.bgImage} /> */}
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.loginBox}>
          <Box
            sx={{
              height: 500,
              width: 400,
            }}
          >
            <div className={styles.firstBlockLoginText}>
              <div>
                <div className={styles.loginText}>Login</div>
                <h1>Welcome to EigenSense!</h1>
                <h1>Login with your credentials below.</h1>
              </div>
            </div>
            <FormControl sx={{ p: 1.5 }}>
              <div className={styles.emailPasswordLoginHeader}>
                <h2>Your email</h2>
              </div>
              <TextField
                id="login-email"
                size="small"
                sx={{ width: "360px", m: 1 }}
                placeholder="Enter your email"
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <div className={styles.emailPasswordLoginHeader}>
                <h2>Password</h2>
              </div>
              <TextField
                id="login-password"
                size="small"
                sx={{ width: "360px", m: 1 }}
                placeholder="Enter your password"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </FormControl>
            <div className={styles.rememberMeRecoverPassword}>
              <FormControlLabel
                control={
                  <Checkbox sx={{ color: "#979797", borderColor: "black" }} />
                }
                sx={{ color: "#778CA2" }}
                label={<h2>Remember me</h2>}
              />
              <Button sx={{ textTransform: "none" }}>Recover Password</Button>
            </div>
            <div className={styles.signInButton}>
              <Button
                sx={{ width: "360px" }}
                variant="contained"
                disableElevation
              >
                Sign in
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
