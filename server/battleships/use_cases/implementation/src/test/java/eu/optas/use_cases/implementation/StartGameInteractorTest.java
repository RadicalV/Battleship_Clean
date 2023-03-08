package eu.optas.use_cases.implementation;

import eu.optas.domain.Board;
import eu.optas.domain.Game;
import eu.optas.gateway.api.GameGateway;
import eu.optas.use_cases.api.BoundaryBoard;
import eu.optas.use_cases.api.BoundaryGame;
import eu.optas.utils.GameState;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class StartGameInteractorTest {
    @Test
    void startGame() {
        GameGateway gameGatewayMock = mock(GameGateway.class);
        GameD2BConverter gameD2BConverterMock = mock(GameD2BConverter.class);
        StartGameInteractor startGameInteractor = new StartGameInteractor(gameGatewayMock, gameD2BConverterMock);

        Game expectedGame = new Game(
                "123",
                GameState.IN_PROGRESS,
                mock(Board.class),
                25,
                0
        );
        BoundaryGame expectedBoundaryGame = new BoundaryGame(
                "123",
                GameState.IN_PROGRESS,
                mock(BoundaryBoard.class),
                25,
                0
        );

        when(gameGatewayMock.createGame()).thenReturn(expectedGame);
        when(gameD2BConverterMock.convert(expectedGame)).thenReturn(expectedBoundaryGame);

        BoundaryGame returnedGame = startGameInteractor.startGame();
        assertThat(returnedGame).isEqualTo(expectedBoundaryGame);
    }
}