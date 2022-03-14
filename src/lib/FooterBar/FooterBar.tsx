import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import styles from "./FooterBar.module.css";

const FooterBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ top: "auto", bottom: 0, bgcolor: "#202c34" }}
    >
      <Toolbar>
        <div className={styles.footerText}>
          <h3>© 2021 EigenPatterns - All Rights Reserved</h3>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default FooterBar;
