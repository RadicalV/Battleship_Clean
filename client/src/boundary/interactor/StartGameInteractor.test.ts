import GameStorage from "services/api/GameStorage";
import { GameD2BConverter } from "./GameD2BConverter";
import Game from "domain/Game";
import Board from "domain/Board";
import BoundaryGame from "boundary/model/BoundaryGame";
import BoundaryBoard from "boundary/model/BoundaryBoard";
import { mock, MockProxy } from "jest-mock-extended";
import { StartGameInteractor } from "./StartGameInteractor";

describe("Start Game Interactor", () => {
  let gameStorage: MockProxy<GameStorage>;
  let gameD2BConverter: MockProxy<GameD2BConverter>;
  let startGameInteractor: StartGameInteractor;
  const gameId = "123";

  beforeEach(() => {
    gameStorage = mock<GameStorage>();
    gameD2BConverter = mock<GameD2BConverter>();
    startGameInteractor = new StartGameInteractor(
      gameStorage,
      gameD2BConverter
    );
  });

  it("creates a game and returns it", () => {
    const expectedGame: Game = new Game(gameId, true, new Board([], []));
    const expectedBoundaryGame: BoundaryGame = new BoundaryGame(
      gameId,
      true,
      new BoundaryBoard([], [])
    );

    gameStorage.startGame.calledWith().mockReturnValue(expectedGame);
    gameD2BConverter.convert
      .calledWith(expectedGame)
      .mockReturnValue(expectedBoundaryGame);

    const game = startGameInteractor.startGame();

    expect(game).toStrictEqual(expectedBoundaryGame);
  });
});
