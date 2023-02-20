import { GetBoardInteractor } from "./GetBoardInteractor";
import BoundaryBoard from "boundary/model/BoundaryBoard";
import { mock, MockProxy } from "jest-mock-extended";
import GameStorage from "services/api/GameStorage";
import Board from "domain/Board";
import { GameD2BConverter } from "./GameD2BConverter";

describe("Get board interactor", () => {
  let gameStorage: MockProxy<GameStorage>;
  let gameD2BConverter: MockProxy<GameD2BConverter>;
  let getBoardInteractor: GetBoardInteractor;

  beforeEach(() => {
    gameStorage = mock<GameStorage>();
    gameD2BConverter = mock<GameD2BConverter>();
    getBoardInteractor = new GetBoardInteractor(gameStorage, gameD2BConverter);
  });

  it("Board is returned", () => {
    const expectedDomainBoard: Board = new Board([], []);
    const expectedBoundaryBoard: BoundaryBoard = new BoundaryBoard([], []);

    gameStorage.getBoard.mockReturnValue(expectedDomainBoard);
    gameD2BConverter.convertBoard.mockReturnValue(expectedBoundaryBoard);

    const board = getBoardInteractor.getBoard("123");

    expect(board).toStrictEqual(expectedBoundaryBoard);
  });
});
