import { Box, Grid } from "@mui/material";
import React from "react";
import { useStyles } from "ui/styles";

interface Props {
  coordinates: { x: number; y: number };
  gridValue: number;
}

const Cell = (props: Props) => {
  const { coordinates, gridValue } = props;
  const { classes, cx, css } = useStyles();
  return (
    <Grid item md={1.2}>
      <Box
        className={cx(
          css(
            gridValue === 1
              ? { color: "black" }
              : gridValue === 2
              ? { color: "red" }
              : { color: "transparent" }
          ),
          classes.cell
        )}
        onClick={() => {}}
      >
        X
      </Box>
    </Grid>
  );
};

export default Cell;
