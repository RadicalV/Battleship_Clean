package eu.optas.domain;

import java.util.List;

public class Board {
    private final List<List<Integer>> grid;
    private final List<Ship> ships;

    public Board(List<List<Integer>> grid, List<Ship> ships) {
        this.grid = grid;
        this.ships = ships;
    }

    public List<List<Integer>> getGrid() {
        return grid;
    }

    public List<Ship> getShips() {
        return ships;
    }
}
