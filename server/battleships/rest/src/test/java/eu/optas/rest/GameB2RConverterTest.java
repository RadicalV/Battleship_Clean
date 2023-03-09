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

class GameB2RConverterTest {
    private GameB2RConverter gameB2RConverter;

    @BeforeEach
    void setUp() {
        gameB2RConverter = new GameB2RConverter();
    }

    @Test
    void convertGame() {
        BoundaryShip boundaryShip = new BoundaryShip(5, List.of(new Coordinates(1, 1)), 0, false);
        BoundaryBoard boundaryBoard = new BoundaryBoard(List.of(List.of(0, 0, 0)), List.of(boundaryShip));

        BoundaryGame boundaryGame = new BoundaryGame("test", GameState.IN_PROGRESS, boundaryBoard, 25, 0);

        RestGame convertedGame = gameB2RConverter.convert(boundaryGame);

        assertThat(convertedGame).usingRecursiveComparison().isEqualTo(boundaryGame);
    }
}