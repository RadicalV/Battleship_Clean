package eu.optas.use_cases.implementation;

import eu.optas.domain.Board;
import eu.optas.domain.Game;
import eu.optas.use_cases.api.BoundaryGame;
import eu.optas.utils.GameState;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;

class GameD2BConverterTest {

    @Test
    void convert() {
        BoardD2BConverter boardD2BConverter = mock(BoardD2BConverter.class);
        GameD2BConverter gameD2BConverter = new GameD2BConverter(boardD2BConverter);
        Board board = mock(Board.class);

        Game inputGame = new Game(
                "123",
                GameState.IN_PROGRESS,
                board,
                25,
                0
        );
        BoundaryGame expectedGame = new BoundaryGame(
                "123",
                GameState.IN_PROGRESS,
                boardD2BConverter.convert(board),
                25,
                0
        );

        BoundaryGame convertedGame = gameD2BConverter.convert(inputGame);

        assertThat(convertedGame.getId()).isEqualTo(expectedGame.getId());
        assertThat(convertedGame.getState()).isEqualTo(expectedGame.getState());
        assertThat(convertedGame.getBoard()).isEqualTo(expectedGame.getBoard());
        assertThat(convertedGame.getHitsRemaining()).isEqualTo(expectedGame.getHitsRemaining());
        assertThat(convertedGame.getShipsDestroyed()).isEqualTo(expectedGame.getShipsDestroyed());
    }
}