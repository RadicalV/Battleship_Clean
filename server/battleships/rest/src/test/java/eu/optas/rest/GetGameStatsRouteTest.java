package eu.optas.rest;

import eu.optas.use_cases.api.BoundaryGameStats;
import eu.optas.use_cases.api.GetGameStatsUC;
import io.javalin.http.Context;
import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.*;

class GetGameStatsRouteTest {

    @Test
    void handle() {
        GetGameStatsUC getGameStatsUC = mock(GetGameStatsUC.class);
        Boundary2RestConverter boundary2RestConverter = mock(Boundary2RestConverter.class);

        BoundaryGameStats boundaryGameStats = new BoundaryGameStats(25, 5);
        RestGameStats restGameStats = new RestGameStats(25, 5);

        String gameId = "123";
        when(getGameStatsUC.getGameStats(gameId)).thenReturn(boundaryGameStats);
        when(boundary2RestConverter.convertGameStats(boundaryGameStats)).thenReturn(restGameStats);

        Context ctx = mock(Context.class);
        when(ctx.pathParam("id")).thenReturn(gameId);
        GetGameStatsRoute getGameStatsRoute = new GetGameStatsRoute(getGameStatsUC, boundary2RestConverter);

        getGameStatsRoute.handle(ctx);

        verify(ctx).json(restGameStats);
        verify(getGameStatsUC).getGameStats(gameId);
    }

    @Test
    void handleWhenGameNotFound() {
        GetGameStatsUC getGameStatsUC = mock(GetGameStatsUC.class);
        Boundary2RestConverter boundary2RestConverter = mock(Boundary2RestConverter.class);
        String gameId = "123";

        when(getGameStatsUC.getGameStats(gameId)).thenReturn(null);
        when(boundary2RestConverter.convertGameStats(null)).thenReturn(null);

        Context ctx = mock(Context.class);
        GetGameStatsRoute getGameRoute = new GetGameStatsRoute(getGameStatsUC, boundary2RestConverter);

        when(ctx.pathParam("id")).thenReturn("id");
        getGameRoute.handle(ctx);

        verify(ctx).json("{\n \"message\": \"Game not found!\"\n}");
        verify(ctx).status(404);
        verify(getGameStatsUC).getGameStats("id");
    }
}