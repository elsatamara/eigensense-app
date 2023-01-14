import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import styles from './FooterBar.module.css'

const FooterBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        bgcolor: "#202c34",
        height: "50px",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <div className={styles.footer}>
          <h4>© 2021 EigenPatterns - All Rights Reserved</h4>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default FooterBar;
