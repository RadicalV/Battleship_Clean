package eu.optas.utils;

import java.util.List;
import java.util.stream.Collectors;

public abstract class Converter<I, O> {
    public List<O> convertAll(List<I> input) {
        return input.stream().map(this::convert).collect(Collectors.toList());
    }

    public abstract O convert(I input);
}
