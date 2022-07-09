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
import styles from "./SimilarSearchPatternAlgoTable.module.css";
import { SimilarPatternAlgoInterface } from "../../interfaces/SimilarPatternInterface";
import { PatternInterface } from "../../interfaces/PatternInterface";
import ChartPreview from "../ChartPreview/ChartPreview";

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
  { id: "patternId", label: "Pattern ID", minWidth: 50 },
  { id: "patternName", label: "Pattern Name", minWidth: 50 },
  { id: "preview", label: "Preview", minWidth: 100 },
  { id: "matchScore", label: "Match Score", minWidth: 50 },
  { id: "date", label: "Date", minWidth: 50 },
  { id: "startTime", label: "Start Time", minWidth: 50 },
  { id: "location", label: "Location", minWidth: 50 },
  { id: "regulator", label: "Regulator", minWidth: 50 },
];

interface Props {
  onCompareButtonClicked: (
    patternToCompare: SimilarPatternAlgoInterface[]
  ) => void;
}

const SimilarSearchPatternAlgoTable = ({ onCompareButtonClicked }: Props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const similarPatternAlgoState = useAppSelector(
    (state) => state.similarPatternList.similarPatternAlgoList
  );

  const [patternClicked, setPatternClicked] = React.useState<
    SimilarPatternAlgoInterface[]
  >([]);

  const handleSelectPatternClick = (
    similarPattern: SimilarPatternAlgoInterface
  ) => {
    var newPatternClicked = [...patternClicked];
    newPatternClicked.push(similarPattern);
    setPatternClicked(newPatternClicked);
  };

  const handleDeselectPatternClick = (
    similarPattern: SimilarPatternAlgoInterface
  ) => {
    var newPatternClicked = [...patternClicked];
    newPatternClicked = newPatternClicked.filter(
      (pattern) => pattern !== similarPattern
    );
    setPatternClicked(newPatternClicked);
  };

  function setRowValue(
    similarPattern: SimilarPatternAlgoInterface,
    columnID: string,
    value?: any
  ) {
    console.log(new Date(similarPattern.dataPoints[0][0]).toDateString());
    if (columnID === "checkBox") {
      return !patternClicked.includes(similarPattern) ? (
        <CheckBoxOutlineBlankOutlinedIcon
          onClick={() => {
            handleSelectPatternClick(similarPattern);
          }}
        />
      ) : (
        <CheckBoxOutlinedIcon
          onClick={() => {
            handleDeselectPatternClick(similarPattern);
          }}
        />
      );
    } else if (columnID === "preview") {
      return <ChartPreview previewData={similarPattern.dataPoints} />;
    } else if (columnID === "matchScore") {
      return similarPattern.matchScore.toFixed(2);
    } else if (columnID === "startTime" || columnID === "date") {
      return new Date(similarPattern.dataPoints[0][0]).toDateString();
    } else {
      return value;
    }
  }
  return (
    <>
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
              {similarPatternAlgoState
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      sx={{
                        backgroundColor: patternClicked.includes(row)
                          ? "#f3fdf7"
                          : "white",
                      }}
                    >
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
                              {setRowValue(row, column.id)}
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
                              {setRowValue(row, column.id, value)}
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
      </div>
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

        <Button
          variant="contained"
          size="small"
          sx={{ m: 1 }}
          onClick={() => {
            onCompareButtonClicked(patternClicked);
          }}
        >
          Compare
        </Button>
      </div>
    </>
  );
};

export default SimilarSearchPatternAlgoTable;
