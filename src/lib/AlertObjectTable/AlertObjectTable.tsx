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
import AlertStatusObject from "../AlertStatusObject/AlertStatusObject";
import { useNavigate } from "react-router-dom";

interface Column {
  id:
    | "patternId"
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
  { id: "patternId", label: "Pattern ID", minWidth: 50 },
  { id: "patternName", label: "Pattern Name", minWidth: 50 },
  { id: "preview", label: "Preview", minWidth: 100 },
  { id: "date", label: "Date", minWidth: 50 },
  { id: "startTime", label: "Start Time", minWidth: 50 },
  { id: "location", label: "Location", minWidth: 50 },
  { id: "regulator", label: "Regulator", minWidth: 50 },
  { id: "status", label: "Alert Status", minWidth: 50 },
];

interface Data {
  patternId: string;
  patternName: string;
  preview: string;
  date: string;
  startTime: string;
  location: string;
  regulator: string;
  status: string;
}

function createData(
  patternId: string,
  patternName: string,
  preview: string,
  date: string,
  startTime: string,
  location: string,
  regulator: string,
  status: string
): Data {
  return {
    patternId,
    patternName,
    preview,
    date,
    startTime,
    location,
    regulator,
    status,
  };
}

function setRowValue(columnID: string, value: string) {
  if (columnID === "preview") {
    return (
      <div className={styles.preview}>
        <img src={value} />
      </div>
    );
  } else if (columnID === "status") {
    return <AlertStatusObject alertStatus={value} />;
  } else {
    return value;
  }
}

const AlertObjectTable = () => {
  const navigate = useNavigate();
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
      elem.date.toString().slice(0, 10),
      elem.date.toString().slice(11, 16),
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
                  align="center"
                  sx={{
                    minWidth: column.minWidth,
                    borderBottom: "none",
                  }}
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
                    key={row.patternId}
                    onClick={() => {
                      navigate(`/single-alert/${row.patternId}`);
                    }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align="center" sx={{ p: 1 }}>
                          {setRowValue(column.id, value)}
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
