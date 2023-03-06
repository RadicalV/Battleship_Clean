package eu.optas.domain;

import eu.optas.utils.GameState;

public class ShotResult {
    private final int[][] grid;
    private Ship ship;
    private final GameState gameState;

    public ShotResult(int[][] grid, Ship ship, GameState gameState) {
        this.grid = grid;
        this.ship = ship;
        this.gameState = gameState;
    }

    public ShotResult(int[][] grid, GameState gameState) {
        this.grid = grid;
        this.gameState = gameState;
    }
}
