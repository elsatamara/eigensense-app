import { Box, Button, FormControl, Paper, TextField } from "@mui/material";
import React from "react";
import styles from "./PasswordTab.module.css";

const PasswordTab = () => {
  const [currentPassword, setCurrentPassword] = React.useState<string>("");
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = React.useState<string>("");

  const usersPassword = "apple";

  function hasLowerCase(str: string) {
    return /[a-z]/.test(str);
  }

  function hasUpperCase(str: string) {
    return /[A-Z]/.test(str);
  }

  function hasSpecialCharacter(str: string) {
    const allowedCharacters = /[~!@#$%^*-_=+[\]{}\/;:,.?]/;
    return allowedCharacters.test(str);
  }

  function hasNumericCharacter(str: string) {
    return /\d/.test(str);
  }

  function checkPasswordRequirement(str: string) {
    console.log(
      hasLowerCase(str),
      hasUpperCase(str),
      hasSpecialCharacter(str),
      hasNumericCharacter(str)
    );
    return (
      hasLowerCase(str) &&
      hasUpperCase(str) &&
      hasSpecialCharacter(str) &&
      hasNumericCharacter(str)
    );
  }

  return (
    <div className={styles.mainProfileTabContainer}>
      <div className={styles.passwordTabHeaderContainer}>Change Password</div>
      <FormControl>
        <div className={styles.passwordInputFieldContainer}>
          <h2>Current Password</h2>
          <TextField
            id="account-type"
            size="small"
            sx={{ width: "336px", m: 1 }}
            placeholder="Enter your password"
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
          />
        </div>
        <div className={styles.passwordInputFieldContainer}>
          <h2>New Password</h2>
          <TextField
            id="first-name"
            size="small"
            sx={{ width: "336px", m: 1 }}
            placeholder="Enter new password"
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {newPassword !== "" ? (
            <>
              <h2>
                <b>Password Requirements:</b>
                <li>At least 8 characters long</li>
                <li>
                  Must include: uppercase, lowercase, numeric, and special
                  characters
                </li>
                <li>
                  The allowed special characters are ~ ! @ # $ % ^ * - _ = + [ ]
                  &#123; &#125; / ; : , . ?
                </li>
              </h2>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.passwordInputFieldContainer}>
          <h2>Confirm Password</h2>
          <TextField
            id="email"
            size="small"
            sx={{ width: "336px", m: 1 }}
            placeholder="Confirm new password"
            type="password"
            onChange={(e) => setConfirmedPassword(e.target.value)}
          />
          {newPassword !== confirmedPassword ? (
            <>
              <h2>Password doesn't match</h2>
            </>
          ) : (
            <></>
          )}
        </div>
      </FormControl>
      <div>
        {newPassword === confirmedPassword &&
        currentPassword === usersPassword &&
        newPassword !== "" &&
        checkPasswordRequirement(newPassword) ? (
          <Button variant="contained" sx={{ ml: 75, mt: 6, mb: 15 }}>
            Update
          </Button>
        ) : (
          <Button variant="contained" sx={{ ml: 75, mt: 6, mb: 15 }} disabled>
            Update
          </Button>
        )}
      </div>
    </div>
  );
};

export default PasswordTab;
