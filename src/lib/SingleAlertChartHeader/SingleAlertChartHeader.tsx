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

interface Props {
  alertType: string;
  keyAttributes: string;
  date: Date;
  runSimilarSearch: () => void;
}

const SingleAlertChartHeader = ({
  alertType,
  keyAttributes,
  date,
  runSimilarSearch,
}: Props) => {
  const headers = ["Alert Type", "Key Attributes", "Date", "Time", "Agent"];
  const row = [
    alertType,
    keyAttributes,
    date.toString().slice(0, 10),
    date.toTimeString().slice(0, 5),
    "Agent",
  ];
  const [isRunSimilarSearchOpen, setIsRunSimilarSearchOpen] =
    React.useState<boolean>(false);
  return (
    <Box sx={{ mx: 1.5, p: 1, mt: 0, pt: 0, pb: 0.5 }}>
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
            <TableRow key={"singleAlertChartHeaderTableHeader"}>
              {headers.map((header) => {
                return (
                  <TableCell
                    key={header}
                    sx={{ borderBottom: "none", pt: 3.75, pb: 0.25 }}
                  >
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
                  <TableCell
                    key={r}
                    sx={{ borderBottom: "none", pt: 0.25, pb: 3.75 }}
                  >
                    <h3>{r}</h3>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
        {isRunSimilarSearchOpen ? (
          <Button
            variant="contained"
            sx={{
              height: 34,
              width: 300,
              m: 5,
              backgroundColor: "red",
              "&.MuiButtonBase-root:hover": {
                bgcolor: "red",
              },
            }}
            onClick={() => {
              runSimilarSearch();
              setIsRunSimilarSearchOpen(false);
            }}
          >
            Close Similar Search
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ height: 34, width: 300, m: 5 }}
            onClick={() => {
              runSimilarSearch();
              setIsRunSimilarSearchOpen(true);
            }}
          >
            Run Similar Search
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default SingleAlertChartHeader;
