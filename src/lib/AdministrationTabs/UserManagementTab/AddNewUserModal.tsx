import {
  Box,
  Button,
  FormControl,
  Menu,
  MenuItem,
  Modal,
  TextField,
} from "@mui/material";
import React from "react";
import styles from "./UserManagement.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface Props {
  onModalClose: () => void;
}

const UserTypeDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [endArrow, setEndArrow] = React.useState(<KeyboardArrowDownIcon />);
  const open = Boolean(anchorEl);
  const handleDropdownClick = (e: {
    currentTarget: React.SetStateAction<HTMLElement | null>;
  }) => {
    setAnchorEl(e.currentTarget);
    setEndArrow(<KeyboardArrowUpIcon />);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
    setEndArrow(<KeyboardArrowDownIcon />);
  };

  return (
    <>
      <Button
        onClick={(e) => handleDropdownClick(e)}
        endIcon={endArrow}
        variant="outlined"
        sx={{
          color: "#A1A1A1",
          m: 1,
          textTransform: "none",
          width: "177px",
          textAlign: "right",
        }}
      >
        Select user type
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleDropdownClose}>
        <MenuItem>Admin</MenuItem>
        <MenuItem>Lead</MenuItem>
      </Menu>
    </>
  );
};

const AccountCreatedModal = ({ onModalClose }: Props) => {
  const [modalOpen, setModalOpen] = React.useState(true);
  return (
    <Modal
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
      }}
    >
      <Box className={styles.addNewUserModal} sx={{ p: 3.5 }}>
        <div className={styles.modalHeader}>Account Created</div>
        <hr></hr>
        <div className={styles.modalText}>
          The account has been successfully created and an email to reset the
          password for the account has been sent to the user.
        </div>
        <Button
          sx={{
            m: 1,
            ml: 2,
            mt: 2,
            backgroundColor: "white",
            color: "#8A8C8F",
            border: 1,
            borderColor: "#8A8C8F",
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent",
            },
          }}
          variant="contained"
          disableElevation
          onClick={() => {
            setModalOpen(false);
            onModalClose();
          }}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

const AddNewUserModal = ({ onModalClose }: Props) => {
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [modalOpen, setModalOpen] = React.useState(true);
  const [confirmationModalOpen, setConfirmationModalOpen] =
    React.useState(false);

  const handleSaveButton = () => {
    setModalOpen(false);
    // onModalClose();
    setConfirmationModalOpen(true);
  };
  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <Box className={styles.addNewUserModal} sx={{ p: 3.5 }}>
          <div className={styles.modalHeader}>Add New User</div>
          <hr></hr>
          <FormControl sx={{ p: 2, pr: 0 }}>
            <div className={styles.inputFieldContainer}>
              <h2>Account Type</h2>
              <UserTypeDropdown />
            </div>
            <div className={styles.inputFieldContainer}>
              <h2>First Name</h2>
              <TextField
                id="first-name"
                size="small"
                sx={{ width: "177px", m: 1 }}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={styles.inputFieldContainer}>
              <h2>E-mail</h2>
              <TextField
                id="email"
                size="small"
                sx={{ width: "177px", m: 1 }}
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </FormControl>
          <FormControl sx={{ p: 2 }}>
            <div className={styles.inputFieldContainer}>
              <h2>User ID</h2>
              <TextField
                id="user-id"
                size="small"
                sx={{ width: "177px", m: 1 }}
                placeholder="User ID"
              />
            </div>
            <div className={styles.inputFieldContainer}>
              <h2>Last Name</h2>
              <TextField
                id="last-name"
                size="small"
                sx={{ width: "177px", m: 1 }}
                placeholder="Last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className={styles.inputFieldContainer}>
              <h2>Phone</h2>
              <TextField
                id="phone"
                size="small"
                sx={{ width: "177px", m: 1 }}
                placeholder="Phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </FormControl>
          <Button
            sx={{
              m: 1,
              ml: 2,
              mt: 2,
              backgroundColor: "white",
              color: "#8A8C8F",
              border: 1,
              borderColor: "#8A8C8F",
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
            }}
            variant="contained"
            disableElevation
            onClick={() => {
              setModalOpen(false);
              onModalClose();
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{ m: 1, mr: 3.5, mt: 2 }}
            variant="contained"
            disableElevation
            onClick={handleSaveButton}
          >
            Create Account
          </Button>
        </Box>
      </Modal>
      {confirmationModalOpen ? (
        <AccountCreatedModal onModalClose={onModalClose} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default AddNewUserModal;
