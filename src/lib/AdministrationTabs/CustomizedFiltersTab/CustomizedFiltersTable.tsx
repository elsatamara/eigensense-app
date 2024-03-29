import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NewFilterModal from "../../DashboardFilters/NewFilterModal";
import DeleteFilterModal from "./DeleteFilterModal";

interface Column {
  id: "name" | "actions";
  label: any;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "name", label: "Custom Filter Name", minWidth: 100 },
  { id: "actions", label: "Actions", minWidth: 50 },
];

const CustomizedFiltersTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = useAppSelector(
    (state) => state.customFilterList.customFilterList
  );
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [isCustomFilterModalOpen, setCustomFilterModalOpen] =
    React.useState(false);

  const [isDeleteFilterModalOpen, setDeleteFilterModalOpen] =
    React.useState(false);

  const [filterNameToDelete, setFilterNameToDelete] =
    React.useState<string>("");
  const [filterIdToDelete, setFilterIdToDelete] = React.useState<string>("");
  const [filterToEdit, setFilterToEdit] = React.useState<string>("");
  const [filterNameToEdit, setFilterNameToEdit] = React.useState<string>("");

  return (
    <div>
      <TableContainer sx={{ width: "900px", ml: 35, mt: 2, mb: 3 }}>
        <Table stickyHeader sx={{ backgroundColor: "#FAFAFA" }}>
          <TableHead>
            <TableRow key={"customFilterTableHeader"}>
              {columns.map((column) => {
                return (
                  <TableCell
                    key={column.id}
                    align={column.id == "name" ? "left" : "center"}
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
              .map((row: any) => {
                return (
                  <TableRow key={row.customFilterId}>
                    {columns.map((column) => {
                      if (column.id == "actions") {
                        return (
                          <TableCell
                            key={column.id + row.customFilterId}
                            align="center"
                            sx={{ p: 1 }}
                          >
                            <EditIcon
                              fontSize="small"
                              sx={{ color: "#4D7CFE" }}
                              onClick={() => {
                                setCustomFilterModalOpen(true);
                                setFilterToEdit(row.customFilterId);
                                setFilterNameToEdit(row.name);
                              }}
                            />
                            <DeleteOutlineIcon
                              fontSize="small"
                              sx={{ color: "#778CA2" }}
                              onClick={() => {
                                setDeleteFilterModalOpen(true);
                                setFilterIdToDelete(row.customFilterId);
                                setFilterNameToDelete(row.name);
                              }}
                            />
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            key={column.id + row.customFilterId}
                            align="left"
                            sx={{ p: 1, pl: 2 }}
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
      </TableContainer>
      {isCustomFilterModalOpen ? (
        <NewFilterModal
          onClose={() => setCustomFilterModalOpen(false)}
          isEditFilterModal
          filterToEdit={filterToEdit}
          filterNameToEdit={filterNameToEdit}
        />
      ) : (
        <></>
      )}
      {isDeleteFilterModalOpen ? (
        <DeleteFilterModal
          filterName={filterNameToDelete}
          filterId={filterIdToDelete}
          onClose={() => {
            setDeleteFilterModalOpen(false);
            setFilterNameToDelete("");
            setFilterIdToDelete("");
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CustomizedFiltersTable;
