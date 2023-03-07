package eu.optas.use_cases.api;

public class BoundaryGameStats {
    private final int hitsRemaining;
    private final int shipsDestroyed;

    public BoundaryGameStats(int hitsRemaining, int shipsDestroyed) {
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
