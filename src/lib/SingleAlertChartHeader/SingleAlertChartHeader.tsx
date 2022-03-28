import { Tab } from "@headlessui/react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import styles from "./SingleAlertChartHeader.module.css";

interface Props {
  alertType: string;
  keyAttributes: string;
  date: Date;
}

const SingleAlertChartHeader = ({ alertType, keyAttributes, date }: Props) => {
  const headers = ["Alert Type", "Key Attributes", "Date", "Time", "Agent"];
  const row = [
    alertType,
    keyAttributes,
    date.toString().slice(0, 10),
    date.toTimeString().slice(0, 5),
    "Agent",
  ];
  return (
    <Box sx={{ m: 2.7, mt: 0 }}>
      <Paper
        sx={{
          width: 996,
          height: 117,
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <Table sx={{ mr: 3, ml: 2 }}>
          <TableHead>
            <TableRow>
              {headers.map((header) => {
                return (
                  <TableCell sx={{ borderBottom: "none", pt: 3.75, pb: 0.25 }}>
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {row.map((r) => {
                return (
                  <TableCell sx={{ borderBottom: "none", pt: 0.25, pb: 3.75 }}>
                    {r}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
        <Button variant="contained" sx={{ height: 34, width: 300, m: 5 }}>
          Run Similar Search
        </Button>
        {/* </div> */}
      </Paper>
    </Box>
  );
};

export default SingleAlertChartHeader;
