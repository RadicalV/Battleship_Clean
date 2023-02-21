import GameStorage from "services/api/GameStorage";
import Game from "domain/Game";
import Board from "domain/Board";
import Ship from "domain/Ship";
import { BehaviorSubject, map, take } from "rxjs";

export class InMemoryGameStorage implements GameStorage {
  private gameSubject$ = new BehaviorSubject<Game[]>([]);

  getGame(id: string): Game {
    let game: Game | undefined;

    this.gameSubject$
      .pipe(
        take(1),
        map((games) => games.find((g) => g.id === id))
      )
      .subscribe((foundGame) => {
        game = foundGame;
      });

    return game ? game : this.startGame();
  }

  startGame(): Game {
    const board = this.makeBoard();
    const gameId = this.generateRandomId();
    const game = new Game(gameId, true, board);
    this.addGame(game);

    return game;
  }

  private makeBoard(): Board {
    const grid: number[][] = this.createGrid();
    const ships: Ship[] = [];
    return new Board(grid, ships);
  }

  private createGrid(): number[][] {
    return Array(10).fill(Array(10).fill(0));
  }

  private generateRandomId(): string {
    return Math.random().toString(36).substring(2);
  }

  private addGame(game: Game): void {
    this.gameSubject$
      .pipe(
        take(1),
        map((games) => {
          const updatedGames = [...games];
          updatedGames.push(game);
          return updatedGames;
        })
      )
      .subscribe((updatedGames) => {
        this.gameSubject$.next(updatedGames);
      });
  }
}
