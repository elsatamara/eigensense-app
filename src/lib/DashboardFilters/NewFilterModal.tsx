import { Box, Button, Modal, TextField } from "@mui/material";
import React from "react";
import {
  CustomFilterInterface,
  CustomFilterListInterface,
} from "../../interfaces/CustomFilterInterface";
import { submitCustomFilterAlertList } from "../../redux/actions/AlertListAction";
import {
  clearCustomFilterState,
  editCustomFilterDb,
  editCustomFilterRedux,
  saveCustomFilterDb,
  saveCustomFilterRedux,
} from "../../redux/actions/CustomFilterAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CalendarPicker from "../CalendarPicker/CalendarPicker";
import AlertTypeFilter from "./AlertTypeFilter";
import styles from "./AllFilters.module.css";
import FilterDropdown from "./FilterDropdown";

interface Props {
  onClose: () => void;
  isEditFilterModal?: boolean;
  filterToEdit?: string;
  filterNameToEdit?: string;
}

const NewFilterModal = ({
  onClose,
  isEditFilterModal,
  filterToEdit,
  filterNameToEdit,
}: Props) => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = React.useState(true);
  const handleClose = () => {
    setModalOpen(false);
    onClose();
  };

  const customFilterState: CustomFilterInterface = useAppSelector(
    (state) => state.customFilter
  );

  const customFilterListState: CustomFilterInterface[] = useAppSelector(
    (state) => state.customFilterList.customFilterList
  );

  const [newFilterName, setNewFilterName] = React.useState<string>(
    filterNameToEdit!
  );

  const handleSaveButton = () => {
    dispatch(submitCustomFilterAlertList(customFilterState));
    dispatch(
      saveCustomFilterDb({
        name: newFilterName,
        agent: customFilterState.agent,
        location: customFilterState.location,
        queue: customFilterState.queue,
        status: customFilterState.status,
        type: customFilterState.status,
        from: customFilterState.from,
        to: customFilterState.to,
      })
    );
    dispatch(
      saveCustomFilterRedux({
        name: newFilterName,
        agent: customFilterState.agent,
        location: customFilterState.location,
        queue: customFilterState.queue,
        status: customFilterState.status,
        type: customFilterState.status,
        from: customFilterState.from,
        to: customFilterState.to,
      })
    );
    dispatch(clearCustomFilterState());
    handleClose();
  };

  const handleEditButton = () => {
    const filterSelected: CustomFilterInterface | undefined =
      customFilterListState.find(
        (filter) => filter.customFilterId === filterToEdit
      )!;
    dispatch(
      editCustomFilterRedux({
        newName: newFilterName,
        customFilterId: filterSelected.customFilterId!,
      })
    );
    dispatch(
      editCustomFilterDb({
        name: newFilterName,
        agent: filterSelected.agent,
        location: filterSelected.location,
        queue: filterSelected.queue,
        status: filterSelected.status,
        type: filterSelected.status,
        from: filterSelected.from,
        to: filterSelected.to,
        customFilterId: filterSelected.customFilterId,
      })
    );
    dispatch(clearCustomFilterState());
    handleClose();
  };

  return (
    <Modal open={modalOpen} onClose={handleClose}>
      <Box className={styles.newFilterModal} sx={{ p: 3.5 }}>
        {!isEditFilterModal ? (
          <div className={styles.modalHeader}>Create Custom Filter</div>
        ) : (
          <div className={styles.modalHeader}>Edit Custom Filter</div>
        )}
        <hr></hr>
        <TextField
          id="new-filter-name"
          label="Filter name"
          placeholder="i.e, date+type+loc"
          size="small"
          sx={{ m: 2, width: "176px" }}
          required
          onChange={(e) => {
            setNewFilterName(e.target.value);
          }}
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
            onClick={
              isEditFilterModal
                ? () => {
                    handleEditButton();
                  }
                : () => {
                    handleSaveButton();
                  }
            }
          >
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default NewFilterModal;
