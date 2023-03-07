package eu.optas.use_cases.api;

import eu.optas.utils.GameState;

public class BoundaryGame {
    private final String id;
    private final GameState state;
    private final BoundaryBoard board;

    public BoundaryGame(String id, GameState state, BoundaryBoard board) {
        this.id = id;
        this.state = state;
        this.board = board;
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
}
