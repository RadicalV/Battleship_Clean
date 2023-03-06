package eu.optas.domain;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class CounterTest {
    @Test
    void name() {
//        LocalDate mock = mock(LocalDate.class);
//        when(mock.toString()).thenReturn("EXPECTED");

        Counter counter = new Counter(100);

        assertThat(counter.getString()).isEqualTo("100");
    }
}