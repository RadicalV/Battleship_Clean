package eu.optas.rest;

import eu.optas.utils.GameState;

import java.util.List;

public class RestShotResult {
    private final List<List<Integer>> grid;
    private final GameState gameState;
    private final RestShip ship;

    public RestShotResult(List<List<Integer>> grid, GameState gameState, RestShip ship) {
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

    public RestShip getShip() {
        return ship;
    }
}
