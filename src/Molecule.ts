const isDebug = false;


function rotationCucc(deltaPos: p5.Vector) {
    if (deltaPos.y != 0) {
        rotateZ(atan(deltaPos.y / deltaPos.x));
    }
    rotateY(acos(deltaPos.z / deltaPos.mag()));
}

let zc = 0;
let yc = 0;


class Molecule {
    private atoms: Atom[];

    /*
    The n-th element of this array is the list of the Atoms it is connected to.
     */
    private connectionsA: number[][];
    private connectionsB: number[][];

    public name: string;
    private rotation: p5.Vector;

    constructor() {
        this.connectionsA = [];
        this.connectionsB = [];
        this.atoms = [];
        this.rotation = createVector();
        this.middlePosition = createVector();
    }

    /**
     * Connects two atoms
     */
    public connect(to: number, from: number): void {
        while (to > this.connectionsB.length - 1 || from > this.connectionsB.length - 1) {
            this.connectionsA.push([]);
            this.connectionsB.push([]);
        }
        if (!this.isConnected(to, from)) {
            this.connectionsA[to].push(from);
            this.connectionsB[from].push(to);
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

    public getOutgoingConnections(index: number): number[] {
        if (index > this.atoms.length) throw new Error("Nem létező atomindex: " + index);
        return this.connectionsB[index];
    }

    public getAllConnections(index: number): number[] {
        let a = this.getOutgoingConnections(index);
        let b = this.getIncomingConnections(index);

        // remove duplicated items
        return a.concat(b.filter((item) => a.indexOf(item) < 0));
    }

    draw() {

        ambientLight(30);
        // directionalLight([255,255,255], createVector(-(mouseX-width/2), -(mouseY-height/2)-200, -400));
        directionalLight([255, 255, 255], createVector(-(mouseX - width / 2), -(mouseY - height / 2), -400));


        if (keyIsDown(DOWN_ARROW)) {
            yc--;
        } else if (keyIsDown(UP_ARROW)) {
            yc++;
        } else if (keyIsDown(LEFT_ARROW)) {
            zc--;
        } else if (keyIsDown(RIGHT_ARROW)) {
            zc++;
        }

        if (mouseIsPressed && mouseButton == LEFT) {
            this.rotation.add(radians(mouseX - pmouseX) * 0.5, radians(pmouseY - mouseY) * 0.5);
        }

        let r = this.rotation.copy().add(frameCount / 200, frameCount / 200);


        push();
        rotateX(r.y);
        rotateY(r.x);
        this.startDrawPart(0, true);
        pop();

        translate(this.middlePosition.copy().mult(-1));
        rotateX(r.y);
        rotateY(r.x);

        this.startDrawPart(0);

    }

    scale: number = 120;
    atomRadius: number = 25;
    connectionRadius: number = 5;

    longestChainCNumber: number = 0;

    middlePosition: p5.Vector;

    drawPart(deltaPos: p5.Vector, atomIndex: number, nextAtomIndex: number, isCalcMiddleMode: boolean = false) {
        push();

        if (!isCalcMiddleMode) {
            noStroke();
            fill(200);


            noStroke();
            fill(200);

            for (let i = 0; i < 40; i++) {
                let p = deltaPos.copy().mult(i / 40);
                push();
                translate(p);
                sphere(6);
                pop();
            }


            switch (this.atoms[nextAtomIndex].name) {
                case "szén":
                    fill(30);
                    //deltaPos.mult(2);
                    break;
                case "hidrogén":
                    fill(250);
                    break;
                case "klór":
                    fill(255, 255, 0);
                    break;
                case "fluor":
                    fill(100, 255, 100);
                    break;

            }

        }
        translate(deltaPos);

        if (!isCalcMiddleMode) {
            noStroke();
            sphere(this.atomRadius);

            if (nextAtomIndex < 4 && isDebug) {
                stroke(255, 255, 0);
                line(0, 0, 0, 0, 80, 0);

                stroke(255, 0, 0);
                line(0, 0, 0, 80, 0, 0);

                stroke(0, 255, 0);
                line(0, 0, 0, 0, 0, 80);

            }
        }
        if (isCalcMiddleMode && nextAtomIndex == floor(this.longestChainCNumber / 2)) {
            // @ts-ignore
            this.middlePosition = screenPosition(0, 0, 0);
        }
        // if (nextAtomIndex == floor(this.longestChainCNumber / 2)) {
        //     fill(255, 0, 0);
        //     box(30, 30, 30);
        // }

        rotationCucc(deltaPos);

        this.startDrawPart(nextAtomIndex, isCalcMiddleMode);
        pop();

    }

    drawSphere(pos: p5.Vector, color: number[]) {
        push();
        translate(pos);
        fill(color);
        sphere(this.atomRadius);
        pop();
    }

    startDrawPart(startIndex: number, isCalcMiddleMode: boolean = false) {
        let out = this.getOutgoingConnections(startIndex);

        if (startIndex == 0 && !isCalcMiddleMode) {
            fill(20);
            noStroke();
            sphere(this.atomRadius);
        }
        let poses: p5.Vector[] = [];


        let A = createVector(0, 0, 0.62);
        let B = createVector(0, 0.58, -0.2);
        let C = createVector(0.5, -0.29, -0.2);
        let D = createVector(-0.5, -0.29, -0.2);
        // for carbon:
        const E = createVector(0, 0, 0);

        if (out.length == 3) {
            B.z = -B.z;
            C.z = -C.z;
            D.z = -D.z;
            poses.push(B.mult(this.scale));
            poses.push(C.mult(this.scale));
            poses.push(D.mult(this.scale));
        } else if (out.length == 4) {
            poses.push(A.mult(this.scale));
            poses.push(B.mult(this.scale));
            poses.push(C.mult(this.scale));
            poses.push(D.mult(this.scale));
        } else if (out.length != 0) {
            alert("outlength of " + startIndex + " is " + out.length);
        }

        poses.forEach((pos, index) => {
            this.drawPart(pos, startIndex, out[index], isCalcMiddleMode);
        })
    }

    public getIncomingConnections(index: number): number[] {
        return this.connectionsA[index];
    }

    private fillInCheckedAtoms: number[];

    private fillInWithHydrogen(startIndex: number, isStarting: boolean = false) {
        if (isStarting) {
            this.fillInCheckedAtoms = [0];
        }
        if (!ArrayHelper.contains(this.fillInCheckedAtoms, startIndex) || isStarting) { // Check for circularity
            console.log("asd " + startIndex);
            this.fillInCheckedAtoms.push(startIndex);

            let outgoingConnections = this.getOutgoingConnections(startIndex);
            let numOfConnections = outgoingConnections.length;
            let isCircular = this.getIncomingConnections(0).length > 0;
            if (!isStarting || isCircular) numOfConnections++; // +1 stands for the incoming connection

            if (this.atoms[startIndex].name == "szén") { // If it is a carbon, we can fill in the remaining vegyértéks.
                for (let i = 0; i < 4 - numOfConnections; i++) {
                    let index = this.addAtom(atom("hidrogén"));
                    this.connect(index, startIndex);
                }
            }

            outgoingConnections = this.getOutgoingConnections(startIndex);
            for (let i = 0; i < outgoingConnections.length; i++) {
                this.fillInWithHydrogen(outgoingConnections[i]);
            }
        }
    }

    public getMassPerMol(): number {
        let sum = 0;
        this.atoms.forEach(atom => {
            sum += atom.massPerMol;
        });
        return sum;
    }

    public static generateMoleculeByName(name: string): Molecule {
        let molecule = new Molecule();

        // TODO ilyenre is működjön: let fullName = "2,3-dimetil-2,5,6-tri(1,2-metilpropil)-3-etilciklodekán";

        // metÁN levágása
        if (!name.endsWith("án")) {
            throw new Error("Jelenleg csak alkánok támogatottak");
        }
        let nameWithoutAne = name.slice(0, -2);

        let longestChainPrefix = StringHelper.findLongestStringAtTheEnd(nameWithoutAne, Alks.prefixes);
        let nameWithoutLongestChain = nameWithoutAne.slice(0, -longestChainPrefix.length);

        let isCircular = nameWithoutLongestChain.endsWith("ciklo");
        if (isCircular) {
            nameWithoutLongestChain = nameWithoutLongestChain.slice(0, -"ciklo".length);
        }

        let longestChainCNumber = Alks.getCNumber(longestChainPrefix);
        molecule.longestChainCNumber = longestChainCNumber;

        console.log(longestChainCNumber);

        for (let i = 0; i < longestChainCNumber; i++) {
            molecule.addAtom(atom("szén"));
            if (i !== 0) {
                molecule.connect(i, i - 1);
            }
        }
        if (isCircular) {
            molecule.connect(0, longestChainCNumber - 1);
        }

        console.log(nameWithoutLongestChain);


        // LELÓGÓ CUCCOK SZTRINGJEIRE FÖLBONTÁS =====================================

        let lelogocuccok: string[] = [""];

        let isCompleted = false;
        let kotojelCount = 0;

        let zarojelCount = 0;
        for (let i = 0; i < nameWithoutLongestChain.length; i++) {
            let c = nameWithoutLongestChain.charAt(i);

            if (!isCompleted) {
                if (c == "-") {
                    if (zarojelCount == 0) {
                        kotojelCount++;
                        if (kotojelCount % 2 === 0) {
                            isCompleted = true;
                        } else {
                            lelogocuccok[lelogocuccok.length - 1] += c;
                        }
                    } else {
                        lelogocuccok[lelogocuccok.length - 1] += c;
                    }

                } else {
                    if (c === "(") {
                        zarojelCount++;
                    } else if (c === ")") {
                        zarojelCount--;
                    }
                    lelogocuccok[lelogocuccok.length - 1] += c;
                }
            } else {
                isCompleted = false;
                lelogocuccok.push(c);
            }
        }

        // LELÓGÓ CUCCOK ANALIZÁLÁSA ============================================================

        // TODO lelógókról lelógó dolgok  figyelembevétele
        // TODO alkének

        lelogocuccok = lelogocuccok.filter(value => {
            return value && value.trim() && value.trim().length != 0;
        });

        lelogocuccok.forEach((lelogocucc: string) => {
            let split = lelogocucc.split("-");

            let positions: number[] = []; // 0-tól számozva
            let lelogocucctenyleg: string;

            if (split.length < 2) {
                if (longestChainCNumber == 3) {
                    positions.push(1);
                    lelogocucctenyleg = lelogocucc;
                } else {
                    throw new Error("Hibás név! Nincs megadva, hogy honnan lóg le a lelógó csoport.");
                }
            } else {
                let pstring = split[0].split(",");
                pstring.forEach(ps => {
                    ps = ps.trim();
                    positions.push(Number(ps));
                });
                let numPrefix = StringHelper.findLongestStringAtTheBeginning(split[1], Alks.numberPrefixes);
                if (numPrefix != Alks.numberPrefixes[positions.length - 1]) {
                    throw new Error("A " + numPrefix + " prefixum nem egyezik meg a megadott pozíciók számával, ami " + positions.length);
                }
                lelogocucctenyleg = split[1].slice(numPrefix.length);

            }

            positions.forEach(value => {
                if (value > longestChainCNumber) {
                    throw new Error("Nem lehet a(z) " + value + ". pozícióra csatlakoztatni a(z) " + lelogocucctenyleg + "t, tekintve hogy a leghosszabb szénlánc is csak " + longestChainCNumber + " hosszú.");
                }
            });

            console.log("positions: " + positions);
            console.log("lelogocucctenyleg: " + lelogocucctenyleg);


            // lánc lóg le róla, vagy atom?
            if (lelogocucctenyleg.endsWith("il")) { // atomok nevei nem vézgőnek il-re.
                let prefix = lelogocucctenyleg.slice(0, -2);

                let lelogoChainCNumber = Alks.getCNumber(prefix);

                positions.forEach(p => {
                    for (let i = 0; i < lelogoChainCNumber; i++) {
                        let index = molecule.addAtom(atom("szén"));
                        if (i !== 0) {
                            molecule.connect(index, index - 1);
                        } else {
                            molecule.connect(index, p - 1);
                        }
                    }
                });

            } else {
                // Sima atom lóg le
                let atomName = lelogocucctenyleg;
                positions.forEach(p => {
                    let index = molecule.addAtom(atom(atomName));
                    molecule.connect(index, p - 1);
                });
            }
        });


        console.log("HIDROGÉNEK NÉLKÜL:");
        console.log(molecule);

        // FELTÖLTÉS HIDROGÉNEKKEL

        molecule.fillInWithHydrogen(0, true);


        console.log("HIDROGÉNEKKEL:");
        console.log(molecule);

        return molecule;
    }
}
