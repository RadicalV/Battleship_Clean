package eu.optas.use_cases.api;

import eu.optas.utils.GameState;

import java.util.List;
import java.util.Optional;

public class BoundaryShotResult {
    private final List<List<Integer>> grid;
    private final GameState gameState;
    private final BoundaryShip ship;

    public BoundaryShotResult(List<List<Integer>> grid, GameState gameState, BoundaryShip ship) {
        this.grid = grid;
        this.gameState = gameState;
        this.ship = ship;
    }

    public List<List<Integer>> getGrid() {
        return grid;
    }

    public GameState getGameState() {
        return gameState;
    }

    public Optional<BoundaryShip> getShip() {
        return Optional.ofNullable(ship);
    }
}
