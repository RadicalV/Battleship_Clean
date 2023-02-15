import { FakeGameStorage } from "./services/fake/FakeGameStorage";
import { GetGameInteractor } from "./boundary/interactor/GetGameInteractor";
import { GameController } from "./controllers/implementation/GameController";
import { GameD2BConverter } from "./boundary/interactor/GameD2BConverter";
import { GameB2VConverter } from "./controllers/implementation/GameB2VConverter";

const gameStorage = new FakeGameStorage();
const gameD2BConverter = new GameD2BConverter();
const gameInteractor = new GetGameInteractor(gameStorage, gameD2BConverter);
const gameB2VConverter = new GameB2VConverter();

export const getGameController = new GameController(
  gameInteractor,
  gameB2VConverter
);
