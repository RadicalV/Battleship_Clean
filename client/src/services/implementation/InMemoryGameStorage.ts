import GameStorage from "services/api/GameStorage";
import { Game, Board, Ship, ShotResult, GameStats } from "domain/index";
import {
  first,
  map,
  Observable,
  switchMap,
  throwError,
  of,
  Subject,
  take,
} from "rxjs";
import { IN_PROGRESS, WON, LOST } from "utils/Constants";

export class InMemoryGameStorage implements GameStorage {
  private gameSubject$: Subject<Game[]>;

  constructor(gameSubject$: Subject<Game[]>) {
    this.gameSubject$ = gameSubject$;
  }

  getGame(id: string): Observable<Game> {
    return this.gameSubject$.pipe(
      first(),
      map((games) => games.filter((g) => g.id === id)),
      map((matchingGames) => matchingGames[matchingGames.length - 1]),
      switchMap((game) =>
        game ? of(game) : throwError(() => new Error("Game not found"))
      )
    );
  }

  startGame(): Observable<Game> {
    const board = this.makeBoard();
    const gameId = this.generateRandomId();
    const game = new Game(gameId, IN_PROGRESS, board, 25, 0);

    return this.addGame(game);
  }

  shoot(gameId: string, x: number, y: number): Observable<ShotResult> {
    return this.getGame(gameId).pipe(
      switchMap((game) => this.checkShot(game, x, y))
    );
  }

  getGameStats(gameId: string): Observable<GameStats> {
    return this.getGame(gameId).pipe(
      map((game) => new GameStats(game.hitsRemaining, game.shipsDestroyed))
    );
  }

  private makeBoard(): Board {
    const grid: number[][] = this.createGrid();
    const ships: Ship[] = this.createShips();
    return new Board(grid, ships);
  }

  private createGrid(): number[][] {
    const arr = [];
    for (let i = 0; i < 10; i++) arr.push(Array(10).fill(0));
    return arr;
  }

  private createShips(): Ship[] {
    const ships: Ship[] = [];
    ships.push(new Ship(1, [{ x: 0, y: 0 }], 0));
    ships.push(new Ship(1, [{ x: 0, y: 3 }], 0));
    ships.push(
      new Ship(
        2,
        [
          { x: 0, y: 5 },
          { x: 0, y: 6 },
        ],
        0
      )
    );
    ships.push(
      new Ship(
        4,
        [
          { x: 9, y: 6 },
          { x: 9, y: 7 },
          { x: 9, y: 8 },
          { x: 9, y: 9 },
        ],
        0
      )
    );

    return ships;
  }

  private generateRandomId(): string {
    return Math.random().toString(36).substring(2);
  }

  private addGame(game: Game): Observable<Game> {
    return this.gameSubject$.pipe(
      first(),
      map((games) => {
        const updatedGames = [...games];
        updatedGames.push(game);
        this.gameSubject$.next(updatedGames);
        return game;
      })
    );
  }

  private checkShot(game: Game, x: number, y: number): Observable<ShotResult> {
    const foundShip = this.checkForShip(game, x, y);

    let newShip: Ship | undefined;

    if (foundShip)
      newShip = new Ship(
        foundShip.length,
        foundShip.coordinates,
        foundShip.hits + 1,
        foundShip.length <= foundShip.hits + 1 ? true : foundShip.destroyed
      );

    const updatedGame = this.updateGame(newShip, foundShip, game, x, y);

    return this.addGame(updatedGame).pipe(
      map((game) => new ShotResult(game.board.grid, game.state, newShip)),
      take(1)
    );
  }

  private checkForShip(game: Game, x: number, y: number) {
    return game.board.ships.find((ship) => {
      const cords = ship.coordinates.find((c) => c.x === x && c.y === y);
      return cords ? ship : undefined;
    });
  }

  private updateGame(
    newShip: Ship | undefined,
    foundShip: Ship | undefined,
    game: Game,
    x: number,
    y: number
  ): Game {
    const ships = game.board.ships;
    const grid = game.board.grid;
    let shipsDestroyed = game.shipsDestroyed;
    let hitsRemaining = game.hitsRemaining;
    let gameState = game.state;

    if (foundShip && newShip) {
      const index = game.board.ships.indexOf(foundShip);
      ships[index] = newShip;
      if (newShip.destroyed) {
        newShip.coordinates.map(
          (coordinate) => (grid[coordinate.x][coordinate.y] = 3)
        );
        shipsDestroyed += 1;
      } else grid[x][y] = 2;
    } else {
      grid[x][y] = 1;
      hitsRemaining -= 1;
    }

    if (shipsDestroyed >= ships.length) gameState = WON;
    else if (hitsRemaining <= 0) gameState = LOST;

    return new Game(
      game.id,
      gameState,
      new Board(grid, ships),
      hitsRemaining,
      shipsDestroyed
    );
  }
}
