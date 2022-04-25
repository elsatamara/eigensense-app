import { Box, Button, Modal, TextField } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CalendarPicker from "../CalendarPicker/CalendarPicker";
import AlertTypeFilter from "./AlertTypeFilter";
import styles from "./AllFilters.module.css";
import FilterDropdown from "./FilterDropdown";

const AlertStatusDropdown = () => {
  return (
    <form>
      <select>
        <option>Alert Status</option>
      </select>
    </form>
  );
};

interface Props {
  onClose: () => void;
}

const NewFilterModal = ({ onClose }: Props) => {
  const alertListState = useAppSelector((state) => state.alertList.alerts);
  const dispatch = useAppDispatch();
  const locations: Set<string> = new Set();
  const regulators: Set<string> = new Set();
  const agents: Set<string> = new Set();
  const alertQueues: Set<string> = new Set();
  const [modalOpen, setModalOpen] = React.useState(true);
  const handleClose = () => {
    setModalOpen(false);
    onClose();
  };
  alertListState.forEach((elem) => {
    locations.add(elem.location);
    regulators.add(elem.regulator);
    agents.add(elem.agentName);
    alertQueues.add(elem.alertQueue);
  });

  const handleSaveButton = () => {};
  return (
    <Modal open={modalOpen} onClose={handleClose}>
      <Box className={styles.newFilterModal} sx={{ p: 3.5 }}>
        <div className={styles.modalHeader}>Create Custom Filter</div>
        <hr></hr>
        <TextField
          id="new-filter-name"
          label="Filter name"
          placeholder="i.e, date+type+loc"
          size="small"
          sx={{ m: 2, width: "176px" }}
          required
        />
        <div className={styles.filterDropdownContainer}>
          <CalendarPicker />
          <AlertTypeFilter />
        </div>
        <div className={styles.filterDropdownContainer}>
          <FilterDropdown filters={locations} header={"Location"} />
          <FilterDropdown filters={agents} header={"Agent"} />
        </div>
        <div className={styles.filterDropdownContainer}>
          <FilterDropdown filters={alertQueues} header={"Alert Queue"} />
          <FilterDropdown filters={alertQueues} header={"Alert Status"} />
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
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sx={{ m: 1, mr: 3.5, mt: 2 }}
            variant="contained"
            disableElevation
          >
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default NewFilterModal;
