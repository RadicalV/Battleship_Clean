package eu.optas.use_cases.api;

import java.util.Optional;

public interface GetGameUC {
    public Optional<BoundaryGame> getGame(String id);
}
