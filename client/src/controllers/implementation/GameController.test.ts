import { mock, MockProxy } from "jest-mock-extended";
import { GetGameUC } from "boundary/api/GetGameUC";
import { GameController } from "./GameController";
import { GameB2VConverter } from "./GameB2VConverter";
import { ViewGame } from "controllers/model/ViewGame";
import BoundaryGame from "boundary/model/BoundaryGame";
import BoundaryBoard from "../../boundary/model/BoundaryBoard";

describe("Game Controller", () => {
  let getGameUC: MockProxy<GetGameUC>;
  let gameConverter: MockProxy<GameB2VConverter>;
  let gameController: GameController;
  const inputId = "123";

  beforeEach(() => {
    getGameUC = mock<GetGameUC>();
    gameConverter = mock<GameB2VConverter>();
    gameController = new GameController(getGameUC, gameConverter);
  });

  it("finds game and returns it", () => {
    const expectedBoundaryGame = new BoundaryGame(
      inputId,
      true,
      new BoundaryBoard([], [])
    );
    const expectedViewGame = new ViewGame(inputId, true);

    getGameUC.getGame.calledWith(inputId).mockReturnValue(expectedBoundaryGame);
    gameConverter.convert
      .calledWith(expectedBoundaryGame)
      .mockReturnValue(expectedViewGame);

    const game = gameController.getGame(inputId);

    expect(game).toStrictEqual(expectedViewGame);
  });
});
