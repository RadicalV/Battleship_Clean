import { makeStyles } from "tss-react/mui";
import Water from "./water.jpg";
import Sand from "./sand.jpg";

export const useStyles = makeStyles()(() => ({
  mainWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    flexDirection: "column",
    gap: 10,
  },
  gameWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  gameStatsWrapper: {
    display: "flex",
    width: "700px",
    justifyContent: "space-around",
    padding: 30,
    boxSizing: "border-box",
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
    padding: 50,
    border: "5px solid",
    borderRadius: "45px",
    borderColor: "rgb(132,112,88)",
    backgroundImage: `url(${Sand})`,
    backgroundPosition: "center",
    backgroundSize: "700px 700px",
  },
  grid: {
    width: 600,
    backgroundImage: `url(${Water})`,
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
  statsItem: {
    border: "3px solid black",
    borderRadius: "15px",
    width: "300px",
    padding: 10,
    fontSize: "2rem",
    fontFamily: "Bangers",
    userSelect: "none",
    display: "flex",
    justifyContent: "center",
    gap: 15,
  },
  statsItemHighlight: {
    color: "rgb(212,40,117)",
  },
}));
