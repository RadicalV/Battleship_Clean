package eu.optas.domain;

public class Board {
    private final int[][] grid;
    private final Ship[] ships;

    public Board(int[][] grid, Ship[] ships) {
        this.grid = grid;
        this.ships = ships;
    }
}
