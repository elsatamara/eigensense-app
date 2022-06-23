import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAppSelector } from "../../redux/hooks";
import styles from "./SearchPatternTable.module.css";

interface Column {
  id:
    | "patternId"
    | "patternName"
    | "preview"
    | "date"
    | "startTime"
    | "location"
    | "regulator";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "patternId", label: "Pattern ID", minWidth: 50 },
  { id: "patternName", label: "Pattern Name", minWidth: 50 },
  { id: "preview", label: "Preview", minWidth: 100 },
  { id: "date", label: "Date", minWidth: 50 },
  { id: "date", label: "Start Time", minWidth: 50 },
  { id: "location", label: "Location", minWidth: 50 },
  { id: "regulator", label: "Regulator", minWidth: 50 },
];

const SearchPatternsTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = useAppSelector((state) => state.patternList.patternList);

  function setRowValue(
    columnID: string,
    patternId: string,
    columnLabel: string,
    value: any
  ) {
    if (columnID === "preview") {
      return (
        <div className={styles.preview}>
          <img src={value} />
        </div>
      );
    } else if (columnID === "date" && columnLabel === "Date") {
      return value.slice(0, 10);
    } else if (columnID === "date" && columnLabel === "Start Time") {
      return value.slice(11, 16);
    } else {
      return value;
    }
  }

  return (
    <div>
      <Paper sx={{ width: "97.8%", overflow: "hidden", mx: 2 }}>
        <TableContainer sx={{ maxHeight: 520 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow key={"searchPatternTableHeader"}>
                {columns.map((column) => {
                  return (
                    <TableCell
                      key={column.label}
                      align="center"
                      sx={{
                        minWidth: column.minWidth,
                        borderBottom: "none",
                        zIndex: 1,
                      }}
                    >
                      <h3>{column.label}</h3>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row.patternId}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.label + row.patternId}
                            align="center"
                            sx={{ p: 1 }}
                          >
                            {setRowValue(
                              column.id,
                              row.patternId,
                              column.label,
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default SearchPatternsTable;
