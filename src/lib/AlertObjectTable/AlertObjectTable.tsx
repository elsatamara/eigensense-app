import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useAppSelector } from "../../redux/hooks";
import styles from "./AlertObjectTable.module.css";

interface Column {
  id:
    | "patternID"
    | "patternName"
    | "preview"
    | "date"
    | "startTime"
    | "location"
    | "regulator"
    | "status";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "patternID", label: "Pattern ID", minWidth: 100 },
  { id: "patternName", label: "Pattern Name", minWidth: 100 },
  { id: "preview", label: "Preview", minWidth: 100 },
  { id: "date", label: "Date", minWidth: 100 },
  { id: "startTime", label: "Start Time", minWidth: 100 },
  { id: "location", label: "Location", minWidth: 100 },
  { id: "regulator", label: "Regulator", minWidth: 100 },
  { id: "status", label: "Alert Status", minWidth: 100 },
];

interface Data {
  patternID: string;
  patternName: string;
  preview: string;
  date: string;
  startTime: string;
  location: string;
  regulator: string;
  status: string;
}

function createData(
  patternID: string,
  patternName: string,
  preview: string,
  date: string,
  startTime: string,
  location: string,
  regulator: string,
  status: string
): Data {
  return {
    patternID,
    patternName,
    preview,
    date,
    startTime,
    location,
    regulator,
    status,
  };
}

const AlertObjectTable = () => {
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

  const alertListState = useAppSelector((state) => state.alertList);

  const rows = alertListState.alerts.map((elem) => {
    return createData(
      elem.patternId,
      elem.patternName,
      elem.preview,
      elem.date.toString(),
      elem.date.toString(),
      elem.location,
      elem.regulator,
      elem.status.toString()
    );
  });
  return (
    <Paper sx={{ width: "97.8%", overflow: "hidden", mx: 2 }}>
      <TableContainer sx={{ maxHeight: 520 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ minWidth: column.minWidth, borderBottom: "none" }}
                >
                  <h2>{column.label}</h2>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.patternID}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "preview" &&
                          typeof value === "string" ? (
                            <img src={value} className={styles.preview} />
                          ) : (
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default AlertObjectTable;
