import React from "react";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { useAppSelector } from "../../redux/hooks";
import styles from "./SimilarSearchPatternTable.module.css";

interface Column {
  id:
    | "patternId"
    | "patternName"
    | "preview"
    | "matchScore"
    | "date"
    | "startTime"
    | "location"
    | "regulator"
    | "checkBox";
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
  { id: "patternId", label: "Alert ID", minWidth: 50 },
  { id: "patternName", label: "Alert Name", minWidth: 50 },
  { id: "preview", label: "Preview", minWidth: 100 },
  { id: "matchScore", label: "Match Score", minWidth: 50 },
  { id: "date", label: "Date", minWidth: 50 },
  { id: "startTime", label: "Start Time", minWidth: 50 },
  { id: "location", label: "Location", minWidth: 50 },
  { id: "regulator", label: "Regulator", minWidth: 50 },
];

const SimilarSearchPatternTable = () => {
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

  const [patternClicked, setPatternClicked] = React.useState<string[]>([]);

  const handleSelectPatternClick = (patternId: string) => {
    var newPatternClicked = [...patternClicked];
    newPatternClicked.push(patternId);
    setPatternClicked(newPatternClicked);
  };

  const handleDeselectPatternClick = (patternId: string) => {
    var newPatternClicked = [...patternClicked];
    newPatternClicked = newPatternClicked.filter(
      (alert) => alert !== patternId
    );
    setPatternClicked(newPatternClicked);
  };

  function setRowValue(columnID: string, patternId: string, value?: any) {
    if (columnID === "checkBox") {
      return !patternClicked.includes(patternId) ? (
        <CheckBoxOutlineBlankOutlinedIcon
          onClick={() => {
            handleSelectPatternClick(patternId);
          }}
        />
      ) : (
        <CheckBoxOutlinedIcon
          onClick={() => {
            handleDeselectPatternClick(patternId);
          }}
        />
      );
    } else {
      return value;
    }
  }

  const similarPatternState = useAppSelector(
    (state) => state.similarPatternList.similarPatternList
  );

  return (
    <div>
      <TableContainer
        sx={{
          maxHeight: 500,
          mb: 0,
          overflow: "auto",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                if (column.id == "checkBox") {
                  return (
                    <TableCell
                      key={column.id}
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
                      key={column.id}
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
            {similarPatternState
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow>
                    {columns.map((column) => {
                      if (column.id == "checkBox") {
                        return (
                          <TableCell
                            key={column.id}
                            align="center"
                            sx={{
                              p: 1,
                              position: "sticky",
                              left: 0,
                              backgroundColor: "#f7fafb",
                            }}
                          >
                            {setRowValue(column.id, row.patternId)}
                          </TableCell>
                        );
                      } else {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align="center"
                            sx={{ p: 1 }}
                          >
                            {setRowValue(column.id, row.patternId, value)}
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
      <div className={styles.resetCompareButtons}>
        {patternClicked.length > 0 ? (
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setPatternClicked([]);
            }}
            sx={{ m: 1 }}
          >
            Reset All
          </Button>
        ) : (
          <Button variant="contained" size="small" disabled sx={{ m: 1 }}>
            Reset All
          </Button>
        )}

        <Button variant="contained" size="small" sx={{ m: 1 }}>
          Compare
        </Button>
      </div>
    </div>
  );
};

export default SimilarSearchPatternTable;
