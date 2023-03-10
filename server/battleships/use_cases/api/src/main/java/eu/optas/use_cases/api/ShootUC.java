package eu.optas.use_cases.api;

import java.util.Optional;

public interface ShootUC {
    public Optional<BoundaryShotResult> shoot(String gameId, int x, int y);
}
