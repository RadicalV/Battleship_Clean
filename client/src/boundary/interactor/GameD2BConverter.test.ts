import Game from "domain/Game";
import BoundaryGame from "boundary/model/BoundaryGame";
import { GameD2BConverter } from "./GameD2BConverter";
import Board from "domain/Board";
import BoundaryBoard from "boundary/model/BoundaryBoard";

describe("Domain model conversion to boundary model", () => {
  let converter: GameD2BConverter;

  beforeEach(() => {
    converter = new GameD2BConverter();
  });

  it("Convert Game model to BoundaryGame model", () => {
    const beforeConversionGame: Game = new Game("123", true, new Board([], []));
    const afterConversionGame: BoundaryGame = new BoundaryGame("123", true);

    expect(converter.convert(beforeConversionGame)).toStrictEqual(
      afterConversionGame
    );
  });

  it("Convert Board model to BoundaryBoard model", () => {
    const beforeConversionBoard: Board = new Board([], []);
    const afterConversionBoard: BoundaryBoard = new BoundaryBoard([], []);

    expect(converter.convertBoard(beforeConversionBoard)).toStrictEqual(
      afterConversionBoard
    );
  });
});
