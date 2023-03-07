package eu.optas.gateway.implementation;

import eu.optas.domain.Game;
import eu.optas.gateway.api.GameGateway;

import java.util.List;

public class InMemoryGameGateway implements GameGateway {
    private List<Game> gameList;

    @Override
    public Game createGame() {
        return null;
    }
}
