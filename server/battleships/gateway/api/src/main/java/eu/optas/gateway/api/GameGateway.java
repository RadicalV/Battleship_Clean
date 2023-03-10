package eu.optas.gateway.api;

import eu.optas.domain.Game;
import eu.optas.domain.ShotResult;

public interface GameGateway {
    public Game createGame();

    public Game getGame(String id);

    public ShotResult shoot(String id, int x, int y);
}
