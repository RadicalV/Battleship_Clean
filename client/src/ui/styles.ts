import { makeStyles } from "tss-react/mui";
import Image from "./water.jpg";

export const useStyles = makeStyles()(() => ({
  mainWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    flexDirection: "column",
    gap: 10,
  },
  boardWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 50,
  },
  title: {
    fontWeight: "600",
    fontFamily: "Bangers",
    fontSize: "10rem",
    letterSpacing: 5,
  },
  gameTitle: {
    fontFamily: "Bangers",
    marginBottom: 20,
    letterSpacing: 2,
  },
  startGameBtn: {
    fontSize: "3rem",
  },
  gridWrapper: {
    padding: 30,
    border: "5px solid black",
    borderRadius: "25px",
  },
  grid: {
    width: 600,
    backgroundImage: `url(${Image})`,
    backgroundPosition: "center",
    backgroundSize: "600px 600px",
  },
  cell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "60px",
    height: "60px",
    backgroundColor: "rgba(200, 255, 255, 0.15)",
    outline: "1px solid",
    outlineColor: "rgba(137, 207, 240, 0.5)",
    fontFamily: "Permanent Marker",
    fontSize: "40px",
    userSelect: "none",
    "&:hover": {
      backgroundColor: "rgba(172,226,226, 0.5)",
      cursor: "pointer",
    },
  },
}));
