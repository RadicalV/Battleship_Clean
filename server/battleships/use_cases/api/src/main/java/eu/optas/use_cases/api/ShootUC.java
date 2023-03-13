package eu.optas.use_cases.api;

public interface ShootUC {
    public BoundaryShotResult shoot(String gameId, int x, int y) throws Exception;
}
