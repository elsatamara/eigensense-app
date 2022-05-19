import { Menu, MenuItem, Button } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import styles from "./UserManagement.module.css";

interface AgentTypeStatusDropdownProps {
  isAgentTypeFilter?: boolean;
  isAgentStatusFilter?: boolean;
}

const AgentTypeStatusDropdownMenu = ({
  isAgentTypeFilter,
  isAgentStatusFilter,
}: AgentTypeStatusDropdownProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [endArrow, setEndArrow] = React.useState(<KeyboardArrowDownIcon />);
  const open = Boolean(anchorEl);

  const agentListState = useAppSelector((state) => state.agentList.agentList);

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
    <div className={styles.agentTypeStatusFilterContainer}>
      <div className={styles.agentTypeStatusFilterHeader}>
        {isAgentTypeFilter ? "USER TYPE" : "STATUS"}
      </div>
      <Button
        onClick={(e) => handleDropdownClick(e)}
        endIcon={endArrow}
        sx={{ color: "black", fontFamily: "Rubik" }}
      >
        All
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleDropdownClose}>
        {agentListState.map((agent) => {
          if (isAgentTypeFilter) {
            return <MenuItem>{agent.userType}</MenuItem>;
          } else {
            return <MenuItem>{agent.status}</MenuItem>;
          }
        })}
      </Menu>
    </div>
  );
};

export default AgentTypeStatusDropdownMenu;
