package eu.optas.gateway.api;

import eu.optas.domain.Game;
import eu.optas.domain.GameStats;

public interface GameGateway {
    public Game createGame();

    public Game getGame(String id);

    public GameStats getGameStats(String id);
}
