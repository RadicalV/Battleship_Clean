package eu.optas.use_cases.api;

import eu.optas.utils.GameState;

public class BoundaryGame {
    private final String id;
    private final GameState state;
    private final BoundaryBoard board;
    private final int hitsRemaining;
    private final int shipsDestroyed;

    public BoundaryGame(String id, GameState state, BoundaryBoard board, int hitsRemaining, int shipsDestroyed) {
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

    public BoundaryBoard getBoard() {
        return board;
    }

    public int getHitsRemaining() {
        return hitsRemaining;
    }

    public int getShipsDestroyed() {
        return shipsDestroyed;
    }
}
