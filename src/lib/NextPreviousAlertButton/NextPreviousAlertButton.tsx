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
    <Box sx={{ width: 363, p: 2.7, m: 2.7, mb: 0, pb: 2 }}>
      <Paper sx={{ height: 70, width: 363 }}>
        <Grid container sx={{ height: 70 }}>
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
                  <h3>{previous.regulator}</h3>
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
                  <h3>{next.regulator}</h3>
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
