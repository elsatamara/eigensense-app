import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { getNotes } from "../../redux/actions/NotesAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssignAgentDropdown from "../AssignAgentDropdown/AssignAgentDropdown";
import styles from "./NotesTable.module.css";

interface Props {
  patternId: string;
}

const NotesTable = ({ patternId }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNotes(patternId));
  }, []);

  const notesList = useAppSelector((state) => state.notesList.notes);

  return (
    <div>
      <Box sx={{ width: 361, height: 600 }}>
        NOTES
        <Paper sx={{ height: 433, overflow: "auto", mt: 2.4 }}>
          <List sx={{ minHeight: 330, mx: 1.8 }}>
            {notesList.map((note) => {
              return (
                <ListItem key={note.notesId}>
                  <ListItemText primary={note.text} />
                  <MoreVertIcon />
                </ListItem>
              );
            })}
          </List>
          <div className={styles.notesInput}>
            <TextField
              id="filled-basic"
              label="Begin typing note..."
              variant="outlined"
              sx={{ width: 335, mx: 1 }}
              size="small"
            />
            <div className={styles.assignUpload}>
              <AssignAgentDropdown />
              <Button
                variant="outlined"
                sx={{
                  ml: 0.8,
                  p: 0.8,
                  fontSize: "14px",
                  height: 34,
                }}
              >
                Upload note
              </Button>
            </div>
          </div>
        </Paper>
      </Box>
    </div>
  );
};

export default NotesTable;
