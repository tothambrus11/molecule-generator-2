enum AppModes {
    UserDraws,
    DrawByName
}

interface AppMode {
    setup(): void;
    draw(): void;
    mousePressed?(): void
}
