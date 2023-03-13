package eu.optas.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import eu.optas.use_cases.api.BoundaryShotResult;
import eu.optas.use_cases.api.ShootUC;
import eu.optas.utils.Coordinates;
import eu.optas.utils.GameNotFoundException;
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
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Coordinates coordinates = objectMapper.readValue(ctx.body(), Coordinates.class);
            BoundaryShotResult boundaryShotResult = shootUC.shoot(ctx.pathParam("id"), coordinates.getX(), coordinates.getY());
            ctx.json(shotResultB2RConverter.convert(boundaryShotResult));
        } catch (GameNotFoundException e) {
            ctx.json(Map.of("message", "Game not found!"));
            ctx.status(404);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
