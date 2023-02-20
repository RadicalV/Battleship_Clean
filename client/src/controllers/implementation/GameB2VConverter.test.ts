import BoundaryGame from "boundary/model/BoundaryGame";
import { ViewGame } from "controllers/model/ViewGame";
import { GameB2VConverter } from "./GameB2VConverter";

describe("Boundary game model conversion to view model", () => {
  let converter: GameB2VConverter;

  beforeEach(() => {
    converter = new GameB2VConverter();
  });

  it("Convert BoundaryGame model to ViewGame model", () => {
    const beforeConversionGame: BoundaryGame = new BoundaryGame("123", true);
    const afterConversionGame: ViewGame = new ViewGame("123", true);

    expect(converter.convert(beforeConversionGame)).toStrictEqual(
      afterConversionGame
    );
  });
});