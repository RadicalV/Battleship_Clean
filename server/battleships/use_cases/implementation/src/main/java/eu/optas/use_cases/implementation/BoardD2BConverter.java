package eu.optas.use_cases.implementation;

import eu.optas.domain.Board;
import eu.optas.use_cases.api.BoundaryBoard;
import eu.optas.utils.Converter;

public class BoardD2BConverter extends Converter<Board, BoundaryBoard> {
    private final ShipD2BConverter shipD2BConverter;

    public BoardD2BConverter(ShipD2BConverter shipD2BConverter) {
        this.shipD2BConverter = shipD2BConverter;
    }

    @Override
    public BoundaryBoard convert(Board board) {
        return new BoundaryBoard(board.getGrid(), shipD2BConverter.convertAll(board.getShips()));
    }
}
