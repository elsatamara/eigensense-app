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
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import AlertStatusFilter from "../AlertStatusFilter/AlertStatusFilter";

interface Column {
  id:
    | "checkBox"
    | "patternId"
    | "patternName"
    | "preview"
    | "date"
    | "startTime"
    | "location"
    | "regulator"
    | "eventStarts"
    | "alertType"
    | "keyAttribute"
    | "agentName"
    | "alertQueue"
    | "status";
  label: any;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "checkBox",
    label: <IndeterminateCheckBoxOutlinedIcon />,
    minWidth: 50,
  },
  { id: "patternId", label: "Alert ID", minWidth: 50 },
  { id: "patternName", label: "Alert Name", minWidth: 50 },
  { id: "preview", label: "Preview", minWidth: 100 },
  { id: "date", label: "Date", minWidth: 50 },
  { id: "date", label: "Start Time", minWidth: 50 },
  { id: "date", label: "Event Start", minWidth: 50 },
  { id: "keyAttribute", label: "Key Attribute", minWidth: 50 },
  { id: "alertType", label: "Alert Type", minWidth: 50 },
  { id: "location", label: "Location", minWidth: 50 },
  { id: "regulator", label: "Regulator", minWidth: 50 },
  { id: "status", label: "Alert Status", minWidth: 50 },
  { id: "alertQueue", label: "Alert Queue", minWidth: 50 },
  { id: "agentName", label: "Agent Name", minWidth: 50 },
];

const AlertObjectTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [alertClicked, setAlertClicked] = React.useState<string[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAlertClick = (patternId: string) => {
    var newAlertClicked = [...alertClicked];
    newAlertClicked.push(patternId);
    setAlertClicked(newAlertClicked);
  };

  const handleDeselectAlertClick = (patternId: string) => {
    var newAlertClicked = [...alertClicked];
    newAlertClicked = newAlertClicked.filter((alert) => alert !== patternId);
    setAlertClicked(newAlertClicked);
  };

  function setRowValue(
    columnID: string,
    patternId: string,
    columnLabel: string,
    value?: any
  ) {
    if (columnID === "preview") {
      return (
        <div className={styles.preview}>
          <img src={value} />
        </div>
      );
    } else if (columnID === "status") {
      return (
        <div
          className={styles.alertStatusObject}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <AlertStatusObject alertStatus={value} patternId={[patternId]} />
        </div>
      );
    } else if (columnID === "checkBox") {
      return !alertClicked.includes(patternId) ? (
        <CheckBoxOutlineBlankOutlinedIcon
          onClick={() => {
            handleSelectAlertClick(patternId);
          }}
        />
      ) : (
        <CheckBoxOutlinedIcon
          onClick={() => {
            handleDeselectAlertClick(patternId);
          }}
        />
      );
    } else if (
      columnID === "date" &&
      (columnLabel === "Start Time" || columnLabel === "Event Start")
    ) {
      return value.slice(11, 16);
    } else if (columnID === "date" && columnLabel === "Date") {
      return value.slice(0, 10);
    } else {
      return value;
    }
  }

  const rows = useAppSelector((state) => state.alertList.alerts);

  return (
    <div id="tableFirstDiv" className={styles.alertTableContainer}>
      {alertClicked.length > 0 ? (
        <AlertStatusFilter alertSelected={alertClicked} />
      ) : (
        <></>
      )}
      <Paper sx={{ width: "97.8%", overflow: "hidden", mx: 2, mb: 4 }}>
        <TableContainer
          sx={{ maxHeight: alertClicked.length == 0 ? 520 : 420, mb: 0 }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow key={"alertObjectTableHeader"}>
                {columns.map((column) => {
                  if (column.id == "checkBox") {
                    return (
                      <TableCell
                        key={column.label}
                        align="center"
                        sx={{
                          p: 1,
                          position: "sticky",
                          left: 0,
                          backgroundColor: "#f7fafb",
                          minWidth: column.minWidth,
                          borderBottom: "none",
                          zIndex: 2,
                        }}
                      >
                        <h3>{column.label}</h3>
                      </TableCell>
                    );
                  } else {
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
                  }
                })}
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
                      sx={{
                        backgroundColor: alertClicked.includes(row.patternId)
                          ? "#f3fdf7"
                          : "white",
                      }}
                    >
                      {columns.map((column) => {
                        if (column.id == "checkBox") {
                          return (
                            <TableCell
                              key={column.label + row.patternId}
                              align="center"
                              sx={{
                                p: 1,
                                position: "sticky",
                                left: 0,
                                backgroundColor: "#f7fafb",
                              }}
                            >
                              {setRowValue(
                                column.id,
                                row.patternId,
                                column.label
                              )}
                            </TableCell>
                          );
                        } else {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.label + row.patternId}
                              align="center"
                              sx={{ p: 1 }}
                              onClick={() => {
                                navigate(`/single-alert/${row.patternId}`);
                              }}
                            >
                              {setRowValue(
                                column.id,
                                row.patternId,
                                column.label,
                                value
                              )}
                            </TableCell>
                          );
                        }
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
    </div>
  );
};

export default AlertObjectTable;
