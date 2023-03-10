package eu.optas.utils;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Coordinates {
    private final int x;
    private final int y;

    public Coordinates(@JsonProperty("x") int x, @JsonProperty("y") int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }
}
