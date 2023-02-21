import Game from "domain/Game";
import { InMemoryGameStorage } from "./InMemoryGameStorage";

describe("In memory game storage", () => {
  let inMemoryGameStorage: InMemoryGameStorage;
  let game: Game;

  beforeEach(() => {
    inMemoryGameStorage = new InMemoryGameStorage();
    game = inMemoryGameStorage.startGame();
  });

  it("creates game board that has a 10x10 grid filled with 0", () => {
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

  it("creates a game that is active", () => {
    expect(game.isActive).toBe(true);
  });

  it("finds and returns a game based on it's id", () => {
    const returnedGame = inMemoryGameStorage.getGame(game.id);

    expect(returnedGame.id).toEqual(game.id);
    expect(returnedGame.isActive).toEqual(game.isActive);
    expect(returnedGame.board).toEqual(game.board);
  });
});
