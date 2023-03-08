package eu.optas.use_cases.implementation;

import eu.optas.domain.Game;
import eu.optas.use_cases.api.BoundaryGame;
import eu.optas.utils.Converter;

public class GameD2BConverter extends Converter<Game, BoundaryGame> {
    private BoardD2BConverter boardD2BConverter;

    public GameD2BConverter(BoardD2BConverter boardD2BConverter) {
        this.boardD2BConverter = boardD2BConverter;
    }

    @Override
    public BoundaryGame convert(Game game) {
        return new BoundaryGame(
                game.getId(),
                game.getState(),
                boardD2BConverter.convert(game.getBoard()),
                game.getHitsRemaining(),
                game.getShipsDestroyed()
        );
    }
}
