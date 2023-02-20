import { GetBoardInteractor } from "./GetBoardInteractor";
import BoundaryBoard from "boundary/model/BoundaryBoard";
import { mock, MockProxy } from "jest-mock-extended";
import GameStorage from "services/api/GameStorage";
import Board from "domain/Board";
import { BoardD2BConverter } from "./BoardD2BConverter";

// Up for deletion if the changes to boundaryGame model and converters are good

describe("Get board interactor", () => {
  let gameStorage: MockProxy<GameStorage>;
  let boardD2BConverter: MockProxy<BoardD2BConverter>;
  let getBoardInteractor: GetBoardInteractor;
  const inputId = "123";

  beforeEach(() => {
    gameStorage = mock<GameStorage>();
    boardD2BConverter = mock<BoardD2BConverter>();
    getBoardInteractor = new GetBoardInteractor(gameStorage, boardD2BConverter);
  });

  it("returns board", () => {
    const expectedDomainBoard: Board = new Board([], []);
    const expectedBoundaryBoard: BoundaryBoard = new BoundaryBoard([], []);

    gameStorage.getBoard
      .calledWith(inputId)
      .mockReturnValue(expectedDomainBoard);

    boardD2BConverter.convert
      .calledWith(expectedDomainBoard)
      .mockReturnValue(expectedBoundaryBoard);

    const board = getBoardInteractor.getBoard(inputId);

    expect(board).toStrictEqual(expectedBoundaryBoard);
  });
});
