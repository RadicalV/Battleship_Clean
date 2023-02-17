import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(() => ({
  mainWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    flexDirection: "column",
    gap: 40,
  },
}));
