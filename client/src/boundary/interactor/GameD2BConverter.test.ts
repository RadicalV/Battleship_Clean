import Game from "domain/Game";
import Board from "domain/Board";
import BoundaryGame from "boundary/model/BoundaryGame";
import { GameD2BConverter } from "./GameD2BConverter";
import { BoardD2BConverter } from "./BoardD2BConverter";
import { ShipD2BConverter } from "./ShipD2BConverter";

describe(GameD2BConverter, () => {
  let gameConverter: GameD2BConverter;
  let boardConverter: BoardD2BConverter;
  let board: Board;

  beforeEach(() => {
    boardConverter = new BoardD2BConverter(new ShipD2BConverter());
    gameConverter = new GameD2BConverter(boardConverter);
    board = new Board([], []);
  });

  it("Converts Game model to BoundaryGame model", () => {
    const inputGame: Game = new Game("123", true, board);
    const expectedGame: BoundaryGame = new BoundaryGame(
      "123",
      true,
      boardConverter.convert(board)
    );

    expect(gameConverter.convert(inputGame)).toStrictEqual(expectedGame);
  });
});
