package eu.optas.use_cases.implementation;

import eu.optas.domain.Board;
import eu.optas.domain.Game;
import eu.optas.gateway.api.GameGateway;
import eu.optas.use_cases.api.BoundaryBoard;
import eu.optas.use_cases.api.BoundaryGame;
import eu.optas.utils.GameState;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class GetGameInteractorTest {

    public static final String GAME_ID = "123";
    public static final GameGateway GAME_GATEWAY_MOCK = mock(GameGateway.class);
    public static final GameD2BConverter GAME_D_2_B_CONVERTER_MOCK = mock(GameD2BConverter.class);
    public static final GetGameInteractor GET_GAME_INTERACTOR =
            new GetGameInteractor(GAME_GATEWAY_MOCK, GAME_D_2_B_CONVERTER_MOCK);

    @Test
    void getGame() {
        Game expectedGame = new Game(
                GAME_ID,
                GameState.IN_PROGRESS,
                mock(Board.class),
                25,
                0
        );
        BoundaryGame expectedBoundaryGame = new BoundaryGame(
                GAME_ID,
                GameState.IN_PROGRESS,
                mock(BoundaryBoard.class),
                25,
                0
        );

        when(GAME_GATEWAY_MOCK.getGame(GAME_ID)).thenReturn(expectedGame);
        when(GAME_D_2_B_CONVERTER_MOCK.convert(expectedGame)).thenReturn(expectedBoundaryGame);

        BoundaryGame returnedGame = GET_GAME_INTERACTOR.getGame(GAME_ID).get();

        assertThat(returnedGame).usingRecursiveComparison().isEqualTo(expectedBoundaryGame);
    }

    @Test
    void getGameNull() {
        when(GAME_GATEWAY_MOCK.getGame(GAME_ID)).thenReturn(null);

        Optional<BoundaryGame> returnedGame = GET_GAME_INTERACTOR.getGame(GAME_ID);

        assertThat(returnedGame.isEmpty()).isTrue();
    }
}