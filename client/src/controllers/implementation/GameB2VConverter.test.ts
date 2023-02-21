import BoundaryGame from "boundary/model/BoundaryGame";
import BoundaryBoard from "boundary/model/BoundaryBoard";
import { ViewGame } from "controllers/model/ViewGame";
import { GameB2VConverter } from "./GameB2VConverter";

describe("Boundary game model conversion to view model", () => {
  let converter: GameB2VConverter;

  beforeEach(() => {
    converter = new GameB2VConverter();
  });

  it("Converts BoundaryGame model to ViewGame model", () => {
    const inputGame: BoundaryGame = new BoundaryGame(
      "123",
      true,
      new BoundaryBoard([], [])
    );
    const expectedGame: ViewGame = new ViewGame("123", true);

    expect(converter.convert(inputGame)).toStrictEqual(expectedGame);
  });
});
