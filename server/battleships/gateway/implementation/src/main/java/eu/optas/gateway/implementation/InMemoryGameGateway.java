package eu.optas.gateway.implementation;

import eu.optas.domain.Board;
import eu.optas.domain.Game;
import eu.optas.domain.Ship;
import eu.optas.gateway.api.GameGateway;
import eu.optas.utils.Coordinates;
import eu.optas.utils.GameState;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

public class InMemoryGameGateway implements GameGateway {
    private final List<Game> gameList;

    public InMemoryGameGateway(List<Game> gameList) {
        this.gameList = gameList;
    }

    @Override
    public Game createGame() {
        String id = generateId();
        List<List<Integer>> grid = generateGrid();
        List<Ship> ships = generateShips();
        Game game = new Game(id, GameState.IN_PROGRESS, new Board(grid, ships), 25, 0);
        gameList.add(game);
        return game;
    }

    @Override
    public Game getGame(String id) {
        return gameList.stream().filter(game -> game.getId().equals(id)).findFirst().orElse(null);
    }

    @Override
    public void updateGame(Game game, Game oldGame) {
        int gameIndex = gameList.indexOf(oldGame);
        gameList.set(gameIndex, game);
    }

    private String generateId() {
        return UUID.randomUUID().toString();
    }

    private List<List<Integer>> generateGrid() {
        List<List<Integer>> grid = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j < 10; j++)
                row.add(0);
            grid.add(row);
        }
        return grid;
    }

    private List<Ship> generateShips() {
        List<Ship> ships = new ArrayList<>();
        ships.add(new Ship(4, new ArrayList<>(Arrays.asList(new Coordinates(9, 9),
                new Coordinates(9, 8), new Coordinates(9, 7), new Coordinates(9, 6))),
                0, false));
        return ships;
    }
}
