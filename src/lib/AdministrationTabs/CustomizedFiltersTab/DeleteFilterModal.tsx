import { Box, Button, Modal } from "@mui/material";
import React from "react";
import {
  deleteCustomFilter,
  deleteCustomFilterRedux,
} from "../../../redux/actions/CustomFilterAction";
import { useAppDispatch } from "../../../redux/hooks";
import styles from "./CustomizedFiltersTab.module.css";

interface Props {
  filterName: string;
  onClose: () => void;
}

const DeleteFilterModal = ({ filterName, onClose }: Props) => {
  const [modalOpen, setModalOpen] = React.useState(true);

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    setModalOpen(false);
    onClose();
  };

  const handleConfirmDelete = () => {
    dispatch(deleteCustomFilter(filterName));
    dispatch(deleteCustomFilterRedux(filterName));
    handleCloseModal();
  };

  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <Box className={styles.deleteFilterModal} sx={{ p: 3.5 }}>
        <div className={styles.modalHeader}>Delete Custom Filter?</div>
        <hr></hr>
        <div className={styles.deleteFilterText}>
          <h3>Are you sure you want to delete {filterName} ?</h3>
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
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            sx={{ m: 1, mr: 3.5, mt: 2 }}
            variant="contained"
            disableElevation
            onClick={handleConfirmDelete}
          >
            Confirm
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteFilterModal;
