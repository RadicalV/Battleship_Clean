package eu.optas;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class CounterTest {
    @Test
    void returnsDefault() {
        Counter counter = new Counter(100);
        int number = counter.getNumber();
        assertThat(number).isEqualTo(100);
    }
}