package eu.optas.rest;

import eu.optas.use_cases.api.BoundaryBoard;
import eu.optas.use_cases.api.BoundaryGame;
import eu.optas.use_cases.api.GetGameUC;
import eu.optas.utils.GameState;
import io.javalin.http.Context;
import org.junit.jupiter.api.Test;

import java.util.Map;
import java.util.Optional;

import static org.mockito.Mockito.*;

class GetGameRouteTest {

    private static final GetGameUC GET_GAME_UC = mock(GetGameUC.class);
    private static final GameB2RConverter GAME_B_2_R_CONVERTER = mock(GameB2RConverter.class);
    private static final String GAME_ID = "123";

    @Test
    void handle() {
        BoundaryGame expectedGame = new BoundaryGame(
                GAME_ID,
                GameState.IN_PROGRESS,
                mock(BoundaryBoard.class),
                25,
                0
        );
        RestGame expectedRestGame = new RestGame(
                GAME_ID,
                GameState.IN_PROGRESS,
                mock(RestBoard.class),
                25,
                0
        );

        when(GET_GAME_UC.getGame(GAME_ID)).thenReturn(Optional.of(expectedGame));
        when(GAME_B_2_R_CONVERTER.convert(expectedGame)).thenReturn(expectedRestGame);

        Context ctx = mock(Context.class);
        GetGameRoute getGameRoute = new GetGameRoute(GET_GAME_UC, GAME_B_2_R_CONVERTER);

        when(ctx.pathParam("id")).thenReturn(GAME_ID);
        getGameRoute.handle(ctx);

        verify(ctx).json(expectedRestGame);
        verify(GET_GAME_UC).getGame(GAME_ID);
    }

    @Test
    void handleWhenGameNotFound() {
        when(GET_GAME_UC.getGame(GAME_ID)).thenReturn(Optional.empty());

        Context ctx = mock(Context.class);
        GetGameRoute getGameRoute = new GetGameRoute(GET_GAME_UC, GAME_B_2_R_CONVERTER);

        when(ctx.pathParam("id")).thenReturn("id");
        getGameRoute.handle(ctx);

        verify(ctx).json(Map.of("message", "Game not found!"));
        verify(ctx).status(404);
        verify(GET_GAME_UC).getGame("id");
    }
}