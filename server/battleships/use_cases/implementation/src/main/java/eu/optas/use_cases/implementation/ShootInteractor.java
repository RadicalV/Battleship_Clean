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
        Ship foundShip = checkForShip(game, x, y);
        Ship newShip = constructNewShip(foundShip);

        Game updatedGame = constructUpdatedGame(game, newShip, foundShip, x, y);

        gameGateway.updateGame(updatedGame);
        return new ShotResult(updatedGame.getBoard().getGrid(), newShip, updatedGame.getState());
    }

    private Ship checkForShip(Game game, int x, int y) {
        return game.getBoard().getShips().stream()
                .filter(ship -> ship.getCoordinates().stream()
                        .anyMatch(coordinates -> coordinates.getX() == x && coordinates.getY() == y))
                .findFirst()
                .orElse(null);
    }

    private static Ship constructNewShip(Ship foundShip) {
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
        return newShip;
    }

    private Game constructUpdatedGame(Game game, Ship newShip, Ship foundShip, int x, int y) {
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

        return new Game(game.getId(), gameState, new Board(grid, ships), hitsRemaining, shipsDestroyed);
    }

    private static int updateShipsDestroyed(Ship newShip, List<List<Integer>> grid, int shipsDestroyed) {
        newShip.getCoordinates().forEach(coordinates -> grid.get(coordinates.getX()).set(coordinates.getY(), 3));
        shipsDestroyed += 1;
        return shipsDestroyed;
    }
}