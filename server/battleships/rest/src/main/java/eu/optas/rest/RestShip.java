package eu.optas.rest;

import com.fasterxml.jackson.annotation.JsonProperty;
import eu.optas.utils.Coordinates;

import java.util.List;

public class RestShip {
    private final int length;
    private final List<Coordinates> coordinates;
    private final int hits;
    private final boolean destroyed;

    public RestShip(@JsonProperty("length") int length,
                    @JsonProperty("coordinates") List<Coordinates> coordinates,
                    @JsonProperty("hits") int hits,
                    @JsonProperty("destroyed") boolean destroyed) {
        this.length = length;
        this.coordinates = coordinates;
        this.hits = hits;
        this.destroyed = destroyed;
    }

    public int getLength() {
        return length;
    }

    public List<Coordinates> getCoordinates() {
        return coordinates;
    }

    public int getHits() {
        return hits;
    }

    public boolean isDestroyed() {
        return destroyed;
    }
}
