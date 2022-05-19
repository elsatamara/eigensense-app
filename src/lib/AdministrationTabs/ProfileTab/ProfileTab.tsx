import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Switch,
  TextField,
} from "@mui/material";
import React from "react";
import styles from "./ProfileTab.module.css";
import { styled } from "@mui/material/styles";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  marginRight: 2,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const ProfileTab = () => {
  //NEED TO SET INITIAL STATE BASED ON DATA LOADED FROM DB
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [isTextNotification, setIsTextNotificaiton] =
    React.useState<boolean>(false);
  const [isEmailNotification, setIsEmailNotification] =
    React.useState<boolean>(false);

  return (
    <div className={styles.mainProfileTabContainer}>
      <div className={styles.profileTabHeaderContainer}>
        Personal Information
      </div>
      <FormControl>
        <div className={styles.inputFieldContainer}>
          <h2>Account Type</h2>
          <TextField
            id="account-type"
            size="small"
            sx={{ width: "336px", m: 1 }}
            label="Admin"
            disabled={true}
          />
        </div>
        <div className={styles.inputFieldContainer}>
          <h2>First Name</h2>
          <TextField
            id="first-name"
            size="small"
            sx={{ width: "336px", m: 1 }}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles.inputFieldContainer}>
          <h2>E-mail</h2>
          <TextField
            id="email"
            size="small"
            sx={{ width: "336px", m: 1 }}
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </FormControl>
      <FormControl>
        <div className={styles.inputFieldContainer}>
          <h2>User ID</h2>
          <TextField
            id="user-id"
            size="small"
            sx={{ width: "336px", m: 1 }}
            label="User ID"
            disabled={true}
          />
        </div>
        <div className={styles.inputFieldContainer}>
          <h2>Last Name</h2>
          <TextField
            id="last-name"
            size="small"
            sx={{ width: "336px", m: 1 }}
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={styles.inputFieldContainer}>
          <h2>Phone</h2>
          <TextField
            id="phone"
            size="small"
            sx={{ width: "336px", m: 1 }}
            placeholder="Phone number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </FormControl>
      <div className={styles.notifPreferenceContainer}>
        <h1>Notification Preferences</h1>
        <h2>Please send me notifications via: </h2>
        <FormGroup row>
          <FormControlLabel control={<AntSwitch />} label="SMS" sx={{ m: 1 }} />
          <FormControlLabel
            control={<AntSwitch />}
            label="E-mail"
            sx={{ m: 1 }}
          />
        </FormGroup>
      </div>
      <Button variant="contained" sx={{ ml: 36, mt: 3, mb: 5 }}>
        Update
      </Button>
    </div>
  );
};

export default ProfileTab;
