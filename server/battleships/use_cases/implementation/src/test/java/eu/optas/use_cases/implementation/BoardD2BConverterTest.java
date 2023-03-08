package eu.optas.use_cases.implementation;

import eu.optas.domain.Board;
import eu.optas.domain.Ship;
import eu.optas.use_cases.api.BoundaryBoard;
import eu.optas.use_cases.api.BoundaryShip;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;

class BoardD2BConverterTest {

    @Test
    void convert() {
        ShipD2BConverter shipD2BConverterMock = mock(ShipD2BConverter.class);
        BoardD2BConverter boardD2BConverter = new BoardD2BConverter(shipD2BConverterMock);

        List<List<Integer>> grid = new ArrayList<>();
        grid.add(new ArrayList<>(Arrays.asList(0, 0, 0, 0)));

        List<Ship> ships = new ArrayList<>();
        List<BoundaryShip> boundaryShips = new ArrayList<>();
        Board inputBoard = new Board(grid, ships);
        BoundaryBoard expectedBoard = new BoundaryBoard(grid, boundaryShips);

        BoundaryBoard convertedBoard = boardD2BConverter.convert(inputBoard);

        assertThat(convertedBoard.getGrid()).isEqualTo(expectedBoard.getGrid());
        assertThat(convertedBoard.getShips()).isEqualTo(expectedBoard.getShips());
    }
}