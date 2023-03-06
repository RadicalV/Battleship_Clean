package eu.optas.domain;

import eu.optas.utils.GameState;

public class Game {
    private final String id;
    private final GameState state;
    private final Board board;
    private final int hitsRemaining;
    private final int shipsDestroyed;

    public Game(String id, GameState state, Board board, int hitsRemaining, int shipsDestroyed) {
        this.id = id;
        this.state = state;
        this.board = board;
        this.hitsRemaining = hitsRemaining;
        this.shipsDestroyed = shipsDestroyed;
    }
}
