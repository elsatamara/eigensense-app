import { Modal, Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../../LogoutModal/LogoutModal";
import styles from "./LogoutTab.module.css";

const LogoutTab = () => {
  const [isLogoutModalOpen, setLogoutModalOpen] = React.useState(true);
  return (
    <div>
      <div className={styles.clearDiv}></div>
      {isLogoutModalOpen ? (
        <LogoutModal
          onClose={() => {
            setLogoutModalOpen(false);
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default LogoutTab;
