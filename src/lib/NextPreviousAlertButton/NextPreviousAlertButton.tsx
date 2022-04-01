import { Box, Button, Divider, Grid, Link, Paper } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertInterface } from "../../interfaces/AlertInterface";
import styles from "./NextPreviousAlertButton.module.css";

interface Props {
  next: AlertInterface;
  previous: AlertInterface;
}

const NextPreviousAlertButton = ({ next, previous }: Props) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ mx: 1.5, p: 1, mb: 2 }}>
      <Paper sx={{ height: 78, width: 363 }}>
        <Grid container sx={{ height: 78 }}>
          <Grid item xs>
            {previous === undefined ? (
              <div className={styles.disabledButton}>
                <Link underline="none" color={"#818181"}>
                  {" "}
                  &lt; &nbsp; &nbsp; PREVIOUS
                </Link>
              </div>
            ) : (
              <>
                <div className={styles.nextButton}>
                  <Link
                    href={`/single-alert/${previous.patternId}`}
                    underline="none"
                  >
                    &lt; &nbsp; &nbsp; PREVIOUS
                  </Link>
                </div>
                <div className={styles.buttonRegText}>
                  <h4>{previous.regulator}</h4>
                </div>
              </>
            )}
          </Grid>
          <Divider orientation="vertical" flexItem></Divider>
          <Grid item xs>
            {next === undefined ? (
              <div className={styles.nextButton}>
                <Link underline="none" color={"#818181"}>
                  NEXT &nbsp; &nbsp; &nbsp; &gt;
                </Link>
              </div>
            ) : (
              <>
                <div className={styles.nextButton}>
                  <Link
                    href={`/single-alert/${next.patternId}`}
                    underline="none"
                  >
                    NEXT &nbsp; &nbsp; &nbsp; &gt;
                  </Link>
                </div>
                <div className={styles.buttonRegText}>
                  <h4>{next.regulator}</h4>
                </div>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default NextPreviousAlertButton;
