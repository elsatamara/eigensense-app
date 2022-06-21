import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React from "react";
import { SimilarPatternInterface } from "../../interfaces/SimilarPatternInterface";

interface Props {
  currentPatternSelected: SimilarPatternInterface;
}

const CompareAlertChartHeader = ({ currentPatternSelected }: Props) => {
  const headers = [
    "Regulator",
    "Location",
    "Alert Type",
    "Key Attribute",
    "Date",
    "Time",
    "Agent",
  ];
  const row = [
    currentPatternSelected?.regulator,
    currentPatternSelected?.location,
    currentPatternSelected?.alertType,
    currentPatternSelected?.keyAttribute,
    currentPatternSelected?.date?.toString().slice(0, 10),
    currentPatternSelected?.startTime?.toString().slice(11, 16),
    currentPatternSelected?.agent,
  ];
  return (
    <Box sx={{ m: 1 }}>
      <Paper
        sx={{
          width: 925,
          height: 100,
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
        }}
        elevation={1}
      >
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => {
                return (
                  <TableCell sx={{ borderBottom: "none", pt: 3.75, pb: 0.25 }}>
                    <h3>{header}</h3>
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
                    <h3>{r}</h3>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default CompareAlertChartHeader;
