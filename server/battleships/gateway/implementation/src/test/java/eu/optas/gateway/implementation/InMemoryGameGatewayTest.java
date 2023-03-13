package eu.optas.gateway.implementation;

import eu.optas.domain.Board;
import eu.optas.domain.Game;
import eu.optas.utils.GameState;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;

class InMemoryGameGatewayTest {
    public static final String GAME_ID = "test";
    private InMemoryGameGateway inMemoryGameGateway;
    private List<Game> gameList;

    @BeforeEach
    void setUp() {
        gameList = new ArrayList<>();
        inMemoryGameGateway = new InMemoryGameGateway(gameList);
    }

    @Test
    void createGame() {
        Game game = inMemoryGameGateway.createGame();
        List<List<Integer>> expectedGrid = new ArrayList<>(Collections.nCopies(10, new ArrayList<>(Collections.nCopies(10, 0))));

        assertThat(game.getState()).isEqualTo(GameState.IN_PROGRESS);
        assertThat(game.getHitsRemaining()).isEqualTo(25);
        assertThat(game.getShipsDestroyed()).isEqualTo(0);
        assertThat(game.getBoard().getGrid()).isEqualTo(expectedGrid);
    }

    @Test
    void getGame() {
        Game newGame = new Game(
                GAME_ID,
                GameState.IN_PROGRESS,
                mock(Board.class),
                25,
                0
        );

        gameList.add(newGame);

        Game game = inMemoryGameGateway.getGame(GAME_ID);

        assertThat(game).usingRecursiveComparison().isEqualTo(newGame);
        assertThat(inMemoryGameGateway.getGame("1")).isNull();
    }

    @Test
    void updateGame() {
        Game newGame = new Game(
                GAME_ID,
                GameState.IN_PROGRESS,
                mock(Board.class),
                25,
                0
        );

        gameList.add(newGame);

        Game updatedGame = new Game(
                GAME_ID,
                GameState.IN_PROGRESS,
                mock(Board.class),
                12,
                5
        );

        inMemoryGameGateway.updateGame(updatedGame, newGame);

        Game retrievedGame = inMemoryGameGateway.getGame(GAME_ID);

        assertThat(retrievedGame).usingRecursiveComparison().isEqualTo(updatedGame);
    }
}