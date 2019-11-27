const ATOMS: Atom[] = [
    {
        atomicNumber: 1,
        name: "hidrogén",
        massPerMol: 1.00784,
        color: [255,255,255]
    },
    {
        atomicNumber: 6,
        name: "szén",
        massPerMol: 12.0107,
        color: [20,20,20]
    },
    {
        atomicNumber: 7,
        name: "nitrogén",
        color: [0,0,255],
        massPerMol: 14.0067
    },
    {
        atomicNumber: 8,
        name: "oxigén",
        color: [255,0,0],
        massPerMol: 15.999
    },
    {
        atomicNumber: 9,
        name: "fluor",
        massPerMol: 18.998403,
        color: [0,255,0]
    },
    {
        atomicNumber: 35,
        name: "bróm",
        color: [128, 0,0],
        massPerMol: 79.904
    },
    {
        atomicNumber: 53,
        name: "jód",
        color: [102, 0, 187],
        massPerMol: 126.90447
    },
    {
        atomicNumber: 15,
        name: "foszfor",
        color: [255,153, 0],
        massPerMol: 30.973762
    },
    {
        atomicNumber: 16,
        name: "kén",
        color: [255,255,0],
        massPerMol: 32.065
    },
    {
        atomicNumber: 17,
        name: "klór",
        color: [0,255,0],
        massPerMol: 35.453
    }
];

interface Atom {
    atomicNumber: number
    name: string,
    massPerMol: number,
    color: number[]
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
