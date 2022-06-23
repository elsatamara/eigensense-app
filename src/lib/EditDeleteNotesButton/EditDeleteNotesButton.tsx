import React from "react";
import {
  Box,
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Modal,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import styles from "./EditDeleteNotesButton.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  deleteNote,
  deleteNoteRedux,
  updateNote,
  updateNoteRedux,
} from "../../redux/actions/NotesAction";

interface Props {
  noteId: string;
  patternId: string;
}

const EditDeleteNotesButton = ({ noteId, patternId }: Props) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | SVGSVGElement>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let notesList = useAppSelector((state) => state.notesList.notes);

  const [updatedNoteText, setUpdatedNoteText] = React.useState("");

  function handleDeleteNote(noteId: string) {
    let text = "Are you sure you want to delete this item?";
    if (window.confirm(text)) {
      notesList = notesList.filter((note) => note.notesId !== noteId);
      dispatch(deleteNote({ noteId: noteId, patternId: patternId }));
      dispatch(deleteNoteRedux(noteId));
    }
  }
  return (
    <>
      <MoreVertIcon
        id="notes-button"
        sx={{
          color: "#818181",
          width: "25px",
          height: "25px",
          pt: 0.3,
        }}
        onClick={(e) => {
          handleClick(e);
        }}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "notes-button",
        }}
        elevation={1}
      >
        <MenuItem
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <ListItemIcon>
            <ModeEditOutlineOutlinedIcon />
          </ListItemIcon>
          <h3>Edit note</h3>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteNote(noteId);
          }}
        >
          <ListItemIcon>
            <DeleteOutlineOutlinedIcon />
          </ListItemIcon>
          <h3>Delete</h3>
        </MenuItem>
      </Menu>
      <Modal open={modalOpen} onClose={handleClose}>
        <Box className={styles.editNotesModal}>
          <div className={styles.modalHeader}>Edit Note</div>
          <TextField
            multiline
            rows={4}
            sx={{ width: 425, m: 2, ml: 4, mr: 4 }}
            onChange={(e) => setUpdatedNoteText(e.target.value)}
          />
          <div className={styles.cancelSaveButtons}>
            <Button
              id="cancel-update-note-button"
              variant="outlined"
              sx={{ width: "83px", height: "34px" }}
              onClick={() => {
                setModalOpen(false);
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button
              id="save-update-note-button"
              variant="contained"
              sx={{ width: "67px", height: "34px", ml: 0.75 }}
              onClick={() => {
                dispatch(
                  updateNote({
                    noteId: noteId,
                    text: updatedNoteText,
                    date: new Date(),
                  })
                );
                dispatch(
                  updateNoteRedux({
                    noteId: noteId,
                    text: updatedNoteText,
                    date: new Date(),
                  })
                );
                setModalOpen(false);
                handleClose();
              }}
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default EditDeleteNotesButton;
