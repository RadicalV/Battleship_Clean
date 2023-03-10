package eu.optas.use_cases.implementation;

import eu.optas.domain.Board;
import eu.optas.domain.Game;
import eu.optas.domain.Ship;
import eu.optas.domain.ShotResult;
import eu.optas.gateway.api.GameGateway;
import eu.optas.use_cases.api.BoundaryShip;
import eu.optas.use_cases.api.BoundaryShotResult;
import eu.optas.utils.Coordinates;
import eu.optas.utils.GameNotFoundException;
import eu.optas.utils.GameState;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrowsExactly;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ShootInteractorTest {
    public static final String GAME_ID = "test";
    public static final int X = 0;
    public static final int Y = 0;
    private GameGateway gameGateway;
    private ShotResultD2BConverter shotResultD2BConverter;
    private ShootInteractor shootInteractor;
    private List<List<Integer>> grid;

    @BeforeEach
    void setUp() {
        gameGateway = mock(GameGateway.class);
        shotResultD2BConverter = mock(ShotResultD2BConverter.class);
        shootInteractor = new ShootInteractor(gameGateway, shotResultD2BConverter);
        grid = new ArrayList<>() {{
            add(new ArrayList<>() {{
                add(0);
                add(0);
                add(0);
            }});
        }};
    }

    @Test
    void shootAndMiss() {
        List<List<Integer>> expectedGrid = List.of(List.of(1, 0, 0));
        List<Ship> ships = List.of(new Ship(2,
                List.of(new Coordinates(0, 1), new Coordinates(0, 2)),
                0,
                false));

        Game game = new Game(GAME_ID, GameState.IN_PROGRESS, new Board(grid, ships), 25, 0);

        when(gameGateway.getGame(GAME_ID)).thenReturn(Optional.of(game));

        BoundaryShotResult boundaryShotResult = new BoundaryShotResult(
                expectedGrid,
                GameState.IN_PROGRESS,
                null
        );

        when(shotResultD2BConverter.convert(expectedNoHits(expectedGrid, GameState.IN_PROGRESS)))
                .thenReturn(boundaryShotResult);

        BoundaryShotResult returnedShotResult = null;

        returnedShotResult = shootInteractor.shoot(GAME_ID, X, Y);

        assertThat(returnedShotResult.getGrid()).isEqualTo(expectedGrid);
        assertThat(returnedShotResult.getGameState()).isEqualTo(GameState.IN_PROGRESS);
        assertThat(returnedShotResult.getShip()).isEmpty();
    }

    @Test
    void shootAndHit() {
        List<List<Integer>> expectedGrid = List.of(List.of(2, 0, 0));
        Ship ship = new Ship(2,
                List.of(new Coordinates(0, 0), new Coordinates(0, 1)),
                0,
                false);
        List<Ship> ships = new ArrayList<>() {{
            add(ship);
        }};

        Game game = new Game(GAME_ID, GameState.IN_PROGRESS, new Board(grid, ships), 25, 0);

        when(gameGateway.getGame(GAME_ID)).thenReturn(Optional.of(game));

        BoundaryShotResult boundaryShotResult = new BoundaryShotResult(
                expectedGrid,
                GameState.IN_PROGRESS,
                new BoundaryShip(2,
                        List.of(new Coordinates(0, 1), new Coordinates(0, 2)),
                        1,
                        false)
        );

        when(shotResultD2BConverter.convert(expectedHit(expectedGrid, GameState.IN_PROGRESS)))
                .thenReturn(boundaryShotResult);

        BoundaryShotResult returnedShotResult = null;

        returnedShotResult = shootInteractor.shoot(GAME_ID, X, Y);

        assertThat(returnedShotResult.getGrid()).isEqualTo(expectedGrid);
        assertThat(returnedShotResult.getGameState()).isEqualTo(GameState.IN_PROGRESS);
        assertThat(returnedShotResult.getShip().get().getHits()).isEqualTo(1);
        assertThat(returnedShotResult.getShip().get().isDestroyed()).isFalse();
    }

    @Test
    void shootAndDestroyShip() {
        List<List<Integer>> expectedGrid = List.of(List.of(3, 0, 0));
        Ship ship = new Ship(1,
                List.of(new Coordinates(0, 0)),
                0,
                false);
        Ship ship2 = new Ship(1,
                List.of(new Coordinates(0, 1)),
                0,
                false);
        List<Ship> ships = new ArrayList<>() {{
            add(ship);
            add(ship2);
        }};

        Game game = new Game(GAME_ID, GameState.IN_PROGRESS, new Board(grid, ships), 25, 0);

        when(gameGateway.getGame(GAME_ID)).thenReturn(Optional.of(game));

        BoundaryShotResult boundaryShotResult = new BoundaryShotResult(
                expectedGrid,
                GameState.IN_PROGRESS,
                new BoundaryShip(1,
                        List.of(new Coordinates(0, 0)),
                        1,
                        true)
        );

        when(shotResultD2BConverter.convert(expectedHitAndDestroyedShip(expectedGrid, GameState.IN_PROGRESS)))
                .thenReturn(boundaryShotResult);

        BoundaryShotResult returnedShotResult = null;

        returnedShotResult = shootInteractor.shoot(GAME_ID, X, Y);

        assertThat(returnedShotResult.getGrid()).isEqualTo(expectedGrid);
        assertThat(returnedShotResult.getGameState()).isEqualTo(GameState.IN_PROGRESS);
        assertThat(returnedShotResult.getShip().get().getHits()).isEqualTo(1);
        assertThat(returnedShotResult.getShip().get().isDestroyed()).isTrue();
    }

    @Test
    void shootMissAndLose() {
        List<List<Integer>> expectedGrid = List.of(List.of(1, 0, 0));
        Ship ship = new Ship(1,
                List.of(new Coordinates(0, 1)),
                0,
                false);
        List<Ship> ships = new ArrayList<>() {{
            add(ship);
        }};

        Game game = new Game(GAME_ID, GameState.IN_PROGRESS, new Board(grid, ships), 1, 0);

        when(gameGateway.getGame(GAME_ID)).thenReturn(Optional.of(game));

        BoundaryShotResult boundaryShotResult = new BoundaryShotResult(
                expectedGrid,
                GameState.LOST,
                null
        );

        when(shotResultD2BConverter.convert(expectedNoHits(expectedGrid, GameState.LOST)))
                .thenReturn(boundaryShotResult);

        BoundaryShotResult returnedShotResult = null;

        returnedShotResult = shootInteractor.shoot(GAME_ID, X, Y);

        assertThat(returnedShotResult.getGrid()).isEqualTo(expectedGrid);
        assertThat(returnedShotResult.getGameState()).isEqualTo(GameState.LOST);
        assertThat(returnedShotResult.getShip()).isEmpty();
    }

    @Test
    void shootDestroyShipAndWin() {
        List<List<Integer>> expectedGrid = List.of(List.of(3, 0, 0));
        Ship ship = new Ship(1,
                List.of(new Coordinates(0, 0)),
                0,
                false);
        List<Ship> ships = new ArrayList<>() {{
            add(ship);
        }};

        Game game = new Game(GAME_ID, GameState.IN_PROGRESS, new Board(grid, ships), 25, 0);

        when(gameGateway.getGame(GAME_ID)).thenReturn(Optional.of(game));

        BoundaryShotResult boundaryShotResult = new BoundaryShotResult(
                expectedGrid,
                GameState.WON,
                new BoundaryShip(1,
                        List.of(new Coordinates(0, 0)),
                        1,
                        true)
        );

        when(shotResultD2BConverter.convert(expectedHitAndDestroyedShip(expectedGrid, GameState.WON)))
                .thenReturn(boundaryShotResult);

        BoundaryShotResult returnedShotResult = null;

        returnedShotResult = shootInteractor.shoot(GAME_ID, X, Y);

        assertThat(returnedShotResult.getGrid()).isEqualTo(expectedGrid);
        assertThat(returnedShotResult.getGameState()).isEqualTo(GameState.WON);
        assertThat(returnedShotResult.getShip().get().getHits()).isEqualTo(1);
        assertThat(returnedShotResult.getShip().get().isDestroyed()).isTrue();
    }

    @Test
    void shootNullWhenGameNotFound() {
        when(gameGateway.getGame(GAME_ID)).thenReturn(Optional.empty());

        assertThrowsExactly(GameNotFoundException.class,
                () -> shootInteractor.shoot(GAME_ID, X, Y),
                "Game was not found!");
    }

    private static ShotResult expectedNoHits(List<List<Integer>> expectedGrid, GameState inProgress) {
        return argThat(argument -> argument.getGrid().equals(expectedGrid)
                && argument.getGameState() == inProgress
                && argument.getShip().isEmpty());
    }

    private static ShotResult expectedHit(List<List<Integer>> expectedGrid, GameState inProgress) {
        return argThat(argument -> argument.getGrid().equals(expectedGrid)
                && argument.getGameState() == inProgress
                && argument.getShip().isPresent()
                && argument.getShip().get().getHits() == 1
                && !argument.getShip().get().isDestroyed());
    }

    private static ShotResult expectedHitAndDestroyedShip(List<List<Integer>> expectedGrid, GameState inProgress) {
        return argThat(argument -> argument.getGrid().equals(expectedGrid)
                && argument.getGameState() == inProgress
                && argument.getShip().isPresent()
                && argument.getShip().get().getHits() == 1
                && argument.getShip().get().isDestroyed());
    }
}