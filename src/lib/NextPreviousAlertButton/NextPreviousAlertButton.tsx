import { Box, Divider, Grid, Paper } from "@mui/material";
import React from "react";

function VerticalDividerText() {}

const NextPreviousAlertButton = () => {
  const content = (
    <div>
      {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
         Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
         Sed malesuada lobortis pretium.`}
    </div>
  );
  return (
    <Box>
      <Paper>
        <Grid container>
          <Grid item xs>
            <div>HAHAHA</div>
          </Grid>
          <Divider orientation="vertical" flexItem></Divider>
          <Grid item xs>
            <div>hihihi</div>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default NextPreviousAlertButton;
