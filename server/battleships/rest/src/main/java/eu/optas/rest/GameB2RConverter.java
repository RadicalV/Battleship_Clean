package eu.optas.rest;

import eu.optas.use_cases.api.BoundaryBoard;
import eu.optas.use_cases.api.BoundaryGame;
import eu.optas.use_cases.api.BoundaryShip;

import java.util.List;
import java.util.stream.Collectors;

public class GameB2RConverter {

    public RestGame convertGame(BoundaryGame game) {
        return new RestGame(game.getId(), game.getState(), convertBoard(game.getBoard()),
                game.getHitsRemaining(), game.getShipsDestroyed());
    }

    private RestBoard convertBoard(BoundaryBoard board) {
        return new RestBoard(board.getGrid(), convertAllShips(board.getShips()));
    }

    private RestShip convertShip(BoundaryShip ship) {
        return new RestShip(ship.getLength(), ship.getCoordinates(), ship.getHits(), ship.isDestroyed());
    }

    private List<RestShip> convertAllShips(List<BoundaryShip> ships) {
        return ships.stream().map(this::convertShip).collect(Collectors.toList());
    }
}
