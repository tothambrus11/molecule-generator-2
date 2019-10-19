class Molecule {
    private atoms: Atom[];

    /*
    The n-th element of this array is the list of the Atoms it is connected to.
     */
    private connectionsA: number[][];
    private connectionsB: number[][];

    constructor() {
        this.connectionsA = [];
        this.connectionsB = [];
        this.atoms = [];
    }

    /**
     * Connects two atoms
     */
    public connect(a: number, b: number): void {
        while (a > this.connectionsB.length - 1 || b > this.connectionsB.length - 1) {
            this.connectionsA.push([]);
            this.connectionsB.push([]);
        }
        if (!this.isConnected(a, b)) {
            this.connectionsA[a].push(b);
            this.connectionsB[b].push(a);
        }
    }

    public removeConnections(a: number, b: number): void {
        if (this.isConnected(a, b)) {
            this.connectionsA[a] = this.connectionsA[a].filter(value => value !== b);
            this.connectionsA[b] = this.connectionsA[b].filter(value => value !== a);

            this.connectionsB[b] = this.connectionsB[b].filter(value => value !== a);
            this.connectionsB[a] = this.connectionsB[a].filter(value => value !== b);
        }
    }

    public isConnected(a: number, b: number) {
        if (a >= this.connectionsB.length || b >= this.connectionsB.length) {
            throw new Error("Too high atom index!")
        }
        if (a < 0 || b < 0) {
            throw new Error("Too low atom index!")
        }
        return ArrayHelper.contains(this.connectionsA[a], b) || ArrayHelper.contains(this.connectionsA[b], a);
    }

    public addAtom(atom: Atom): number {
        this.atoms.push(atom);
        this.connectionsA.push([]);
        this.connectionsB.push([]);

        return this.atoms.length - 1;
    }
}
