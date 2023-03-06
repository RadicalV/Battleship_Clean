package eu.optas.domain;

import eu.optas.utils.GameState;

import java.util.List;
import java.util.Optional;

public class ShotResult {
    private final List<List<Integer>> grid;
    private final Optional<Ship> ship;
    private final GameState gameState;

    public ShotResult(List<List<Integer>> grid, Optional<Ship> ship, GameState gameState) {
        this.grid = grid;
        this.ship = ship;
        this.gameState = gameState;
    }

    public List<List<Integer>> getGrid() {
        return grid;
    }

    public Optional<Ship> getShip() {
        return ship;
    }

    public GameState getGameState() {
        return gameState;
    }
}
