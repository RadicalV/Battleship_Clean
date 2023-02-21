import Game from "domain/Game";
import Board from "domain/Board";
import Ship from "domain/Ship";
import BoundaryGame from "boundary/model/BoundaryGame";
import BoundaryBoard from "boundary/model/BoundaryBoard";
import { GameD2BConverter } from "./GameD2BConverter";
import { BoardD2BConverter } from "./BoardD2BConverter";
import { ShipD2BConverter } from "./ShipD2BConverter";
import { mock, MockProxy } from "jest-mock-extended";

describe(GameD2BConverter, () => {
  let gameConverter: GameD2BConverter;
  let boardConverter: MockProxy<BoardD2BConverter>;
  let shipConverter: MockProxy<ShipD2BConverter>;

  beforeEach(() => {
    shipConverter = mock<ShipD2BConverter>();
    boardConverter = mock<BoardD2BConverter>();
    gameConverter = new GameD2BConverter(boardConverter);
  });

  it("Converts Game model to BoundaryGame model", () => {
    const ships: Ship[] = [];
    const board = new Board([], ships);
    const expectedBoard = new BoundaryBoard([], []);
    const inputGame: Game = new Game("123", true, board);

    shipConverter.convertAll.calledWith(ships).mockReturnValue([]);
    boardConverter.convert.calledWith(board).mockReturnValue(expectedBoard);

    const expectedGame: BoundaryGame = new BoundaryGame(
      "123",
      true,
      boardConverter.convert(board)
    );

    const convertedGame = gameConverter.convert(inputGame);

    expect(convertedGame.id).toEqual(expectedGame.id);
    expect(convertedGame.isActive).toEqual(expectedGame.isActive);
    expect(convertedGame.board).toEqual(expectedGame.board);
  });
});
