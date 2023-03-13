package eu.optas.gateway.api;

import eu.optas.domain.Game;

public interface GameGateway {
    public Game createGame();

    public Game getGame(String id);

    public void updateGame(Game newGame, Game oldGame);
}
