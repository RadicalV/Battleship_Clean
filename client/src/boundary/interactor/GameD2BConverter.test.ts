import { Game, Board, Ship } from "domain/index";
import { BoundaryGame, BoundaryBoard } from "boundary/model/index";
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
    const ships: Ship[] = [mock<Ship>()];
    const board = mock<Board>();
    const expectedBoard = mock<BoundaryBoard>();
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
    expect(convertedGame.active).toEqual(expectedGame.active);
    expect(convertedGame.board).toEqual(expectedGame.board);
  });
});
