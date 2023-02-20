import GameStorage from "services/api/GameStorage";
import { GameD2BConverter } from "./GameD2BConverter";
import { GetGameInteractor } from "./GetGameInteractor";
import BoundaryGame from "boundary/model/BoundaryGame";
import Game from "domain/Game";
import Board from "domain/Board";
import { mock, MockProxy } from "jest-mock-extended";

describe("Get Game Interactor", () => {
  let gameStorage: MockProxy<GameStorage>;
  let gameD2BConverter: MockProxy<GameD2BConverter>;
  let getGameInteractor: GetGameInteractor;

  beforeEach(() => {
    gameStorage = mock<GameStorage>();
    gameD2BConverter = mock<GameD2BConverter>();
    getGameInteractor = new GetGameInteractor(gameStorage, gameD2BConverter);
  });

  it("Game is found and returned", () => {
    const expectedGame: Game = new Game("123", true, new Board([], []));
    const expectedBoundaryGame: BoundaryGame = new BoundaryGame("123", true);

    gameStorage.getGame.mockReturnValue(expectedGame);
    gameD2BConverter.convert.mockReturnValue(expectedBoundaryGame);

    const game = getGameInteractor.getGame("123");

    expect(game).toStrictEqual(expectedBoundaryGame);
  });
});
