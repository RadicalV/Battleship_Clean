package eu.optas.use_cases.implementation;

import eu.optas.domain.Ship;
import eu.optas.domain.ShotResult;
import eu.optas.use_cases.api.BoundaryShotResult;
import eu.optas.utils.Coordinates;
import eu.optas.utils.GameState;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class ShotResultD2BConverterTest {

    @Test
    void convert() {
        ShotResult inputShotResult = new ShotResult(
                List.of(List.of(0, 0, 0, 0)),
                new Ship(5, List.of(new Coordinates(1, 1)), 0, false),
                GameState.IN_PROGRESS
        );

        ShotResultD2BConverter shotResultD2BConverter = new ShotResultD2BConverter();

        BoundaryShotResult convertedShotResult = shotResultD2BConverter.convert(inputShotResult);

        assertThat(convertedShotResult).usingRecursiveComparison().isEqualTo(inputShotResult);
    }
}