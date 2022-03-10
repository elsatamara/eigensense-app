import React from "react";
import Drawer from "@mui/material/Drawer";
import { List, ListItem } from "@mui/material";

const SideSearchBar = () => {
  return (
    <div>
      <Drawer variant="persistent" anchor="left" open={true}>
        <List>
          <ListItem>Search for patterns</ListItem>
          <ListItem>Table</ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default SideSearchBar;
