package eu.optas.rest;

import com.fasterxml.jackson.annotation.JsonProperty;
import eu.optas.utils.GameState;

import java.util.List;

public class RestShotResult {
    private final List<List<Integer>> grid;
    private final GameState gameState;
    private final RestShip ship;

    public RestShotResult(@JsonProperty("grid") List<List<Integer>> grid, @JsonProperty("gameState") GameState gameState,
                          @JsonProperty("ship") RestShip ship) {
        this.grid = grid;
        this.gameState = gameState;
        this.ship = ship;
    }

    public List<List<Integer>> getGrid() {
        return grid;
    }

    public String getGameState() {
        return gameState.getLabel();
    }

    public RestShip getShip() {
        return ship;
    }
}
