package eu.optas.use_cases.api;

import java.util.List;

public class BoundaryBoard {
    private final List<List<Integer>> grid;
    private final List<BoundaryShip> ships;

    public BoundaryBoard(List<List<Integer>> grid, List<BoundaryShip> ships) {
        this.grid = grid;
        this.ships = ships;
    }

    public List<List<Integer>> getGrid() {
        return grid;
    }

    public List<BoundaryShip> getShips() {
        return ships;
    }
}
