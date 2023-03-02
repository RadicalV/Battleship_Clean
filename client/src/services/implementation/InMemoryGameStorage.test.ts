import { Game, Board, Ship } from "domain/index";
import { InMemoryGameStorage } from "./InMemoryGameStorage";
import { BehaviorSubject, Subject } from "rxjs";
import { mock } from "jest-mock-extended";
import { IN_PROGRESS, WON, LOST } from "utils/Constants";

describe("In memory game storage", () => {
  let inMemoryGameStorage: InMemoryGameStorage;
  let gameSubject$: Subject<Game[]>;

  beforeEach(() => {
    gameSubject$ = new BehaviorSubject<Game[]>([]);
    inMemoryGameStorage = new InMemoryGameStorage(gameSubject$);
  });

  it("creates a game and adds it pushes it to subject", (done) => {
    const subjectSpy = jest.spyOn(gameSubject$, "next");

    inMemoryGameStorage.startGame().subscribe((game) => {
      expect(subjectSpy).toBeCalledWith([game]);
      done();
    });
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

  it("creates a game that is in progress", (done) => {
    inMemoryGameStorage.startGame().subscribe((game) => {
      expect(game.state).toBe(IN_PROGRESS);
      done();
    });
  });

  it("finds and returns a game based on it's id", (done) => {
    const id = "test";
    const game: Game = new Game(id, IN_PROGRESS, mock<Board>(), 25, 0);

    gameSubject$.next([game]);

    inMemoryGameStorage.getGame(id).subscribe({
      next: (returnedGame) => {
        expect(returnedGame.id).toEqual(game.id);
        expect(returnedGame.state).toEqual(game.state);
        expect(returnedGame.board).toEqual(game.board);
        done();
      },
      error: (error) => {
        done(error);
      },
    });
  });

  it("doesn't find a game and returns an error", (done) => {
    let id = "123";
    inMemoryGameStorage.getGame(id).subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(Error);
        done();
      },
    });
  });

  it("shoots at given coordinates and returns shotResult when miss", (done) => {
    const id = "123456";
    const coordinateX = 1;
    const coordinateY = 1;
    const game: Game = new Game(
      id,
      IN_PROGRESS,
      new Board(
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        [
          new Ship(
            2,
            [
              { x: 0, y: 0 },
              { x: 0, y: 1 },
            ],
            0
          ),
        ]
      ),
      25,
      0
    );

    const expectedGrid = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];

    gameSubject$.next([game]);

    inMemoryGameStorage.shoot(id, coordinateX, coordinateY).subscribe({
      next: (shotResult) => {
        expect(shotResult.grid).toEqual(expectedGrid);
        expect(shotResult.ship).toBe(undefined);
        expect(shotResult.gameState).toEqual(IN_PROGRESS);
        done();
      },
    });
  });

  it("shoots at given coordinates and returns shotResult with hit ship", (done) => {
    const id = "123456";
    const coordinateX = 0;
    const coordinateY = 1;
    const game: Game = new Game(
      id,
      IN_PROGRESS,
      new Board(
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        [
          new Ship(
            2,
            [
              { x: 0, y: 0 },
              { x: 0, y: 1 },
            ],
            0
          ),
        ]
      ),
      25,
      0
    );

    const expectedGrid = [
      [0, 2, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    gameSubject$.next([game]);

    inMemoryGameStorage.shoot(id, coordinateX, coordinateY).subscribe({
      next: (shotResult) => {
        expect(shotResult.grid).toEqual(expectedGrid);
        expect(shotResult.ship!.hits).toBe(1);
        expect(shotResult.ship!.destroyed).toBe(false);
        expect(shotResult.gameState).toEqual(IN_PROGRESS);
        done();
      },
    });
  });

  it("shoots at given coordinates and returns shotResult with destroyed ship", (done) => {
    const id = "123456";
    const coordinateX = 1;
    const coordinateY = 1;
    const game: Game = new Game(
      id,
      IN_PROGRESS,
      new Board(
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        [new Ship(1, [{ x: 1, y: 1 }], 0), mock<Ship>()]
      ),
      25,
      0
    );

    const expectedGrid = [
      [0, 0, 0],
      [0, 3, 0],
      [0, 0, 0],
    ];

    gameSubject$.next([game]);

    inMemoryGameStorage.shoot(id, coordinateX, coordinateY).subscribe({
      next: (shotResult) => {
        expect(shotResult.grid).toEqual(expectedGrid);
        expect(shotResult.ship!.hits).toBe(1);
        expect(shotResult.ship!.destroyed).toBe(true);
        expect(shotResult.gameState).toEqual(IN_PROGRESS);
        done();
      },
    });
  });

  it("shoots at given coordinates and returns shotResult with gameState WON", (done) => {
    const id = "123456";
    const coordinateX = 1;
    const coordinateY = 1;
    const game: Game = new Game(
      id,
      IN_PROGRESS,
      new Board(
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        [new Ship(1, [{ x: 1, y: 1 }], 0)]
      ),
      25,
      0
    );

    const expectedGrid = [
      [0, 0, 0],
      [0, 3, 0],
      [0, 0, 0],
    ];

    gameSubject$.next([game]);

    inMemoryGameStorage.shoot(id, coordinateX, coordinateY).subscribe({
      next: (shotResult) => {
        expect(shotResult.grid).toEqual(expectedGrid);
        expect(shotResult.ship!.hits).toBe(1);
        expect(shotResult.ship!.destroyed).toBe(true);
        expect(shotResult.gameState).toEqual(WON);
        done();
      },
    });
  });

  it("shoots at given coordinates and returns shotResult with gameState LOST", (done) => {
    const id = "123456";
    const coordinateX = 1;
    const coordinateY = 1;
    const game: Game = new Game(
      id,
      IN_PROGRESS,
      new Board(
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        [
          new Ship(
            2,
            [
              { x: 0, y: 0 },
              { x: 0, y: 1 },
            ],
            0
          ),
        ]
      ),
      1,
      0
    );

    const expectedGrid = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];

    gameSubject$.next([game]);

    inMemoryGameStorage.shoot(id, coordinateX, coordinateY).subscribe({
      next: (shotResult) => {
        expect(shotResult.grid).toEqual(expectedGrid);
        expect(shotResult.ship).toBe(undefined);
        expect(shotResult.gameState).toEqual(LOST);
        done();
      },
    });
  });

  it("returns game stats", (done) => {
    const game: Game = new Game(
      "123",
      IN_PROGRESS,
      new Board(
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        [new Ship(1, [{ x: 1, y: 1 }], 0)]
      ),
      25,
      0
    );
    gameSubject$.next([game]);

    inMemoryGameStorage.getGameStats("123").subscribe({
      next: (gameStats) => {
        expect(gameStats.hitsRemaining).toBe(25);
        expect(gameStats.shipsDestroyed).toBe(0);
        done();
      },
    });
  });
});
