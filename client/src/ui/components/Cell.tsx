import { Box, Grid } from "@mui/material";
import React from "react";
import { useStyles } from "ui/styles";

interface Props {
  coordinates: { x: number; y: number };
  gridValue: number;
}

const colors = ["black", "red"];

const pickColor = (gridValue: number): string => {
  return colors[gridValue - 1] || "transparent";
};

const Cell = (props: Props) => {
  const { coordinates, gridValue } = props;
  const { classes, cx, css } = useStyles();

  return (
    <Grid item md={1.2}>
      <Box
        className={cx(css({ color: pickColor(gridValue) }), classes.cell)}
        onClick={() => {}}
      >
        X
      </Box>
    </Grid>
  );
};

export default Cell;
