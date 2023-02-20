import { FakeGameStorage } from "./FakeGameStorage";
import Game from "domain/Game";

describe("Fake game storage getGame", () => {
  let fakeGameStorage: FakeGameStorage;
  let game: Game;
  let gameId: string = "1";

  beforeEach(() => {
    fakeGameStorage = new FakeGameStorage();
    game = fakeGameStorage.getGame(gameId);
  });

  it("creates a 10x10 grid filled with 0", () => {
    const expectedGrid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const createdGrid = game.board.grid;

    expect(createdGrid).toEqual(expectedGrid);
  });

  it("created board has no ships", () => {
    const createdBoardShips = game.board.ships;

    expect(createdBoardShips).toEqual([]);
  });

  it("created game is active", () => {
    expect(game.isActive).toBe(true);
  });
});

describe("Fake game storage getBoard", () => {
  let fakeGameStorage: FakeGameStorage;
  let game: Game;
  let gameId: string = "123";

  beforeEach(() => {
    fakeGameStorage = new FakeGameStorage();
    game = fakeGameStorage.getGame(gameId);
  });

  it("returns game board", () => {
    const board = fakeGameStorage.getBoard(gameId);

    expect(board).toStrictEqual(game.board);
  });
});
