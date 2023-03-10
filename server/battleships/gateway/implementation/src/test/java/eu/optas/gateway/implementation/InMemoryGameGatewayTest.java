package eu.optas.gateway.implementation;

import eu.optas.domain.Game;
import eu.optas.utils.GameState;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class InMemoryGameGatewayTest {
    private InMemoryGameGateway inMemoryGameGateway;

    @BeforeEach
    void setUp() {
        inMemoryGameGateway = new InMemoryGameGateway();
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
        Game newGame = inMemoryGameGateway.createGame();

        Game game = inMemoryGameGateway.getGame(newGame.getId());

        assertThat(game).usingRecursiveComparison().isEqualTo(newGame);
        assertThat(inMemoryGameGateway.getGame("1")).isNull();
    }
}