package eu.optas.gateway.api;

import eu.optas.domain.Game;

import java.util.Optional;

public interface GameGateway {
    public Game createGame();

    public Optional<Game> getGame(String id);

    public void updateGame(Game newGame);
}
