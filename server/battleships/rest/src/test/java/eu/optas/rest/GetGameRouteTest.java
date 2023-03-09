package eu.optas.rest;

import eu.optas.use_cases.api.BoundaryBoard;
import eu.optas.use_cases.api.BoundaryGame;
import eu.optas.use_cases.api.GetGameUC;
import eu.optas.utils.GameState;
import io.javalin.http.Context;
import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.*;

class GetGameRouteTest {

    @Test
    void handle() {
        GetGameUC getGameUC = mock(GetGameUC.class);
        Boundary2RestConverter boundary2RestConverter = mock(Boundary2RestConverter.class);
        String gameId = "123";

        BoundaryGame expectedGame = new BoundaryGame(
                gameId,
                GameState.IN_PROGRESS,
                mock(BoundaryBoard.class),
                25,
                0
        );
        RestGame expectedRestGame = new RestGame(
                gameId,
                GameState.IN_PROGRESS,
                mock(RestBoard.class),
                25,
                0
        );

        when(getGameUC.getGame(gameId)).thenReturn(expectedGame);
        when(boundary2RestConverter.convertGame(expectedGame)).thenReturn(expectedRestGame);

        Context ctx = mock(Context.class);
        GetGameRoute getGameRoute = new GetGameRoute(getGameUC, boundary2RestConverter);

        when(ctx.pathParam("id")).thenReturn(gameId);
        getGameRoute.handle(ctx);

        verify(ctx).json(expectedRestGame);
        verify(getGameUC).getGame(gameId);
    }

    @Test
    void handleWhenGameNotFound() {
        GetGameUC getGameUC = mock(GetGameUC.class);
        Boundary2RestConverter boundary2RestConverter = mock(Boundary2RestConverter.class);
        String gameId = "123";

        when(getGameUC.getGame(gameId)).thenReturn(null);
        when(boundary2RestConverter.convertGame(null)).thenReturn(null);

        Context ctx = mock(Context.class);
        GetGameRoute getGameRoute = new GetGameRoute(getGameUC, boundary2RestConverter);

        when(ctx.pathParam("id")).thenReturn("id");
        getGameRoute.handle(ctx);

        verify(ctx).json("{\n \"message\": \"Game not found!\"\n}");
        verify(ctx).status(404);
        verify(getGameUC).getGame("id");
    }
}