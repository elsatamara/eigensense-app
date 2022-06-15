import { Modal, Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LogoutModal.module.css";

interface Props {
  onClose: () => void;
}

const LogoutModal = ({ onClose }: Props) => {
  const [modalOpen, setModalOpen] = React.useState(true);
  const navigate = useNavigate();
  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <Box className={styles.logoutModal} sx={{ p: 3.5 }}>
        <div className={styles.modalHeader}>Log out?</div>
        <hr></hr>
        <div className={styles.logoutText}>
          <h3>Are you sure you want to log out from EigenSense ?</h3>
        </div>
        <div className={styles.customFilterModalButtons}>
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
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{ m: 1, mr: 3.5, mt: 2 }}
            variant="contained"
            disableElevation
            onClick={() => {
              navigate("/");
              onClose();
            }}
          >
            Confirm
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default LogoutModal;
