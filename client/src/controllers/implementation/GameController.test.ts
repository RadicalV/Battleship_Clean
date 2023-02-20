import { mock, MockProxy } from "jest-mock-extended";
import { GetGameUC } from "boundary/api/GetGameUC";
import { GameController } from "./GameController";
import { GameB2VConverter } from "./GameB2VConverter";
import { ViewGame } from "controllers/model/ViewGame";
import BoundaryGame from "boundary/model/BoundaryGame";

describe("Game Controller", () => {
  let getGameUC: MockProxy<GetGameUC>;
  let gameConverter: MockProxy<GameB2VConverter>;
  let gameController: GameController;

  beforeEach(() => {
    getGameUC = mock<GetGameUC>();
    gameConverter = mock<GameB2VConverter>();
    gameController = new GameController(getGameUC, gameConverter);
  });

  it("Game is found and returned", () => {
    const expectedBoundaryGame = new BoundaryGame("123", true);
    const expectedViewGame = new ViewGame("123", true);

    getGameUC.getGame.mockReturnValue(expectedBoundaryGame);
    gameConverter.convert.mockReturnValue(expectedViewGame);

    const game = gameController.getGame("123");

    expect(game).toStrictEqual(expectedViewGame);
  });
});
