package eu.optas.rest;

import eu.optas.utils.GameState;

public class RestGame {
    private final String id;
    private final GameState state;
    private final RestBoard board;
    private final int hitsRemaining;
    private final int shipsDestroyed;

    public RestGame(String id, GameState state, RestBoard board, int hitsRemaining, int shipsDestroyed) {
        this.id = id;
        this.state = state;
        this.board = board;
        this.hitsRemaining = hitsRemaining;
        this.shipsDestroyed = shipsDestroyed;
    }

    public String getId() {
        return id;
    }

    public GameState getState() {
        return state;
    }

    public RestBoard getBoard() {
        return board;
    }

    public int getHitsRemaining() {
        return hitsRemaining;
    }

    public int getShipsDestroyed() {
        return shipsDestroyed;
    }
}
