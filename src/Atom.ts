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
    },
    {
        atomicNumber: 9,
        name: "fluor",
        massPerMol: 18.998
    },
    {
        atomicNumber: 17,
        name: "klór",
        massPerMol: 35.45
    },
    {
        atomicNumber: 35,
        name: "bróm",
        massPerMol: 79.904
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

function atom(name: string) {
    return ATOMS.find(atom => {
        return atom.name === name;
    });
}
