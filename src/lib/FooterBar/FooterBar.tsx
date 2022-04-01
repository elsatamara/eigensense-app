import { AppBar, Toolbar } from "@mui/material";
import React from "react";

const FooterBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ top: "auto", bottom: 0, bgcolor: "#202c34" }}
    >
      <Toolbar>
        <div>
          <h4>© 2021 EigenPatterns - All Rights Reserved</h4>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default FooterBar;
