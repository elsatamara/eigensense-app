import { Box, Button, OutlinedInput } from "@mui/material";
import React, { useEffect } from "react";
import styles from "./UserManagement.module.css";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import AgentTypeStatusDropdownMenu from "./AgentTypeStatusDropdownMenu";
import AgentListTable from "./AgentListTable";
import { getAgentList } from "../../../redux/actions/AgentActions";
import { useAppDispatch } from "../../../redux/hooks";
import AddNewUserModal from "./AddNewUserModal";

const UserManagementTab = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAgentList());
  }, []);

  const [isAddNewUserModalOpen, setAddNewUserModalOpen] =
    React.useState<boolean>(false);

  const onModalClose = () => {
    setAddNewUserModalOpen(false);
  };
  return (
    <div>
      <div className={styles.profileTabHeaderContainer}>
        User Management
        <Button
          startIcon={<AddIcon />}
          sx={{ ml: 78 }}
          onClick={() => {
            setAddNewUserModalOpen(true);
          }}
        >
          Add new user
        </Button>
      </div>

      <div className={styles.agentListContainer}>
        <AgentListTable />
      </div>
      <div className={styles.clearDiv}></div>
      {isAddNewUserModalOpen ? (
        <AddNewUserModal onModalClose={onModalClose} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserManagementTab;
