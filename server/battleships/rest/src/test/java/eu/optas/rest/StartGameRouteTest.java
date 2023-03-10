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
        BoundaryGame boundaryGame = new BoundaryGame("test", GameState.IN_PROGRESS, board, 25, 0);
        when(startGameUC.startGame()).thenReturn(boundaryGame);

        RestBoard restBoard = new RestBoard(new ArrayList<>(), new ArrayList<>());
        RestGame returnedGame = new RestGame("test", GameState.IN_PROGRESS, restBoard, 25, 0);

        GameB2RConverter gameB2RConverter = mock(GameB2RConverter.class);
        when(gameB2RConverter.convert(boundaryGame)).thenReturn(returnedGame);

        StartGameRoute startGameRoute = new StartGameRoute(startGameUC, gameB2RConverter);
        Context ctx = mock(Context.class);

        startGameRoute.handle(ctx);

        verify(ctx).json(returnedGame);
        verify(ctx).status(201);
        verify(startGameUC).startGame();
    }
}