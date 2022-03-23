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
    <Box sx={{ minWidth: 300, margin: 4 }}>
      <Paper sx={{ height: 70 }}>
        <Grid container sx={{ height: 70 }}>
          <Grid item xs>
            {previous === undefined ? (
              <Button
                variant="text"
                sx={{ width: 150, paddingBottom: 0, mt: 0.75 }}
                disabled
              >
                &lt; &nbsp; &nbsp; Previous
              </Button>
            ) : (
              <>
                <Button
                  variant="text"
                  sx={{ width: 150, paddingBottom: 0, mt: 0.75 }}
                  onClick={() => {
                    navigate(`/single-alert/${previous.patternId}`);
                  }}
                >
                  &lt; &nbsp; &nbsp; Previous
                </Button>
                <div className={styles.buttonText}>
                  <h2>{previous.regulator}</h2>
                </div>
              </>
            )}
          </Grid>
          <Divider orientation="vertical" flexItem></Divider>
          <Grid item xs>
            {next === undefined ? (
              <Button
                variant="text"
                sx={{ width: 150, paddingBottom: 0, mt: 0.75 }}
                disabled
              >
                Next &nbsp; &nbsp; &nbsp; &gt;
              </Button>
            ) : (
              <>
                {/* <Button
                  variant="text"
                  sx={{ width: 150, paddingBottom: 0, mt: 0.75 }}
                  onClick={() => {
                    navigate(`/single-alert/${next.patternId}`);
                  }}
                >
                  Next &nbsp; &nbsp; &nbsp; &gt;
                </Button>
                <div className={styles.buttonText}>
                  <h2>{next.regulator}</h2>
                </div> */}
                <div className={styles.nextButton}>
                  <Link
                    href={`/single-alert/${next.patternId}`}
                    underline="none"
                  >
                    NEXT &nbsp; &nbsp; &nbsp; &gt;
                  </Link>
                </div>
                <div className={styles.buttonText}>
                  <h2>{next.regulator}</h2>
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
