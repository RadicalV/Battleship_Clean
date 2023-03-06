package eu.optas.domain;

public class GameStats {
    private final int hitsRemaining;
    private final int shipsDestroyed;

    public GameStats(int hitsRemaining, int shipsDestroyed) {
        this.hitsRemaining = hitsRemaining;
        this.shipsDestroyed = shipsDestroyed;
    }
}
