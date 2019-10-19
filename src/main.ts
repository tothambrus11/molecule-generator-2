let m: Molecule;

function setup() {
    createCanvas(windowWidth, windowHeight);

    let fullName = "2,3-dimetil-3-etilciklodekán";
    m = new Molecule();

    // metÁN levágása
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
