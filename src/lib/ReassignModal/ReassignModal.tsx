import { Modal, Box, Button } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import ChangeAlertStatusDropdown from "../AlertStatusFilter/ChangeAlertStatusDropdown";
import FilterDropdown from "../DashboardFilters/FilterDropdown";
import styles from "./ReassignModal.module.css";

interface Props {
  onClose: () => void;
}

const ReassignModal = ({ onClose }: Props) => {
  console.log("REACHED MODAL COMPONENT");
  const [modalOpen, setModalOpen] = React.useState(true);
  console.log(modalOpen);
  const agents: Set<string> = new Set();
  const alertListState = useAppSelector((state) => state.alertList.alerts);
  alertListState.forEach((elem) => {
    agents.add(elem.agentName);
  });
  return (
    <Modal
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
        onClose();
      }}
    >
      <Box className={styles.reassignFilterModal} sx={{ p: 3.5 }}>
        <div className={styles.reassignModalHeader}>Change alert status</div>
        <hr></hr>
        <ChangeAlertStatusDropdown />
        <FilterDropdown filters={agents} header={"Agent"} />
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
            onClick={() => {
              setModalOpen(false);
              onClose();
            }}
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

export default ReassignModal;
