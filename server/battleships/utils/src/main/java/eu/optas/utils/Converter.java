package eu.optas.utils;

import java.util.ArrayList;
import java.util.List;

public abstract class Converter<I, O> {
    public List<O> convertAll(List<I> input) {
        List<O> output = new ArrayList<>();
        for (I i : input) {
            output.add(convert(i));
        }
        return output;
    }

    public abstract O convert(I input);
}
