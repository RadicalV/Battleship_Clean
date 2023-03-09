package eu.optas.rest;

import eu.optas.use_cases.api.BoundaryBoard;
import eu.optas.use_cases.api.BoundaryGame;
import eu.optas.use_cases.api.BoundaryGameStats;
import eu.optas.use_cases.api.BoundaryShip;
import eu.optas.utils.Coordinates;
import eu.optas.utils.GameState;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class Boundary2RestConverterTest {
    private Boundary2RestConverter boundary2RestConverter;

    @BeforeEach
    void setUp() {
        boundary2RestConverter = new Boundary2RestConverter();
    }

    @Test
    void convertGame() {
        BoundaryShip boundaryShip = new BoundaryShip(5, List.of(new Coordinates(1, 1)), 0, false);
        RestShip restShip = new RestShip(5, List.of(new Coordinates(1, 1)), 0, false);
        BoundaryBoard boundaryBoard = new BoundaryBoard(List.of(List.of(0, 0, 0)), List.of(boundaryShip));
        RestBoard restBoard = new RestBoard(List.of(List.of(0, 0, 0)), List.of(restShip));

        BoundaryGame boundaryGame = new BoundaryGame("test", GameState.IN_PROGRESS, boundaryBoard, 25, 0);
        RestGame restGame = new RestGame("test", GameState.IN_PROGRESS, restBoard, 25, 0);

        RestGame convertedGame = boundary2RestConverter.convertGame(boundaryGame);

        assertThat(convertedGame).usingRecursiveComparison().isEqualTo(restGame);
    }

    @Test
    void convertGameStats() {
        BoundaryGameStats inputGameStats = new BoundaryGameStats(25, 5);
        RestGameStats expectedGameStats = new RestGameStats(25, 5);

        RestGameStats convertedGameStats = boundary2RestConverter.convertGameStats(inputGameStats);

        assertThat(convertedGameStats).usingRecursiveComparison().isEqualTo(expectedGameStats);
    }
}