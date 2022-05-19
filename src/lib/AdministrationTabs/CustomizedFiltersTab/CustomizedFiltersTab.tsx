import { Button } from "@mui/material";
import React, { useEffect } from "react";
import styles from "./CustomizedFiltersTab.module.css";
import AddIcon from "@mui/icons-material/Add";
import CustomizedFiltersTable from "./CustomizedFiltersTable";
import { useAppDispatch } from "../../../redux/hooks";
import { getCustomFilterList } from "../../../redux/actions/CustomFilterAction";
import NewFilterModal from "../../DashboardFilters/NewFilterModal";

const CustomizedFiltersTab = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCustomFilterList());
  }, []);
  const [isCustomFilterModalOpen, setCustomFilterModalOpen] =
    React.useState(false);
  return (
    <div className={styles.customizedFilterTabContainer}>
      <div className={styles.customizedFiltersTabHeaderContainer}>
        Customized Filters
        <Button
          startIcon={<AddIcon />}
          sx={{ ml: 78 }}
          onClick={() => {
            setCustomFilterModalOpen(true);
          }}
        >
          Create New
        </Button>
      </div>
      <div>
        <CustomizedFiltersTable />
      </div>
      <div className={styles.clearDiv}></div>
      {isCustomFilterModalOpen ? (
        <NewFilterModal onClose={() => setCustomFilterModalOpen(false)} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CustomizedFiltersTab;
