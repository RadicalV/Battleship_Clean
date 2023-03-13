package eu.optas.use_cases.implementation;

import eu.optas.domain.Board;
import eu.optas.domain.Game;
import eu.optas.domain.Ship;
import eu.optas.domain.ShotResult;
import eu.optas.gateway.api.GameGateway;
import eu.optas.use_cases.api.BoundaryShotResult;
import eu.optas.use_cases.api.ShootUC;
import eu.optas.utils.GameNotFoundException;
import eu.optas.utils.GameState;
import kotlin.Pair;

import java.util.List;

import static java.util.Objects.nonNull;

public class ShootInteractor implements ShootUC {
    private final GameGateway gameGateway;
    private final ShotResultD2BConverter shotResultD2BConverter;

    public ShootInteractor(GameGateway gameGateway, ShotResultD2BConverter shotResultD2BConverter) {
        this.gameGateway = gameGateway;
        this.shotResultD2BConverter = shotResultD2BConverter;
    }

    @Override
    public BoundaryShotResult shoot(String gameId, int x, int y) {
        return gameGateway.getGame(gameId)
                .map(game -> shotResultD2BConverter.convert(checkShot(game, x, y)))
                .orElseThrow(() -> new GameNotFoundException("Game was not found!"));
    }

    private ShotResult checkShot(Game game, int x, int y) {
        Pair<Ship, Game> updated = updateShipAndGame(game, x, y);

        gameGateway.updateGame(updated.getSecond());
        return new ShotResult(updated.getSecond().getBoard().getGrid(), updated.getFirst(), updated.getSecond().getState());
    }

    private Pair<Ship, Game> updateShipAndGame(Game game, int x, int y) {
        List<Ship> ships = game.getBoard().getShips();
        List<List<Integer>> grid = game.getBoard().getGrid();
        int shipsDestroyed = game.getShipsDestroyed();
        int hitsRemaining = game.getHitsRemaining();

        Ship foundShip = checkForShip(game, x, y);
        Ship newShip = damageShip(foundShip);

        if (nonNull(newShip) && nonNull(foundShip)) {
            updateShips(ships, foundShip, newShip);
            shipsDestroyed += updateHitShot(x, y, grid, newShip);
        } else
            hitsRemaining -= updateMissedShot(x, y, grid);

        GameState gameState = updateGameState(ships, shipsDestroyed, hitsRemaining);

        Game updatedGame = new Game(game.getId(), gameState, new Board(grid, ships), hitsRemaining, shipsDestroyed);
        return new Pair<>(newShip, updatedGame);
    }

    private Ship checkForShip(Game game, int x, int y) {
        return game.getBoard().getShips().stream()
                .filter(ship -> ship.getCoordinates().stream()
                        .anyMatch(coordinates -> coordinates.getX() == x && coordinates.getY() == y))
                .findFirst()
                .orElse(null);
    }

    private static Ship damageShip(Ship foundShip) {
        Ship newShip = null;

        if (nonNull(foundShip))
            newShip = new Ship(
                    foundShip.getLength(),
                    foundShip.getCoordinates(),
                    foundShip.getHits() + 1,
                    foundShip.getLength() <= foundShip.getHits() + 1
            );
        return newShip;
    }

    private static void updateShips(List<Ship> ships, Ship foundShip, Ship newShip) {
        int index = ships.indexOf(foundShip);
        ships.set(index, newShip);
    }

    private static int updateHitShot(int x, int y, List<List<Integer>> grid, Ship newShip) {
        int shipsDestroyed = 0;
        if (newShip.isDestroyed()) {
            newShip.getCoordinates().forEach(coordinates -> grid.get(coordinates.getX()).set(coordinates.getY(), 3));
            shipsDestroyed += 1;
        } else grid.get(x).set(y, 2);
        return shipsDestroyed;
    }

    private static int updateMissedShot(int x, int y, List<List<Integer>> grid) {
        grid.get(x).set(y, 1);
        return 1;
    }

    private static GameState updateGameState(List<Ship> ships, int shipsDestroyed, int hitsRemaining) {
        if (shipsDestroyed >= ships.size()) return GameState.WON;
        else if (hitsRemaining <= 0) return GameState.LOST;
        else return GameState.IN_PROGRESS;
    }
}