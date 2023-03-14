package eu.optas.utils;

public enum GameState {
    IN_PROGRESS("in-progress"),
    LOST("lost"),
    WON("won");

    private final String label;

    GameState(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
