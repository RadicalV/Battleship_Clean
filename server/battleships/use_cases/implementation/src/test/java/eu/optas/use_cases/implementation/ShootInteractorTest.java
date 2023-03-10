package eu.optas.use_cases.implementation;

import eu.optas.domain.Ship;
import eu.optas.domain.ShotResult;
import eu.optas.gateway.api.GameGateway;
import eu.optas.use_cases.api.BoundaryShip;
import eu.optas.use_cases.api.BoundaryShotResult;
import eu.optas.utils.Coordinates;
import eu.optas.utils.GameState;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ShootInteractorTest {

    public static final GameGateway GAME_GATEWAY_MOCK = mock(GameGateway.class);
    public static final ShotResultD2BConverter SHOT_RESULT_D_2_B_CONVERTER_MOCK = mock(ShotResultD2BConverter.class);
    public static final ShootInteractor SHOOT_INTERACTOR =
            new ShootInteractor(GAME_GATEWAY_MOCK, SHOT_RESULT_D_2_B_CONVERTER_MOCK);
    public static final String GAME_ID = "test";
    public static final int X = 0;
    public static final int Y = 0;

    @Test
    void shoot() {
        ShotResult shotResult = new ShotResult(
                List.of(List.of(1, 0, 0, 0)),
                new Ship(5, List.of(new Coordinates(1, 1)), 0, false),
                GameState.IN_PROGRESS
        );
        BoundaryShotResult boundaryShotResult = new BoundaryShotResult(
                List.of(List.of(1, 0, 0, 0)),
                GameState.IN_PROGRESS,
                new BoundaryShip(5, List.of(new Coordinates(1, 1)), 0, false)
        );

        when(GAME_GATEWAY_MOCK.shoot(GAME_ID, X, Y)).thenReturn(shotResult);
        when(SHOT_RESULT_D_2_B_CONVERTER_MOCK.convert(shotResult)).thenReturn(boundaryShotResult);

        BoundaryShotResult returnedShotResult = SHOOT_INTERACTOR.shoot(GAME_ID, X, Y).orElse(null);

        assertThat(returnedShotResult).usingRecursiveComparison().isEqualTo(boundaryShotResult);
    }

    @Test
    void shootNullWhenGameNotFound() {
        when(GAME_GATEWAY_MOCK.shoot(GAME_ID, X, Y)).thenReturn(null);

        Optional<BoundaryShotResult> returnedShotResult = SHOOT_INTERACTOR.shoot(GAME_ID, X, Y);

        assertThat(returnedShotResult.isEmpty()).isTrue();
    }
}