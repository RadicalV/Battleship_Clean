package eu.optas.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import eu.optas.use_cases.api.BoundaryShip;
import eu.optas.use_cases.api.BoundaryShotResult;
import eu.optas.use_cases.api.ShootUC;
import eu.optas.utils.Coordinates;
import eu.optas.utils.GameNotFoundException;
import eu.optas.utils.GameState;
import io.javalin.http.Context;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.mockito.Mockito.*;

class ShootRouteTest {

    private static final ShootUC SHOOT_UC = mock(ShootUC.class);
    private static final ShotResultB2RConverter SHOT_RESULT_B_2_R_CONVERTER = mock(ShotResultB2RConverter.class);
    private static final String GAME_ID = "testID";
    private static final int X = 5;
    private static final int Y = 5;

    @Test
    void handle() throws JsonProcessingException {
        BoundaryShotResult boundaryShotResult =
                new BoundaryShotResult(
                        List.of(List.of(0, 0, 0)),
                        GameState.IN_PROGRESS,
                        mock(BoundaryShip.class)
                );
        RestShotResult expectedRestShotResult =
                new RestShotResult(
                        List.of(List.of(0, 0, 0)),
                        GameState.IN_PROGRESS,
                        mock(RestShip.class)
                );

        when(SHOOT_UC.shoot(GAME_ID, X, Y)).thenReturn(boundaryShotResult);
        when(SHOT_RESULT_B_2_R_CONVERTER.convert(boundaryShotResult)).thenReturn(expectedRestShotResult);


        Context ctx = mock(Context.class);
        ShootRoute shootRoute = new ShootRoute(SHOOT_UC, SHOT_RESULT_B_2_R_CONVERTER);

        when(ctx.pathParam("id")).thenReturn(GAME_ID);

        Coordinates coordinates = new Coordinates(X, Y);
        String requestBody = new ObjectMapper().writeValueAsString(coordinates);
        when(ctx.body()).thenReturn(requestBody);
        
        shootRoute.handle(ctx);

        verify(ctx).json(expectedRestShotResult);
        verify(SHOOT_UC).shoot(GAME_ID, X, Y);
    }

    @Test
    void handleWhenGameNotFound() throws JsonProcessingException {
        when(SHOOT_UC.shoot("id", X, Y)).thenThrow(new GameNotFoundException("Game doesn't exist!"));

        Context ctx = mock(Context.class);
        ShootRoute shootRoute = new ShootRoute(SHOOT_UC, SHOT_RESULT_B_2_R_CONVERTER);

        when(ctx.pathParam("id")).thenReturn("id");

        Coordinates coordinates = new Coordinates(X, Y);
        String requestBody = new ObjectMapper().writeValueAsString(coordinates);
        when(ctx.body()).thenReturn(requestBody);

        shootRoute.handle(ctx);

        verify(ctx).json(Map.of("message", "Game not found!"));
        verify(ctx).status(404);
        verify(SHOOT_UC).shoot("id", X, Y);
    }
}