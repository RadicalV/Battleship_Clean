package eu.optas.gateway.implementation;

import eu.optas.domain.Board;
import eu.optas.domain.Game;
import eu.optas.domain.Ship;
import eu.optas.domain.ShotResult;
import eu.optas.utils.Coordinates;
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
    public static final int X = 0;
    public static final int Y = 0;
    private InMemoryGameGateway inMemoryGameGateway;
    private List<Game> gameList;
    private List<List<Integer>> grid;

    @BeforeEach
    void setUp() {
        gameList = new ArrayList<>();
        inMemoryGameGateway = new InMemoryGameGateway(gameList);
        grid = new ArrayList<>() {{
            add(new ArrayList<>() {{
                add(0);
                add(0);
                add(0);
            }});
        }};
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
    void shootAndMiss() {
        List<List<Integer>> expectedGrid = List.of(List.of(1, 0, 0));
        List<Ship> ships = List.of(
                new Ship(
                        2,
                        List.of(new Coordinates(0, 1), new Coordinates(0, 2)),
                        0,
                        false)
        );
        Game newGame = new Game(
                GAME_ID,
                GameState.IN_PROGRESS,
                new Board(grid, ships),
                25,
                0
        );

        gameList.add(newGame);
        ShotResult shotResult = inMemoryGameGateway.shoot(GAME_ID, X, Y);

        assertThat(shotResult.getGrid()).isEqualTo(expectedGrid);
        assertThat(shotResult.getGameState()).isEqualTo(GameState.IN_PROGRESS);
        assertThat(shotResult.getShip().isEmpty()).isTrue();
    }

    @Test
    void shootAndHit() {

        List<List<Integer>> expectedGrid = List.of(List.of(2, 0, 0));
        List<Ship> ships = new ArrayList<>();
        ships.add(new Ship(
                2,
                List.of(new Coordinates(0, 0), new Coordinates(0, 1)),
                0,
                false));
        Game newGame = new Game(
                "test",
                GameState.IN_PROGRESS,
                new Board(grid, ships),
                25,
                0
        );

        gameList.add(newGame);
        ShotResult shotResult = inMemoryGameGateway.shoot(GAME_ID, X, Y);

        assertThat(shotResult.getGrid()).isEqualTo(expectedGrid);
        assertThat(shotResult.getGameState()).isEqualTo(GameState.IN_PROGRESS);
        assertThat(shotResult.getShip().get().getHits()).isEqualTo(1);
    }

    @Test
    void shootAndDestroyShip() {
        List<List<Integer>> expectedGrid = List.of(List.of(3, 0, 0));
        List<Ship> ships = new ArrayList<>();
        ships.add(new Ship(
                1,
                List.of(new Coordinates(0, 0)),
                0,
                false));
        ships.add(new Ship(
                1,
                List.of(new Coordinates(0, 2)),
                0,
                false));
        Game newGame = new Game(
                "test",
                GameState.IN_PROGRESS,
                new Board(grid, ships),
                25,
                0
        );

        gameList.add(newGame);
        ShotResult shotResult = inMemoryGameGateway.shoot(GAME_ID, X, Y);

        assertThat(shotResult.getGrid()).isEqualTo(expectedGrid);
        assertThat(shotResult.getGameState()).isEqualTo(GameState.IN_PROGRESS);
        assertThat(shotResult.getShip().get().getHits()).isEqualTo(1);
    }

    @Test
    void shootMissAndLose() {
        List<List<Integer>> expectedGrid = List.of(List.of(1, 0, 0));
        List<Ship> ships = List.of(
                new Ship(
                        2,
                        List.of(new Coordinates(0, 1), new Coordinates(0, 2)),
                        0,
                        false)
        );
        Game newGame = new Game(
                GAME_ID,
                GameState.IN_PROGRESS,
                new Board(grid, ships),
                1,
                0
        );

        gameList.add(newGame);
        ShotResult shotResult = inMemoryGameGateway.shoot(GAME_ID, X, Y);

        assertThat(shotResult.getGrid()).isEqualTo(expectedGrid);
        assertThat(shotResult.getGameState()).isEqualTo(GameState.LOST);
        assertThat(shotResult.getShip().isEmpty()).isTrue();
    }

    @Test
    void shootDestroyShipAndWin() {
        List<List<Integer>> expectedGrid = List.of(List.of(3, 0, 0));
        List<Ship> ships = new ArrayList<>();
        ships.add(new Ship(
                1,
                List.of(new Coordinates(0, 0)),
                0,
                false));
        Game newGame = new Game(
                "test",
                GameState.IN_PROGRESS,
                new Board(grid, ships),
                25,
                0
        );

        gameList.add(newGame);
        ShotResult shotResult = inMemoryGameGateway.shoot(GAME_ID, X, Y);

        assertThat(shotResult.getGrid()).isEqualTo(expectedGrid);
        assertThat(shotResult.getGameState()).isEqualTo(GameState.WON);
        assertThat(shotResult.getShip().get().getHits()).isEqualTo(1);
    }
}