import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Pagination,
} from "@mui/material";
import React from "react";
import { AlertInterface } from "../../interfaces/AlertInterface";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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

  console.log(rows);

  const [numPages] = React.useState(Math.ceil(rows.length) / itemsPerPage);

  return (
    <>
      Recently Viewed
      <List sx={{ minWidth: 300 }}>
        {rows
          .slice(page - 1 * rowsPerPage, page - 1 * rowsPerPage + rowsPerPage)
          .map((row) => {
            return (
              <>
                <ListItem>
                  <ListItemText
                    primary={row.regulator}
                    secondary={new Date(row.dateLastOpened).toDateString()}
                  />
                  <MoreVertIcon />
                </ListItem>
                <Divider />
              </>
            );
          })}
      </List>
      <Pagination count={numPages} page={page} onChange={handleChangePage} />
    </>
  );
};

export default RecentlyViewedTable;
