package eu.optas.rest;


import java.util.List;

public class RestBoard {
    private final List<List<Integer>> grid;
    private final List<RestShip> ships;

    public RestBoard(List<List<Integer>> grid, List<RestShip> ships) {
        this.grid = grid;
        this.ships = ships;
    }

    public List<List<Integer>> getGrid() {
        return grid;
    }

    public List<RestShip> getShips() {
        return ships;
    }
}
