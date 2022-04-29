import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { AlertStatus } from "../../utils/AlertStatus";
import styles from "./AlertStatusObject.module.css";
import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAppDispatch } from "../../redux/hooks";
import {
  changeAlertStatus,
  changeAlertStatusDb,
} from "../../redux/actions/AlertListAction";
import ReassignModal from "../ReassignModal/ReassignModal";

interface Props {
  alertStatus: string;
  patternId: string[];
}

interface AlertStatusButtonDropdownProps {
  header: string;
  color: string;
  patternId: string[];
}

const AlertStatusButtonDropdown = ({
  header,
  color,
  patternId,
}: AlertStatusButtonDropdownProps) => {
  const [endArrow, setEndArrow] = React.useState(<KeyboardArrowDownIcon />);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleDropdownClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEndArrow(<KeyboardArrowUpIcon />);
    setAnchorEl(event.currentTarget);
  };
  const handleDropdownClose = () => {
    setAnchorEl(null);
    setEndArrow(<KeyboardArrowDownIcon />);
  };
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const handleMenuItemClick = (
    changeAction: AlertStatus,
    alertToChange: string[]
  ) => {
    dispatch(
      changeAlertStatus({
        changeAction: changeAction as AlertStatus,
        alertToChange: alertToChange,
      })
    );
    dispatch(
      changeAlertStatusDb({
        changeAction: changeAction as AlertStatus,
        alertToChange: alertToChange,
      })
    );
  };
  const [isModalOpen, setModalOpen] = React.useState(false);
  return (
    <div>
      <Button
        sx={{ color: color }}
        endIcon={endArrow}
        onClick={(e) => {
          handleDropdownClick(e);
        }}
      >
        <CircleIcon sx={{ color: color, mr: 1 }} fontSize="small" />
        {header}
      </Button>
      <Menu
        id="alert-status-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleDropdownClose}
      >
        <MenuItem
          onClick={(e) => {
            handleMenuItemClick(AlertStatus.Pending, patternId);
            handleDropdownClose();
          }}
        >
          Pending
        </MenuItem>
        <MenuItem
          onClick={() => {
            setModalOpen(true);
            handleDropdownClose();
          }}
        >
          Reassign
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuItemClick(AlertStatus.Supressed, patternId);
            handleDropdownClose();
          }}
        >
          Suppressed
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuItemClick(AlertStatus.Closed, patternId);
            handleDropdownClose();
          }}
        >
          Closed
        </MenuItem>
      </Menu>
      {isModalOpen ? (
        <ReassignModal
          onClose={() => {
            setModalOpen(false);
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

const AlertStatusObject = ({ alertStatus, patternId }: Props) => {
  if (alertStatus === AlertStatus.Pending) {
    return (
      <div className={styles.pendingIcon}>
        <AlertStatusButtonDropdown
          header="Pending"
          color="#00FF00"
          patternId={patternId}
        />
      </div>
    );
  } else if (alertStatus === AlertStatus.InReview) {
    return (
      <div className={styles.inreviewIcon}>
        <AlertStatusButtonDropdown
          header="Reassign"
          color="#0047AB"
          patternId={patternId}
        />
      </div>
    );
  } else if (alertStatus === AlertStatus.Closed) {
    return (
      <div className={styles.closedIcon}>
        <AlertStatusButtonDropdown
          header="Closed"
          color="#FF0000"
          patternId={patternId}
        />
      </div>
    );
  } else {
    return (
      <div className={styles.suppressedIcon}>
        <AlertStatusButtonDropdown
          header="Suppressed"
          color="#FFFF00"
          patternId={patternId}
        />
      </div>
    );
  }
};

export default AlertStatusObject;
