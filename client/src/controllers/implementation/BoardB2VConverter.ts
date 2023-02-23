import { Converter } from "utils/Converter";
import BoundaryBoard from "boundary/model/BoundaryBoard";
import ViewBoard from "controllers/model/ViewBoard";

export class BoardB2VConverter extends Converter<BoundaryBoard, ViewBoard> {
  convert(board: BoundaryBoard): ViewBoard {
    return new ViewBoard(board.grid);
  }
}
