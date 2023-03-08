package eu.optas.rest;

import eu.optas.use_cases.api.BoundaryBoard;
import eu.optas.use_cases.api.BoundaryGame;
import eu.optas.use_cases.api.StartGameUC;
import eu.optas.utils.GameState;
import io.javalin.http.Context;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.mockito.Mockito.*;

class StartGameRouteTest {

    @Test
    void startGame() {
        StartGameUC startGameUC = mock(StartGameUC.class);
        BoundaryBoard board = new BoundaryBoard(new ArrayList<>(), new ArrayList<>());
        BoundaryGame returnedGame = new BoundaryGame("test", GameState.IN_PROGRESS, board, 25, 0);
        when(startGameUC.startGame()).thenReturn(returnedGame);

        StartGameRoute startGameRoute = new StartGameRoute(startGameUC);
        Context ctx = mock(Context.class);

        startGameRoute.handle(ctx);

        verify(ctx).json(returnedGame);
        verify(ctx).status(201);
        verify(startGameUC, times(1)).startGame();
    }
}