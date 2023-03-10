package eu.optas.rest;

import eu.optas.use_cases.api.ShootUC;
import eu.optas.utils.Coordinates;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.jetbrains.annotations.NotNull;

import java.util.Map;

public class ShootRoute implements Handler {
    private final ShootUC shootUC;
    private final ShotResultB2RConverter shotResultB2RConverter;

    public ShootRoute(ShootUC shootUC, ShotResultB2RConverter shotResultB2RConverter) {
        this.shootUC = shootUC;
        this.shotResultB2RConverter = shotResultB2RConverter;
    }

    @Override
    public void handle(@NotNull Context ctx) {
        Coordinates coordinates = ctx.bodyAsClass(Coordinates.class);

        shootUC.shoot(ctx.pathParam("id"), coordinates.getX(), coordinates.getY())
                .ifPresentOrElse(shotResult -> ctx.json(shotResultB2RConverter.convert(shotResult)),
                        () -> {
                            ctx.json(Map.of("message", "Game not found!"));
                            ctx.status(404);
                        });
    }
}
