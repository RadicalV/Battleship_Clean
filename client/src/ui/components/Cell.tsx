import { Box, Grid } from "@mui/material";
import React from "react";
import { useStyles } from "ui/styles";
import { GpsFixedSharp } from "@mui/icons-material";

interface Props {
  gridValue: number;
  onCellClick: () => void;
  testId: string;
}

const colors = ["black", "red", "red"];

const pickColor = (gridValue: number): string => {
  return colors[gridValue - 1] || "transparent";
};

const Cell = (props: Props) => {
  const { gridValue, onCellClick, testId } = props;
  const { classes, cx, css } = useStyles();

  return (
    <Grid item md={1.2} data-testid={`cell-item${testId}`}>
      <Box
        className={cx(css({ color: pickColor(gridValue) }), classes.cell)}
        data-testid="cell-text"
        onClick={() => {
          gridValue === 0
            ? onCellClick()
            : console.log("Can't shoot at the same place twice");
        }}
      >
        {gridValue === 3 ? (
          <GpsFixedSharp
            sx={{ fontSize: "40px" }}
            data-testid="destroyed-icon"
          />
        ) : (
          "X"
        )}
      </Box>
    </Grid>
  );
};

export default Cell;
