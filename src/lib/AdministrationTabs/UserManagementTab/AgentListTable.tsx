import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  OutlinedInput,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAppSelector } from "../../../redux/hooks";
import EditIcon from "@mui/icons-material/Edit";
import AgentStatusObject from "./AgentStatusObject";
import SearchIcon from "@mui/icons-material/Search";
import AgentTypeStatusDropdownMenu from "./AgentTypeStatusDropdownMenu";
import styles from "./UserManagement.module.css";
import { AgentInterface } from "../../../interfaces/AgentInterface";

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
  const rowState = useAppSelector((state) => state.agentList.agentList);

  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const [rows, setRows] = React.useState<AgentInterface[]>(rowState);

  useEffect(() => {
    setRows(rowState);
  }, [rowState]);

  useEffect(() => {
    const agentRegex = new RegExp(searchQuery, "i");
    if (searchQuery.length > 0) {
      const newAgentList = [...rows].filter(
        (agent) =>
          agentRegex.test(agent.firstName) ||
          agentRegex.test(agent.lastName) ||
          agentRegex.test(agent.agentId)
      );
      setRows(newAgentList);
    } else if (searchQuery.length === 0) {
      setRows([...rowState]);
    }
  }, [searchQuery]);

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
    <>
      <div className={styles.searchBarAgentFilterContainer}>
        <OutlinedInput
          endAdornment={<SearchIcon sx={{ color: "#778CA2" }} />}
          placeholder="Search"
          size="small"
          sx={{ width: "487px" }}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <AgentTypeStatusDropdownMenu isAgentTypeFilter />
        <AgentTypeStatusDropdownMenu isAgentStatusFilter />
      </div>
      <TableContainer sx={{ width: "1040px" }}>
        <Table stickyHeader sx={{ backgroundColor: "#FAFAFA" }}>
          <TableHead>
            <TableRow key={"userTableHeader"}>
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
                  <TableRow key={row.agentId}>
                    {columns.map((column) => {
                      if (column.id == "actions") {
                        return (
                          <TableCell
                            key={column.id + row.agentId}
                            align="center"
                            sx={{ p: 1 }}
                          >
                            <EditIcon
                              fontSize="small"
                              sx={{ color: "#4D7CFE" }}
                            />
                          </TableCell>
                        );
                      } else if (column.id == "status") {
                        return (
                          <TableCell
                            key={column.id + row.agentId}
                            align="center"
                            sx={{ p: 1 }}
                          >
                            <AgentStatusObject agentStatus={row[column.id]} />
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            key={column.id + row.agentId}
                            align="center"
                            sx={{ p: 1 }}
                          >
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
    </>
  );
};

export default AgentListTable;
