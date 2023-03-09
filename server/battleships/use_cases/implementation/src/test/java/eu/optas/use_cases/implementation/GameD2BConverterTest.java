package eu.optas.use_cases.implementation;

import eu.optas.domain.Board;
import eu.optas.domain.Game;
import eu.optas.use_cases.api.BoundaryBoard;
import eu.optas.use_cases.api.BoundaryGame;
import eu.optas.utils.GameState;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class GameD2BConverterTest {

    @Test
    void convert() {
        BoardD2BConverter boardD2BConverter = mock(BoardD2BConverter.class);
        GameD2BConverter gameD2BConverter = new GameD2BConverter(boardD2BConverter);

        Board board = mock(Board.class);
        BoundaryBoard boundaryBoard = mock(BoundaryBoard.class);
        when(boardD2BConverter.convert(board)).thenReturn(boundaryBoard);

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
                boundaryBoard,
                25,
                0
        );
        BoundaryGame convertedGame = gameD2BConverter.convert(inputGame);

        assertThat(convertedGame).usingRecursiveComparison().isEqualTo(expectedGame);
    }
}