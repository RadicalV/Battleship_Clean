package eu.optas.domain;

public class GameStats {
    private final int hitsRemaining;
    private final int shipsDestroyed;

    public GameStats(int hitsRemaining, int shipsDestroyed) {
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
