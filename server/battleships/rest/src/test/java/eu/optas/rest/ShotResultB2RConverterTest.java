package eu.optas.rest;

import eu.optas.use_cases.api.BoundaryShip;
import eu.optas.use_cases.api.BoundaryShotResult;
import eu.optas.utils.Coordinates;
import eu.optas.utils.GameState;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class ShotResultB2RConverterTest {

    @Test
    void convert() {
        BoundaryShotResult inputShotResult = new BoundaryShotResult(
                List.of(List.of(0, 0, 0, 0)),
                GameState.IN_PROGRESS,
                new BoundaryShip(5, List.of(new Coordinates(1, 1)), 0, false)
        );
        RestShotResult expectedShotResult = new RestShotResult(
                List.of(List.of(0, 0, 0, 0)),
                GameState.IN_PROGRESS,
                new RestShip(5, List.of(new Coordinates(1, 1)), 0, false)
        );

        ShotResultB2RConverter shotResultB2RConverter = new ShotResultB2RConverter();

        RestShotResult convertedShotResult = shotResultB2RConverter.convert(inputShotResult);

        assertThat(convertedShotResult).usingRecursiveComparison().isEqualTo(expectedShotResult);
    }
}