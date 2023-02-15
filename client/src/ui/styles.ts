import { makeStyles } from "tss-react/mui";
import { unstable_styleFunctionSx } from "@mui/system";
import { CSSObject } from "tss-react";

export const styleFunctionSx = unstable_styleFunctionSx as (
  params: object
) => CSSObject;

export const useStyles = makeStyles()((theme) => ({
  mainWrapper: styleFunctionSx({
    theme,
    sx: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
      flexDirection: "column",
      gap: 4,
    },
  }),
}));
