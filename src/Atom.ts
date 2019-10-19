const ATOMS: Atom[] = [
    {
        atomicNumber: 1,
        name: "hidrogén",
        massPerMol: 1.008
    },
    {
        atomicNumber: 6,
        name: "szén",
        massPerMol: 12.011
    }
];

interface Atom {
    atomicNumber: number
    name: string,
    massPerMol: number,
}

/**
 * Gets an atom by its atomic number
 * @param atomicNumber
 */
function getAtom(atomicNumber: number) {
    return ATOMS.find((atom: Atom) => atom.atomicNumber === atomicNumber)
}

function atomByName(name: string) {
    return ATOMS.find(atom => {
        return atom.name === name;
    });
}
