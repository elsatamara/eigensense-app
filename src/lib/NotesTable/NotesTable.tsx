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
import {
  getNotes,
  postNotes,
  postNotesRedux,
} from "../../redux/actions/NotesAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import AssignAgentDropdown from "../AssignAgentDropdown/AssignAgentDropdown";
import styles from "./NotesTable.module.css";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EditDeleteNotesButton from "../EditDeleteNotesButton/EditDeleteNotesButton";
import { NotesInterface } from "../../interfaces/NotesInterface";

interface Props {
  patternId: string;
}

const NotesTable = ({ patternId }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNotes(patternId));
  }, []);

  const notesList = useAppSelector((state) => state.notesList.notes);

  const [textFieldValue, setTextFieldValue] = React.useState("");

  function handlePostNotes() {
    var params: NotesInterface = {
      notesId: Math.random().toString(),
      patternId: patternId,
      agent: "Jason", //TODO: FIGURE OUT HOW TO ADD AGENT NAME
      text: textFieldValue,
      date: new Date(),
    };
    setTextFieldValue("");
    dispatch(postNotes(params));
    dispatch(postNotesRedux(params));
  }

  return (
    <div>
      <Box sx={{ width: 372, height: 600, mx: 1.5, p: 1 }}>
        <h1>NOTES</h1>
        <Paper sx={{ height: 450 }}>
          <Paper sx={{ height: 350, overflow: "auto", mt: 2.4 }} elevation={0}>
            <List sx={{ minHeight: 330, mx: 1.8 }}>
              {notesList.map((note) => {
                let header =
                  note.agent + " " + note.date.toString().slice(0, 21);
                return (
                  <ListItem key={note.notesId} sx={{ p: 0.5 }}>
                    <div className={styles.notesItem}>
                      <div className={styles.notesItemHeader}>
                        <ChatBubbleOutlineIcon
                          sx={{
                            color: "#157DDD",
                            width: "25px",
                            height: "25px",
                            pt: 0.5,
                          }}
                        />
                        <ListItemText
                          primary={<h4>{header}</h4>}
                          sx={{ ml: 0.5 }}
                        />
                        <EditDeleteNotesButton
                          noteId={note.notesId}
                          patternId={note.patternId}
                        />
                      </div>
                      <ListItemText
                        primary={<h3>{note.text}</h3>}
                        sx={{ width: "90%" }}
                      />
                    </div>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
          <div className={styles.notesInput}>
            <TextField
              hiddenLabel
              id="filled-basic"
              placeholder="Begin typing note..."
              variant="outlined"
              value={textFieldValue}
              sx={{ width: 335, mx: 1 }}
              size="small"
              onChange={(e) => setTextFieldValue(e.target.value)}
              onKeyPress={async (ev) => {
                if (ev.key === "Enter") {
                  handlePostNotes();
                }
              }}
            />

            <div className={styles.assignUpload}>
              <AssignAgentDropdown />
              <Button
                variant="outlined"
                sx={{
                  ml: 0.9,
                  p: 0.8,
                  fontSize: "14px",
                  height: 34,
                }}
                onClick={handlePostNotes}
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
