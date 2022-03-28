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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "./RecentlyViewedTable.module.css";

const RecentlyViewedTable = () => {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const itemsPerPage = 4;

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const rows: AlertInterface[] = JSON.parse(
    localStorage.getItem("recentlyViewed")!
  );

  console.log("ROWS", rows.slice(0, 4));

  const [numPages] = React.useState(Math.ceil(rows.length / itemsPerPage));

  return (
    <div className={styles.recentlyViewed}>
      <Box sx={{ mt: 0 }}>
        Recently Viewed
        <List sx={{ width: 363 }}>
          {rows
            .slice(
              (page - 1) * rowsPerPage,
              (page - 1) * rowsPerPage + rowsPerPage
            )
            .map((row) => {
              return (
                <ListItem key={row.patternId}>
                  <ListItemText
                    primary={row.regulator}
                    secondary={new Date(row.dateLastOpened).toDateString()}
                  />
                  <MoreVertIcon />
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
