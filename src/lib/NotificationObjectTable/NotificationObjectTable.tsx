import React, { useEffect } from "react";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import NotificationTableHeader from "./NotificationTableHeader";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import {
  deselectMarkAsImportantDb,
  markReadDb,
  markReadRedux,
  selectMarkAsImportantDb,
  selectMarkAsImportantRedux,
  selectMarkAsUnimportantRedux,
} from "../../redux/actions/NotificationAction";
import NotificationTypeFilter from "./NotificationTypeFilter";
import { NotificationType } from "../../interfaces/NotificationInterface";
import CircleIcon from "@mui/icons-material/Circle";

interface Column {
  id:
    | "checkBox"
    | "date"
    | "alertId"
    | "description"
    | "location"
    | "bookmark"
    | "readStatus";
  label: any;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  {
    id: "checkBox",
    label: <IndeterminateCheckBoxOutlinedIcon />,
    minWidth: 50,
  },
  { id: "readStatus", label: " ", minWidth: 10 },
  { id: "alertId", label: "Alert ID", minWidth: 50 },
  { id: "date", label: "Date", minWidth: 50 },
  { id: "description", label: "Description", minWidth: 50 },
  { id: "location", label: "Location", minWidth: 50 },
  {
    id: "bookmark",
    label: "Mark as important",
    minWidth: 50,
  },
];

const NotificationObjectTable = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = useAppSelector(
    (state) => state.notificationList.notificationList
  );

  const [notificationClicked, setNotificationClicked] = React.useState<
    string[]
  >([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectNotificationClick = (notificationId: string) => {
    var newNotification = [...notificationClicked];
    newNotification.push(notificationId);
    setNotificationClicked(newNotification);
  };

  const handleDeselectNotificationClick = (notificationId: string) => {
    var newNotification = [...notificationClicked];
    newNotification = newNotification.filter(
      (notification) => notification !== notificationId
    );
    setNotificationClicked(newNotification);
  };

  const handleSelectMarkAsImportantClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    notificationId: string
  ) => {
    if (e.target.checked) {
      dispatch(selectMarkAsImportantDb(notificationId));
      dispatch(selectMarkAsImportantRedux([notificationId]));
    } else {
      dispatch(deselectMarkAsImportantDb(notificationId));
      dispatch(selectMarkAsUnimportantRedux([notificationId]));
    }
  };

  function setRowValue(columnId: string, alertId: string, value?: any) {
    if (columnId === "checkBox") {
      return !notificationClicked.includes(alertId) ? (
        <CheckBoxOutlineBlankOutlinedIcon
          onClick={() => {
            handleSelectNotificationClick(alertId);
          }}
        />
      ) : (
        <CheckBoxOutlinedIcon
          onClick={() => {
            handleDeselectNotificationClick(alertId);
          }}
        />
      );
    } else if (columnId === "bookmark") {
      return (
        <Checkbox
          checked={value ? true : false}
          icon={<BookmarkBorderIcon />}
          checkedIcon={<BookmarkIcon />}
          onChange={(e) => handleSelectMarkAsImportantClick(e, alertId)}
        />
      );
    } else {
      return value;
    }
  }

  return (
    <div>
      <NotificationTableHeader />
      {notificationClicked.length > 0 ? (
        <NotificationTypeFilter
          notficationSelected={notificationClicked}
          onClose={() => {
            setNotificationClicked([]);
          }}
        />
      ) : (
        <></>
      )}
      <Paper sx={{ width: "97.8%", overflow: "hidden", mx: 2, mb: 4 }}>
        <TableContainer
          sx={{ maxHeight: notificationClicked.length == 0 ? 520 : 420, mb: 0 }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow key={"notifTableHeader"}>
                {columns.map((column) => {
                  if (column.id == "checkBox") {
                    return (
                      <TableCell
                        align="center"
                        key={column.id}
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
                        align="center"
                        key={column.id}
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
                      key={row.notificationId}
                      sx={{
                        backgroundColor: notificationClicked.includes(
                          row.alertId
                        )
                          ? "#f3fdf7"
                          : "white",
                      }}
                    >
                      {columns.map((column) => {
                        if (column.id == "checkBox") {
                          return (
                            <TableCell
                              align="center"
                              key={column.id + row.notificationId}
                              sx={{
                                p: 1,
                                position: "sticky",
                                left: 0,
                                backgroundColor: "#f7fafb",
                              }}
                            >
                              {setRowValue(column.id, row.alertId)}
                            </TableCell>
                          );
                        } else if (column.id == "bookmark") {
                          return (
                            <TableCell
                              key={column.id + row.notificationId}
                              align="center"
                              sx={{ p: 1 }}
                            >
                              {setRowValue(
                                column.id,
                                row.alertId,
                                row.isImportant
                              )}
                            </TableCell>
                          );
                        } else if (column.id == "readStatus") {
                          if (row.type == NotificationType.Unread) {
                            return (
                              <TableCell
                                key={column.id + row.notificationId}
                                align="center"
                                sx={{ p: 1 }}
                              >
                                <CircleIcon
                                  fontSize="small"
                                  sx={{ color: "#0047AB" }}
                                />
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell key={"empty" + row.notificationId}>
                                <div></div>
                              </TableCell>
                            );
                          }
                        } else {
                          const value = row[column.id];
                          return (
                            <TableCell
                              align="left"
                              sx={{ p: 1 }}
                              key={column.id + row.notificationId}
                              onClick={() => {
                                dispatch(markReadDb(row.alertId));
                                dispatch(markReadRedux([row.alertId]));
                                navigate(`/single-alert/${row.alertId}`);
                              }}
                            >
                              {setRowValue(column.id, row.alertId, value)}
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

export default NotificationObjectTable;
