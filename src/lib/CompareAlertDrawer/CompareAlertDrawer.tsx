import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import styles from "./CompareAlertDrawer.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { SimilarPatternAlgoInterface } from "../../interfaces/SimilarPatternInterface";
import {
  clearCompareChartData,
  getCompareChartData,
} from "../../redux/actions/CompareChartAction";
import { PatternInterface } from "../../interfaces/PatternInterface";

interface Props {
  similarPatternList: SimilarPatternAlgoInterface[];
  setPatternSelected: (patternSelected: SimilarPatternAlgoInterface) => void;
  closeDrawer: () => void;
}

const CompareAlertDrawer = ({
  similarPatternList,
  setPatternSelected,
  closeDrawer,
}: Props) => {
  const [similarPatternListState, setSimilarPatternListState] =
    React.useState<SimilarPatternAlgoInterface[]>(similarPatternList);

  const handleComparedAlertDeletion = (
    patternToDelete: SimilarPatternAlgoInterface
  ) => {
    let text =
      "Are you sure you want to delete this alert from the Compare List?";
    if (window.confirm(text)) {
      let newState = similarPatternListState.filter(
        (pattern) => pattern !== patternToDelete
      );
      setSimilarPatternListState(newState);
    }
  };

  const dispatch = useAppDispatch();
  return (
    <div>
      <Drawer
        variant="permanent"
        anchor="right"
        PaperProps={{
          sx: { width: "30%", minWidth: "400px" },
        }}
      >
        <div className={styles.headerContainer}>
          <h1>COMPARE LIST</h1>
          <Button
            onClick={() => {
              closeDrawer();
              dispatch(clearCompareChartData());
            }}
          >
            Back to Results
          </Button>
        </div>
        <div>
          <List>
            {similarPatternListState.map((item) => {
              return (
                <ListItem>
                  <ListItemButton
                    onClick={() => {
                      dispatch(clearCompareChartData());
                      dispatch(getCompareChartData(item.patternName));
                      setPatternSelected(item);
                    }}
                  >
                    <ListItemText
                      primary={item.patternName}
                      secondary={"Match score: " + item.matchScore}
                    ></ListItemText>
                    <ListItemAvatar>
                      <img src={item.preview} />
                    </ListItemAvatar>
                    <ListItemIcon>
                      <DeleteOutlineIcon
                        sx={{ ml: 4, "&:hover": { color: "red" }, zIndex: 2 }}
                        onClick={() => {
                          handleComparedAlertDeletion(item);
                        }}
                      />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default CompareAlertDrawer;
