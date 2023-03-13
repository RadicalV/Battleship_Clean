package eu.optas.use_cases.implementation;

import eu.optas.domain.Board;
import eu.optas.domain.Game;
import eu.optas.gateway.api.GameGateway;
import eu.optas.use_cases.api.BoundaryGameStats;
import eu.optas.utils.GameState;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class GetGameStatsInteractorTest {

    public static final GameGateway GAME_GATEWAY_MOCK = mock(GameGateway.class);
    public static final GetGameStatsInteractor GET_GAME_STATS_INTERACTOR = new GetGameStatsInteractor(GAME_GATEWAY_MOCK);
    public static final String GAME_ID = "123";

    @Test
    void getGameStats() {
        Game game = new Game("123", GameState.IN_PROGRESS, mock(Board.class), 25, 0);
        BoundaryGameStats expectedGameStats = new BoundaryGameStats(25, 0);

        when(GAME_GATEWAY_MOCK.getGame(GAME_ID)).thenReturn(Optional.of(game));

        BoundaryGameStats returnedGameStats = GET_GAME_STATS_INTERACTOR.getGameStats(GAME_ID).get();

        assertThat(returnedGameStats).usingRecursiveComparison().isEqualTo(expectedGameStats);
    }

    @Test
    void getGameStatsNull() {
        when(GAME_GATEWAY_MOCK.getGame(GAME_ID)).thenReturn(Optional.empty());

        Optional<BoundaryGameStats> returnedGameStats = GET_GAME_STATS_INTERACTOR.getGameStats(GAME_ID);

        assertThat(returnedGameStats).isEmpty();
    }
}