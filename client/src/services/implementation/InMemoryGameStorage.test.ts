import Game from "domain/Game";
import { InMemoryGameStorage } from "./InMemoryGameStorage";
import { BehaviorSubject, mergeMap, switchMap, tap } from "rxjs";

describe("In memory game storage", () => {
  let inMemoryGameStorage: InMemoryGameStorage;

  beforeEach(() => {
    const gameSubject$ = new BehaviorSubject<Game[]>([]);
    inMemoryGameStorage = new InMemoryGameStorage(gameSubject$);
  });

  it("creates game board that has a 10x10 grid filled with 0", (done) => {
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
    inMemoryGameStorage.startGame().subscribe((game) => {
      expect(game.board.grid).toEqual(expectedGrid);
      done();
    });
  });

  it("creates a game that is active", (done) => {
    inMemoryGameStorage.startGame().subscribe((game) => {
      expect(game.active).toBe(true);
      done();
    });
  });

  it("finds and returns a game based on it's id", (done) => {
    let game: Game;

    inMemoryGameStorage
      .startGame()
      .pipe(
        switchMap((data) => {
          game = data;
          return inMemoryGameStorage.getGame(game.id);
        })
      )
      .subscribe({
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
