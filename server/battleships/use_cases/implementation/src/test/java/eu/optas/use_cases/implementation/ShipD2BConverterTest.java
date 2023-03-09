package eu.optas.use_cases.implementation;

import eu.optas.domain.Ship;
import eu.optas.use_cases.api.BoundaryShip;
import eu.optas.utils.Coordinates;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class ShipD2BConverterTest {

    @Test
    void convert() {
        ShipD2BConverter shipD2BConverter = new ShipD2BConverter();
        Coordinates coordinates = new Coordinates(1, 1);
        List<Coordinates> coordinatesList = new ArrayList<>();
        coordinatesList.add(coordinates);

        Ship inputShip = new Ship(5, coordinatesList, 0, false);

        BoundaryShip convertedShip = shipD2BConverter.convert(inputShip);

        assertThat(convertedShip).usingRecursiveComparison().isEqualTo(inputShip);
    }
}