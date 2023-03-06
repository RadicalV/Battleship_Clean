package eu.optas.domain;

public class Ship {
    private final int length;
    private final Coordinates[] coordinates;
    private final int hits;
    private final boolean destroyed;

    public Ship(int length, Coordinates[] coordinates, int hits, boolean destroyed) {
        this.length = length;
        this.coordinates = coordinates;
        this.hits = hits;
        this.destroyed = destroyed;
    }
}
