import { Box, Paper } from "@mui/material";
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
    <Box p={2} m={2}>
      <Paper sx={{ width: 900 }}>
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
              <FileDownloadIcon fontSize="small" sx={{ mr: 1 }} />
              <h2>Export</h2>
            </div>
            <div className={styles.icon}>
              <LocalPrintshopOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
              <h2>Print</h2>
            </div>
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export default SingleAlertPageHeader;
