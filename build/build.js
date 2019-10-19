class Alks {
    static getCNumber(name) {
        let index = Alks.prefixes.indexOf(name);
        if (index === -1) {
            throw new Error("Alk prefix name not found");
        }
        return index + 1;
    }
}
Alks.prefixes = [
    "met",
    "et",
    "prop",
    "but",
    "pent",
    "hex",
    "hept",
    "okt",
    "non",
    "dek",
    "undek",
    "dodek"
];
Alks.numberPrefixes = [
    "",
    "di",
    "tri",
    "tetra",
    "penta",
    "hexa",
    "hepta",
    "okta",
    "nona",
    "deka",
    "undeka",
    "dodeka"
];
class ArrayHelper {
    static contains(array, thing) {
        return array.indexOf(thing) >= 0;
    }
}
const ATOMS = [
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
function getAtom(atomicNumber) {
    return ATOMS.find((atom) => atom.atomicNumber === atomicNumber);
}
function atomByName(name) {
    return ATOMS.find(atom => {
        return atom.name === name;
    });
}
class Molecule {
    constructor() {
        this.connectionsA = [];
        this.connectionsB = [];
        this.atoms = [];
    }
    connect(a, b) {
        while (a > this.connectionsB.length - 1 || b > this.connectionsB.length - 1) {
            this.connectionsA.push([]);
            this.connectionsB.push([]);
        }
        if (!this.isConnected(a, b)) {
            this.connectionsA[a].push(b);
            this.connectionsB[b].push(a);
        }
    }
    removeConnections(a, b) {
        if (this.isConnected(a, b)) {
            this.connectionsA[a] = this.connectionsA[a].filter(value => value !== b);
            this.connectionsA[b] = this.connectionsA[b].filter(value => value !== a);
            this.connectionsB[b] = this.connectionsB[b].filter(value => value !== a);
            this.connectionsB[a] = this.connectionsB[a].filter(value => value !== b);
        }
    }
    isConnected(a, b) {
        if (a >= this.connectionsB.length || b >= this.connectionsB.length) {
            throw new Error("Too high atom index!");
        }
        if (a < 0 || b < 0) {
            throw new Error("Too low atom index!");
        }
        return ArrayHelper.contains(this.connectionsA[a], b) || ArrayHelper.contains(this.connectionsA[b], a);
    }
    addAtom(atom) {
        this.atoms.push(atom);
        this.connectionsA.push([]);
        this.connectionsB.push([]);
        return this.atoms.length - 1;
    }
}
class StringHelper {
    static findLongestStringAtTheEnd(text, endStrings) {
        let longestStringIndex = null;
        function getLongestEndString() {
            return endStrings[longestStringIndex];
        }
        endStrings.forEach((endString, index) => {
            if (text.endsWith(endString)) {
                if (longestStringIndex == null || getLongestEndString().length < endString.length) {
                    longestStringIndex = index;
                }
            }
        });
        if (longestStringIndex === null) {
            throw new Error("End not found");
        }
        return endStrings[longestStringIndex];
    }
}
let m;
function setup() {
    createCanvas(windowWidth, windowHeight);
    let fullName = "2,3-dimetil-3-etilciklodekán";
    m = new Molecule();
    if (!fullName.endsWith("án")) {
        throw new Error("Jelenleg csak alkánok támogatottak");
    }
    let nameWithoutAne = fullName.slice(0, -2);
    let longestChainPrefix = StringHelper.findLongestStringAtTheEnd(nameWithoutAne, Alks.prefixes);
    let nameWithoutLongestChain = nameWithoutAne.slice(0, -longestChainPrefix.length);
    let isCircular = nameWithoutLongestChain.endsWith("ciklo");
    if (isCircular) {
        nameWithoutLongestChain = nameWithoutLongestChain.slice(0, -"ciklo".length);
    }
    let longestChainCNumber = Alks.getCNumber(longestChainPrefix);
    console.log(longestChainCNumber);
    for (let i = 0; i < longestChainCNumber; i++) {
        m.addAtom(atomByName("szén"));
        if (i !== 0) {
            m.connect(i, i - 1);
        }
    }
    if (isCircular) {
        m.connect(0, longestChainCNumber - 1);
    }
    console.log(nameWithoutLongestChain);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(100);
}
//# sourceMappingURL=build.js.map