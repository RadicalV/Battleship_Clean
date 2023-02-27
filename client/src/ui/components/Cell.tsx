import { Box, Grid } from "@mui/material";
import React from "react";
import { useStyles } from "ui/styles";
import { GridViewSharp } from "@mui/icons-material";

interface Props {
  gridValue: number;
  onCellClick: () => void;
}

const colors = ["black", "red"];

const pickColor = (gridValue: number): string => {
  return colors[gridValue - 1] || "transparent";
};

const Cell = (props: Props) => {
  const { gridValue, onCellClick } = props;
  const { classes, cx, css } = useStyles();

  //TODO figure out a better way to display destroyed ship

  return (
    <Grid item md={1.2}>
      {gridValue === 3 ? (
        <Box className={cx(css({ color: "red" }), classes.cell)}>
          <GridViewSharp sx={{ fontSize: "30px" }} />
        </Box>
      ) : (
        <Box
          className={cx(css({ color: pickColor(gridValue) }), classes.cell)}
          onClick={() => {
            gridValue === 0
              ? onCellClick()
              : console.log("Can't shoot at the same place twice");
          }}
        >
          X
        </Box>
      )}
    </Grid>
  );
};

export default Cell;
