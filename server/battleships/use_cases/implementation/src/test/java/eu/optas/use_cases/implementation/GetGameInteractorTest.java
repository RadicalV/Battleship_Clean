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

class GetGameInteractorTest {

    @Test
    void getGame() {
        GameGateway gameGatewayMock = mock(GameGateway.class);
        GameD2BConverter gameD2BConverterMock = mock(GameD2BConverter.class);
        GetGameInteractor getGameInteractor = new GetGameInteractor(gameGatewayMock, gameD2BConverterMock);
        String gameId = "123";

        Game expectedGame = new Game(
                gameId,
                GameState.IN_PROGRESS,
                mock(Board.class),
                25,
                0
        );
        BoundaryGame expectedBoundaryGame = new BoundaryGame(
                gameId,
                GameState.IN_PROGRESS,
                mock(BoundaryBoard.class),
                25,
                0
        );

        when(gameGatewayMock.getGame(gameId)).thenReturn(expectedGame);
        when(gameD2BConverterMock.convert(expectedGame)).thenReturn(expectedBoundaryGame);

        BoundaryGame returnedGame = getGameInteractor.getGame(gameId);

        assertThat(returnedGame).usingRecursiveComparison().isEqualTo(expectedBoundaryGame);
    }

    @Test
    void getGameNull() {
        GameGateway gameGatewayMock = mock(GameGateway.class);
        GameD2BConverter gameD2BConverterMock = mock(GameD2BConverter.class);
        GetGameInteractor getGameInteractor = new GetGameInteractor(gameGatewayMock, gameD2BConverterMock);
        String gameId = "123";

        when(gameGatewayMock.getGame(gameId)).thenReturn(null);
        when(gameD2BConverterMock.convert(null)).thenReturn(null);

        BoundaryGame returnedGame = getGameInteractor.getGame(gameId);

        assertThat(returnedGame).isNull();
    }
}