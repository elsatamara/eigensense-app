import { Box, Button, Paper } from "@mui/material";
import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import styles from "./SingleAlertPageHeader.module.css";
import CircleIcon from "@mui/icons-material/Circle";

interface Props {
  regulatorName: string;
  location: string;
}

const SingleAlertPageHeader = ({ regulatorName, location }: Props) => {
  return (
    // <Box p={2.7} width={1000} m={2.7} mb={0} pb={0.75}>
    <Box mx={1.5} p={1} pb={0.75}>
      <Paper sx={{ width: 996 }}>
        <div className={styles.headerContainer}>
          <div className={styles.headerBeginning}>
            <div className={styles.icon}>
              <CircleIcon fontSize="small" sx={{ color: "#0047AB", mr: 1 }} />
              <h2>{regulatorName}</h2>
            </div>
            <h2>{location}</h2>
          </div>
          <div className={styles.headerEnd}>
            <div className={styles.icon}>
              <Button
                startIcon={<FileDownloadIcon sx={{ color: "#414141" }} />}
              >
                <h2>Export</h2>
              </Button>
            </div>
            <div className={styles.icon}>
              <Button
                startIcon={
                  <LocalPrintshopOutlinedIcon sx={{ color: "#414141" }} />
                }
                onClick={() => {
                  window.print();
                }}
              >
                <h2>Print</h2>
              </Button>
            </div>
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export default SingleAlertPageHeader;
