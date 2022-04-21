import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import React from "react";

interface Props {
  numAlertSelected: number;
}

const AlertStatusFilter = ({ numAlertSelected }: Props) => {
  const [selected, setSelected] = React.useState("");

  const headers = [
    "(" + numAlertSelected + " Selected)",
    "Select Label: ",
    "Review",
    "Reassign",
    "Monitor",
    "Suppress",
    "Close",
  ];
  return (
    <Box
      sx={{
        pt: 0,
        pl: 2,
        pr: 2,
        pb: 0.3,
      }}
    >
      <Paper
        elevation={0}
        sx={{ p: 1.5, backgroundColor: "#ebf3fa", right: 0 }}
      >
        <Table sx={{ width: "50%", ml: "50%" }}>
          <TableHead>
            <TableRow>
              {headers.map((header) => {
                if (header == "(" + numAlertSelected + " Selected)") {
                  return (
                    <TableCell
                      key={header}
                      sx={{
                        borderBottom: "none",
                        color: "#147ddd",
                        fontFamily: "Rubik",
                      }}
                    >
                      {header}
                    </TableCell>
                  );
                }
                return (
                  <TableCell
                    key={header}
                    sx={{
                      borderBottom: "none",
                      fontFamily: "Rubik",
                      color: header == selected ? "#147ddd" : "black",
                    }}
                    onClick={() => {
                      setSelected(header);
                    }}
                  >
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        </Table>
      </Paper>
    </Box>
  );
};

export default AlertStatusFilter;
