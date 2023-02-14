import { FakeGameStorage } from "./services/fake/FakeGameStorage";
import { GetGameInteractor } from "./boundary/interactor/GetGameInteractor";
import { GetGameController } from "./controller/GetGameController";

const gameStorage = new FakeGameStorage();
const gameInteractor = new GetGameInteractor(gameStorage);

export const getGameController = new GetGameController(gameInteractor);
