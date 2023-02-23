import { FakeGameStorage } from "./FakeGameStorage";
import Game from "domain/Game";

describe("Fake game storage getGame", () => {
  let fakeGameStorage: FakeGameStorage;
  let game: Game;
  let gameId: string = "1";

  beforeEach(() => {
    fakeGameStorage = new FakeGameStorage();
    fakeGameStorage.getGame(gameId).subscribe((data) => {
      game = data;
    });
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
    expect(game.active).toBe(true);
  });
});
