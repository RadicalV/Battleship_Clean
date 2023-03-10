package eu.optas.gateway.implementation;

import eu.optas.domain.Board;
import eu.optas.domain.Game;
import eu.optas.domain.Ship;
import eu.optas.domain.ShotResult;
import eu.optas.gateway.api.GameGateway;
import eu.optas.utils.Coordinates;
import eu.optas.utils.GameState;

import java.util.*;

import static java.util.Objects.nonNull;

public class InMemoryGameGateway implements GameGateway {
    private final List<Game> gameList;

    public InMemoryGameGateway(List<Game> gameList) {
        this.gameList = gameList;
    }

    @Override
    public Game createGame() {
        String id = generateId();
        List<List<Integer>> grid = generateGrid();
        List<Ship> ships = generateShips();
        Game game = new Game(id, GameState.IN_PROGRESS, new Board(grid, ships), 25, 0);
        gameList.add(game);
        return game;
    }

    @Override
    public Game getGame(String id) {
        return gameList.stream().filter(game -> game.getId().equals(id)).findFirst().orElse(null);
    }

    @Override
    public ShotResult shoot(String id, int x, int y) {
        return Optional.ofNullable(getGame(id)).map(game -> checkShot(game, x, y)).orElse(null);
    }

    private ShotResult checkShot(Game game, int x, int y) {
        Ship foundShip = checkForShip(game, x, y);
        Ship newShip = null;
        if (nonNull(foundShip)) {
            int hits = foundShip.getHits() + 1;
            newShip = new Ship(
                    foundShip.getLength(),
                    foundShip.getCoordinates(),
                    hits,
                    foundShip.getLength() <= hits
            );
        }

        return updateGame(game, newShip, foundShip, x, y);
    }

    private ShotResult updateGame(Game game, Ship newShip, Ship foundShip, int x, int y) {
        List<Ship> ships = game.getBoard().getShips();
        List<List<Integer>> grid = game.getBoard().getGrid();
        int shipsDestroyed = game.getShipsDestroyed();
        int hitsRemaining = game.getHitsRemaining();
        GameState gameState = game.getState();

        if (nonNull(newShip) && nonNull(foundShip)) {
            int index = ships.indexOf(foundShip);
            ships.set(index, newShip);
            if (newShip.isDestroyed()) {
                shipsDestroyed = updateShipsDestroyed(newShip, grid, shipsDestroyed);
            } else grid.get(x).set(y, 2);
        } else {
            grid.get(x).set(y, 1);
            hitsRemaining -= 1;
        }

        if (shipsDestroyed >= ships.size()) gameState = GameState.WON;
        else if (hitsRemaining <= 0) gameState = GameState.LOST;

        int gameIndex = gameList.indexOf(game);
        gameList.set(gameIndex, new Game(game.getId(), gameState, new Board(grid, ships), hitsRemaining, shipsDestroyed));

        return new ShotResult(grid, newShip, gameState);
    }

    private static int updateShipsDestroyed(Ship newShip, List<List<Integer>> grid, int shipsDestroyed) {
        newShip.getCoordinates().forEach(coordinates -> grid.get(coordinates.getX()).set(coordinates.getY(), 3));
        shipsDestroyed += 1;
        return shipsDestroyed;
    }

    private Ship checkForShip(Game game, int x, int y) {
        return game.getBoard().getShips().stream()
                .filter(ship -> ship.getCoordinates().stream()
                        .anyMatch(coordinates -> coordinates.getX() == x && coordinates.getY() == y))
                .findFirst()
                .orElse(null);
    }

    private String generateId() {
        return UUID.randomUUID().toString();
    }

    private List<List<Integer>> generateGrid() {
        List<List<Integer>> grid = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j < 10; j++)
                row.add(0);
            grid.add(row);
        }
        return grid;
    }

    private List<Ship> generateShips() {
        List<Ship> ships = new ArrayList<>();
        ships.add(new Ship(4, new ArrayList<>(Arrays.asList(new Coordinates(9, 9),
                new Coordinates(9, 8), new Coordinates(9, 7), new Coordinates(9, 6))),
                0, false));
        return ships;
    }
}
