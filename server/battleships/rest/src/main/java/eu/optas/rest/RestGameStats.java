package eu.optas.rest;

public class RestGameStats {
    private final int hitsRemaining;
    private final int shipsDestroyed;

    public RestGameStats(int hitsRemaining, int shipsDestroyed) {
        this.hitsRemaining = hitsRemaining;
        this.shipsDestroyed = shipsDestroyed;
    }

    public int getHitsRemaining() {
        return hitsRemaining;
    }

    public int getShipsDestroyed() {
        return shipsDestroyed;
    }
}
