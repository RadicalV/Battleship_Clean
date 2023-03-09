package eu.optas.rest;

import eu.optas.use_cases.api.BoundaryGameStats;
import eu.optas.use_cases.api.GetGameStatsUC;
import io.javalin.http.Context;
import org.junit.jupiter.api.Test;

import java.util.Map;
import java.util.Optional;

import static org.mockito.Mockito.*;

class GetGameStatsRouteTest {

    private static final GetGameStatsUC GET_GAME_STATS_UC = mock(GetGameStatsUC.class);
    private static final GameStatsB2RConverter GAME_STATS_B_2_R_CONVERTER = mock(GameStatsB2RConverter.class);
    private static final String GAME_ID = "123";

    @Test
    void handle() {
        BoundaryGameStats boundaryGameStats = new BoundaryGameStats(25, 5);
        RestGameStats restGameStats = new RestGameStats(25, 5);

        when(GET_GAME_STATS_UC.getGameStats(GAME_ID)).thenReturn(Optional.of(boundaryGameStats));
        when(GAME_STATS_B_2_R_CONVERTER.convertGameStats(boundaryGameStats)).thenReturn(restGameStats);

        Context ctx = mock(Context.class);
        when(ctx.pathParam("id")).thenReturn(GAME_ID);
        GetGameStatsRoute getGameStatsRoute = new GetGameStatsRoute(GET_GAME_STATS_UC, GAME_STATS_B_2_R_CONVERTER);

        getGameStatsRoute.handle(ctx);

        verify(ctx).json(restGameStats);
        verify(GET_GAME_STATS_UC).getGameStats(GAME_ID);
    }

    @Test
    void handleWhenGameNotFound() {
        when(GET_GAME_STATS_UC.getGameStats(GAME_ID)).thenReturn(Optional.empty());

        Context ctx = mock(Context.class);
        GetGameStatsRoute getGameRoute = new GetGameStatsRoute(GET_GAME_STATS_UC, GAME_STATS_B_2_R_CONVERTER);

        when(ctx.pathParam("id")).thenReturn("id");
        getGameRoute.handle(ctx);

        verify(ctx).json(Map.of("message", "Game not found!"));
        verify(ctx).status(404);
        verify(GET_GAME_STATS_UC).getGameStats("id");
    }
}