import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Pagination,
} from "@mui/material";
import React from "react";
import { AlertInterface } from "../../interfaces/AlertInterface";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./RecentlyViewedTable.module.css";
import { useNavigate } from "react-router-dom";

const RecentlyViewedTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const itemsPerPage = 4;

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const rows: AlertInterface[] = JSON.parse(
    localStorage.getItem("recentlyViewed")!
  );

  const [recentlyViewed, setRecentlyViewed] = React.useState(rows);

  function handleClearItem(patternId: string) {
    let text = "Are you sure you want to delete this item?";
    if (window.confirm(text)) {
      let newRows = rows.filter((alert) => alert.patternId != patternId);
      localStorage.setItem("recentlyViewed", JSON.stringify(newRows));
      setRecentlyViewed(newRows);
    }
  }

  const [numPages] = React.useState(Math.ceil(rows.length / itemsPerPage));

  return (
    <div className={styles.recentlyViewed}>
      <Box sx={{ mx: 1.5, p: 1 }}>
        <h1>RECENTLY VIEWED</h1>
        <List sx={{ width: 363 }}>
          {recentlyViewed
            .slice(
              (page - 1) * rowsPerPage,
              (page - 1) * rowsPerPage + rowsPerPage
            )
            .map((row) => {
              let date =
                "Last viewed: " +
                new Date(row.dateLastOpened).toString().slice(0, 21);
              return (
                <ListItem
                  key={row.patternId}
                  sx={{
                    "&:hover": {
                      backgroundColor: "white",
                      boxShadow: "0px 0px 0.25px 0.25px #157DDD",
                    },
                  }}
                >
                  <ListItemText
                    primary={<h2>{row.regulator}</h2>}
                    secondary={date}
                    onClick={() => {
                      navigate(`/single-alert/${row.patternId}`);
                      navigate(0);
                    }}
                  />
                  <ClearIcon
                    color="disabled"
                    sx={{ "&:hover": { color: "red" } }}
                    onClick={() => {
                      handleClearItem(row.patternId);
                    }}
                  />
                </ListItem>
              );
            })}
        </List>
        <Pagination count={numPages} page={page} onChange={handleChangePage} />
      </Box>
    </div>
  );
};

export default RecentlyViewedTable;
