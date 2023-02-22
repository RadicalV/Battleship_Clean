import Game from "domain/Game";
import { InMemoryGameStorage } from "./InMemoryGameStorage";
import { BehaviorSubject } from "rxjs";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

describe("In memory game storage", () => {
  let inMemoryGameStorage: InMemoryGameStorage;
  let game: Game;

  beforeEach(() => {
    const gameSubject$ = new BehaviorSubject<Game[]>([]);
    inMemoryGameStorage = new InMemoryGameStorage(gameSubject$);
    inMemoryGameStorage.startGame().subscribe((data) => {
      game = data;
    });
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
    expect(game.active).toBe(true);
  });

  it("finds and returns a game based on it's id", (done) => {
    inMemoryGameStorage.getGame(game.id).subscribe({
      next: (returnedGame) => {
        expect(returnedGame.id).toEqual(game.id);
        expect(returnedGame.active).toEqual(game.active);
        expect(returnedGame.board).toEqual(game.board);
        done();
      },
      error: (error) => {
        done(error);
      },
    });
  });
});
