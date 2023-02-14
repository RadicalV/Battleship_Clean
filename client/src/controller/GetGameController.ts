import { GetGameInteractor } from "boundary/interactor/GetGameInteractor";

export class GetGameController {
  private getGameInteractor: GetGameInteractor;

  constructor(getGameInteractor: GetGameInteractor) {
    this.getGameInteractor = getGameInteractor;
  }

  getGame(id: string) {
    return this.getGameInteractor.getGame(id);
  }
}
