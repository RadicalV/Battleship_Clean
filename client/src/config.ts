import { FakeGameStorage } from "./services/fake/FakeGameStorage";
import { GetGameInteractor } from "./boundary/interactor/GetGameInteractor";
import { GameController } from "./controllers/implementation/GameController";
import { GameD2BConverter } from "./boundary/interactor/GameD2BConverter";
import { GameB2VConverter } from "./controllers/implementation/GameB2VConverter";
import { ShipD2BConverter } from "./boundary/interactor/ShipD2BConverter";
import { BoardD2BConverter } from "./boundary/interactor/BoardD2BConverter";
import { BoardB2VConverter } from "./controllers/implementation/BoardB2VConverter";
import { StartGameInteractor } from "./boundary/interactor/StartGameInteractor";
import { InMemoryGameStorage } from "./services/implementation/InMemoryGameStorage";
import { BehaviorSubject } from "rxjs";
import Game from "./domain/Game";

const fakeGameStorage = new FakeGameStorage();

const gameSubject$ = new BehaviorSubject<Game[]>([]);
const inMemoryGameStorage = new InMemoryGameStorage(gameSubject$);

const shipD2BConverter = new ShipD2BConverter();
const boardD2BConverter = new BoardD2BConverter(shipD2BConverter);
const gameD2BConverter = new GameD2BConverter(boardD2BConverter);

const gameInteractor = new GetGameInteractor(
  inMemoryGameStorage,
  gameD2BConverter
);
const startGameInteractor = new StartGameInteractor(
  inMemoryGameStorage,
  gameD2BConverter
);

const boardB2VConverter = new BoardB2VConverter();
const gameB2VConverter = new GameB2VConverter(boardB2VConverter);

export const gameController = new GameController(
  gameInteractor,
  startGameInteractor,
  gameB2VConverter
);
