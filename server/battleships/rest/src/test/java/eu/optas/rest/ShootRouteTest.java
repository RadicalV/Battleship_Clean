package eu.optas.rest;

import eu.optas.use_cases.api.BoundaryShip;
import eu.optas.use_cases.api.BoundaryShotResult;
import eu.optas.use_cases.api.ShootUC;
import eu.optas.utils.Coordinates;
import eu.optas.utils.GameState;
import io.javalin.http.Context;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.mockito.Mockito.*;

class ShootRouteTest {

    private static final ShootUC SHOOT_UC = mock(ShootUC.class);
    private static final ShotResultB2RConverter SHOT_RESULT_B_2_R_CONVERTER = mock(ShotResultB2RConverter.class);
    private static final String GAME_ID = "testID";
    private static final int X = 5;
    private static final int Y = 5;

    @Test
    void handle() {
        BoundaryShotResult boundaryShotResult =
                new BoundaryShotResult(
                        List.of(List.of(0, 0, 0)),
                        GameState.IN_PROGRESS,
                        new BoundaryShip(5, List.of(new Coordinates(1, 1)), 0, false)
                );
        RestShotResult expectedRestShotResult =
                new RestShotResult(
                        List.of(List.of(0, 0, 0)),
                        GameState.IN_PROGRESS,
                        new RestShip(5, List.of(new Coordinates(1, 1)), 0, false)
                );

        when(SHOOT_UC.shoot(GAME_ID, X, Y)).thenReturn(Optional.of(boundaryShotResult));
        when(SHOT_RESULT_B_2_R_CONVERTER.convert(boundaryShotResult)).thenReturn(expectedRestShotResult);


        Context ctx = mock(Context.class);
        ShootRoute shootRoute = new ShootRoute(SHOOT_UC, SHOT_RESULT_B_2_R_CONVERTER);

        when(ctx.pathParam("id")).thenReturn(GAME_ID);
        when(ctx.bodyAsClass(Coordinates.class)).thenReturn(new Coordinates(X, Y));
        shootRoute.handle(ctx);

        verify(ctx).json(expectedRestShotResult);
        verify(SHOOT_UC).shoot(GAME_ID, X, Y);
    }

    @Test
    void handleWhenGameNotFound() {
        when(SHOOT_UC.shoot(GAME_ID, X, Y)).thenReturn(Optional.empty());


        Context ctx = mock(Context.class);
        ShootRoute shootRoute = new ShootRoute(SHOOT_UC, SHOT_RESULT_B_2_R_CONVERTER);

        when(ctx.pathParam("id")).thenReturn("id");
        when(ctx.bodyAsClass(Coordinates.class)).thenReturn(new Coordinates(X, Y));
        shootRoute.handle(ctx);

        verify(ctx).json(Map.of("message", "Game not found!"));
        verify(ctx).status(404);
        verify(SHOOT_UC).shoot("id", X, Y);
    }
}