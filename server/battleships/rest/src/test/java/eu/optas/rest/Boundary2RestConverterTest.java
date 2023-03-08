package eu.optas.rest;

import eu.optas.use_cases.api.BoundaryBoard;
import eu.optas.use_cases.api.BoundaryGame;
import eu.optas.use_cases.api.BoundaryShip;
import eu.optas.utils.Coordinates;
import eu.optas.utils.GameState;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;

class Boundary2RestConverterTest {
    private Boundary2RestConverter boundary2RestConverter;

    @BeforeEach
    void setUp() {
        boundary2RestConverter = new Boundary2RestConverter();
    }

    @Test
    void convertGame() {
        BoundaryBoard boundaryBoard = mock(BoundaryBoard.class);
        RestBoard restBoard = mock(RestBoard.class);

        BoundaryGame boundaryGame = new BoundaryGame("test", GameState.IN_PROGRESS, boundaryBoard, 25, 0);
        RestGame restGame = new RestGame("test", GameState.IN_PROGRESS, restBoard, 25, 0);

        RestGame convertedGame = boundary2RestConverter.convertGame(boundaryGame);

        assertThat(convertedGame).usingRecursiveComparison().isEqualTo(restGame);
    }

    @Test
    void convertBoard() {
        BoundaryShip boundaryShip = mock(BoundaryShip.class);
        RestShip restShip = mock(RestShip.class);
        BoundaryBoard boundaryBoard = new BoundaryBoard(List.of(List.of(0, 0, 0)), List.of(boundaryShip));
        RestBoard expectedBoard = new RestBoard(List.of(List.of(0, 0, 0)), List.of(restShip));

        RestBoard convertedBoard = boundary2RestConverter.convertBoard(boundaryBoard);

        assertThat(convertedBoard).usingRecursiveComparison().isEqualTo(expectedBoard);
    }

    @Test
    void convertShip() {
        BoundaryShip boundaryShip = new BoundaryShip(5, List.of(new Coordinates(1, 1)), 0, false);
        RestShip expectedShip = new RestShip(5, List.of(new Coordinates(1, 1)), 0, false);

        RestShip convertedShip = boundary2RestConverter.convertShip(boundaryShip);

        assertThat(convertedShip).usingRecursiveComparison().isEqualTo(expectedShip);
    }
}