import Game from "./domain/Game";
import {
  GetGameInteractor,
  GameD2BConverter,
  ShipD2BConverter,
  BoardD2BConverter,
  StartGameInteractor,
  ShootInteractor,
  ShotResultD2BConverter,
  GameStatsD2BConverter,
  GetGameStatsInteractor,
} from "./boundary/interactor/";
import {
  GameController,
  GameB2VConverter,
  BoardB2VConverter,
  ShotResultB2VConverter,
  ShipB2VConverter,
  GameStatsController,
  GameStatsB2VConverter,
} from "./controllers/implementation/";
import { InMemoryGameStorage } from "./services/implementation/InMemoryGameStorage";
import { BehaviorSubject } from "rxjs";
import { RestGameGateway } from "./services/implementation/RestGameGateway";

const gameSubject$ = new BehaviorSubject<Game[]>([]);
const inMemoryGameStorage = new InMemoryGameStorage(gameSubject$);
const restGameGateway = new RestGameGateway();

const shipD2BConverter = new ShipD2BConverter();

const boardD2BConverter = new BoardD2BConverter(shipD2BConverter);
const gameD2BConverter = new GameD2BConverter(boardD2BConverter);
const shotResultD2BConverter = new ShotResultD2BConverter(shipD2BConverter);
const gameStatsD2BConverter = new GameStatsD2BConverter();

const gameInteractor = new GetGameInteractor(restGameGateway, gameD2BConverter);
const startGameInteractor = new StartGameInteractor(
  restGameGateway,
  gameD2BConverter
);
const shootInteractor = new ShootInteractor(
  restGameGateway,
  shotResultD2BConverter
);
const getGameStatsInteractor = new GetGameStatsInteractor(
  restGameGateway,
  gameStatsD2BConverter
);

const boardB2VConverter = new BoardB2VConverter();
const gameB2VConverter = new GameB2VConverter(boardB2VConverter);
const shipB2VConverter = new ShipB2VConverter();
const shotResultB2VConverter = new ShotResultB2VConverter(shipB2VConverter);
const gameStatsB2VConverter = new GameStatsB2VConverter();

export const gameController = () =>
  new GameController(
    gameInteractor,
    startGameInteractor,
    shootInteractor,
    gameB2VConverter,
    shotResultB2VConverter
  );

export const gameStatsController = () =>
  new GameStatsController(getGameStatsInteractor, gameStatsB2VConverter);
