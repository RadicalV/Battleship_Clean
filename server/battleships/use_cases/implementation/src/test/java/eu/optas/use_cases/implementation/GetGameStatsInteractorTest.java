package eu.optas.use_cases.implementation;

import eu.optas.domain.GameStats;
import eu.optas.gateway.api.GameGateway;
import eu.optas.use_cases.api.BoundaryGameStats;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class GetGameStatsInteractorTest {

    @Test
    void getGameStats() {
        GameGateway gameGatewayMock = mock(GameGateway.class);
        GameStatsD2BConverter gameStatsD2BConverterMock = mock(GameStatsD2BConverter.class);
        GetGameStatsInteractor getGameStatsInteractor = new GetGameStatsInteractor(gameGatewayMock, gameStatsD2BConverterMock);

        GameStats gameStats = new GameStats(25, 0);
        BoundaryGameStats expectedGameStats = new BoundaryGameStats(25, 0);

        String gameId = "123";
        when(gameGatewayMock.getGameStats(gameId)).thenReturn(gameStats);
        when(gameStatsD2BConverterMock.convert(gameStats)).thenReturn(expectedGameStats);

        BoundaryGameStats returnedGameStats = getGameStatsInteractor.getGameStats(gameId);

        assertThat(returnedGameStats).usingRecursiveComparison().isEqualTo(expectedGameStats);
    }

    @Test
    void getGameStatsNull() {
        GameGateway gameGatewayMock = mock(GameGateway.class);
        GameStatsD2BConverter gameStatsD2BConverterMock = mock(GameStatsD2BConverter.class);
        GetGameStatsInteractor getGameStatsInteractor = new GetGameStatsInteractor(gameGatewayMock, gameStatsD2BConverterMock);
        String gameId = "123";

        when(gameGatewayMock.getGame(gameId)).thenReturn(null);
        when(gameStatsD2BConverterMock.convert(null)).thenReturn(null);

        BoundaryGameStats returnedGameStats = getGameStatsInteractor.getGameStats(gameId);

        assertThat(returnedGameStats).isNull();
    }
}