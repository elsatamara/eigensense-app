import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import EditIcon from "@mui/icons-material/Edit";
import AgentStatusObject from "./AgentStatusObject";

interface Column {
  id:
    | "agentId"
    | "userType"
    | "firstName"
    | "lastName"
    | "email"
    | "phone"
    | "status"
    | "lastLogin"
    | "actions";
  label: any;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "agentId", label: "Agent ID", minWidth: 50 },
  { id: "userType", label: "User Type", minWidth: 50 },
  { id: "firstName", label: "First Name", minWidth: 50 },
  { id: "lastName", label: "Last Name", minWidth: 50 },
  { id: "email", label: "Email", minWidth: 50 },
  { id: "phone", label: "Phone", minWidth: 50 },
  { id: "status", label: "Status", minWidth: 50 },
  { id: "lastLogin", label: "Last login", minWidth: 50 },
  { id: "actions", label: "Actions", minWidth: 50 },
];

const AgentListTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = useAppSelector((state) => state.agentList.agentList);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <TableContainer sx={{ width: "1040px" }}>
      <Table stickyHeader sx={{ backgroundColor: "#FAFAFA" }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              return (
                <TableCell
                  key={column.id}
                  align="center"
                  sx={{
                    minWidth: column.minWidth,
                    borderBottom: "none",
                    zIndex: 1,
                    backgroundColor: "#FAFAFA",
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
                <TableRow>
                  {columns.map((column) => {
                    if (column.id == "actions") {
                      return (
                        <TableCell key={column.id} align="center" sx={{ p: 1 }}>
                          <EditIcon
                            fontSize="small"
                            sx={{ color: "#4D7CFE" }}
                          />
                        </TableCell>
                      );
                    } else if (column.id == "status") {
                      return (
                        <TableCell key={column.id} align="center" sx={{ p: 1 }}>
                          <AgentStatusObject agentStatus={row[column.id]} />
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell key={column.id} align="center" sx={{ p: 1 }}>
                          {row[column.id]}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default AgentListTable;
