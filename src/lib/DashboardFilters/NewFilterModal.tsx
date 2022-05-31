import { Box, Button, Modal, TextField } from "@mui/material";
import React from "react";
import { CustomFilterInterface } from "../../interfaces/CustomFilterInterface";
import { submitCustomFilterAlertList } from "../../redux/actions/AlertListAction";
import {
  clearCustomFilterState,
  saveCustomFilterDb,
} from "../../redux/actions/CustomFilterAction";
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
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = React.useState(true);
  const handleClose = () => {
    setModalOpen(false);
    onClose();
  };

  const customFilterState: CustomFilterInterface = useAppSelector(
    (state) => state.customFilter
  );

  const handleSaveButton = () => {
    dispatch(submitCustomFilterAlertList(customFilterState));
    dispatch(saveCustomFilterDb(customFilterState));
    dispatch(clearCustomFilterState());
    handleClose();
  };
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
          <CalendarPicker isCustomFilter />
          <AlertTypeFilter />
        </div>
        <div className={styles.filterDropdownContainer}>
          <FilterDropdown header={"Location"} isCustomFilter />
          <FilterDropdown header={"Agent"} isCustomFilter />
        </div>
        <div className={styles.filterDropdownContainer}>
          <FilterDropdown header={"Queue"} isCustomFilter />
          <FilterDropdown header={"Status"} isCustomFilter />
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
            onClick={handleSaveButton}
          >
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default NewFilterModal;
