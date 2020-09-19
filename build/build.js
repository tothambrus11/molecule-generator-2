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
var AppModes;
(function (AppModes) {
    AppModes[AppModes["UserDraws"] = 0] = "UserDraws";
    AppModes[AppModes["DrawByName"] = 1] = "DrawByName";
})(AppModes || (AppModes = {}));
class ArrayHelper {
    /**
     * Returns true if the given array contains the thing.
     * @param array
     * @param thing
     */
    static contains(array, thing) {
        return array.indexOf(thing) >= 0;
    }
}
const ATOMS = [
    {
        atomicNumber: 1,
        name: "hidrogén",
        massPerMol: 1.00784,
        color: [255, 255, 255]
    },
    {
        atomicNumber: 6,
        name: "szén",
        massPerMol: 12.0107,
        color: [20, 20, 20]
    },
    {
        atomicNumber: 7,
        name: "nitrogén",
        color: [0, 0, 255],
        massPerMol: 14.0067
    },
    {
        atomicNumber: 8,
        name: "oxigén",
        color: [255, 0, 0],
        massPerMol: 15.999
    },
    {
        atomicNumber: 9,
        name: "fluor",
        massPerMol: 18.998403,
        color: [0, 255, 0]
    },
    {
        atomicNumber: 35,
        name: "bróm",
        color: [128, 0, 0],
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
        color: [255, 153, 0],
        massPerMol: 30.973762
    },
    {
        atomicNumber: 16,
        name: "kén",
        color: [255, 255, 0],
        massPerMol: 32.065
    },
    {
        atomicNumber: 17,
        name: "klór",
        color: [0, 255, 0],
        massPerMol: 35.453
    }
];
/**
 * Gets an atom by its atomic number
 * @param atomicNumber
 */
function getAtom(atomicNumber) {
    return ATOMS.find((atom) => atom.atomicNumber === atomicNumber);
}
function atom(name) {
    return ATOMS.find(atom => {
        return atom.name === name;
    });
}
class Button {
    constructor(x, y, w, h, text, colorScheme) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.colorScheme = colorScheme;
    }
    setOnClickListener(onClick) {
        this.onClick = onClick;
    }
    mousePressed() {
        if (this.checkMousePos() && this.onClick) {
            this.onClick();
        }
    }
    draw() {
        if (this.checkMousePos()) {
            cursor(HAND);
        }
        else {
            cursor(ARROW);
        }
        if (this.checkMousePos()) {
            fill(this.colorScheme.hoverFillColor);
        }
        else {
            fill(this.colorScheme.fillColor);
        }
        noStroke();
        rect(this.x, this.y, this.w, this.h);
        if (this.checkMousePos()) {
            fill(this.colorScheme.hoverTextColor);
        }
        else {
            fill(this.colorScheme.textColor);
        }
        textAlign(CENTER, CENTER);
        text(this.text, this.x, this.y, this.w, this.h);
    }
    checkMousePos() {
        return mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h;
    }
}
class ColorSchemes {
}
ColorSchemes.lightTheme = {
    fillColor: [0, 255, 255],
    hoverFillColor: [0, 200, 200],
    textColor: [0, 0, 0],
    hoverTextColor: [0, 0, 0]
};
ColorSchemes.darkTheme = {
    fillColor: [50, 50, 50],
    hoverFillColor: [70, 70, 70],
    textColor: [0, 0, 0],
    hoverTextColor: [0, 0, 0]
};
const isDebug = false;
function rotationCucc(deltaPos) {
    if (deltaPos.y != 0) {
        rotateZ(atan(deltaPos.y / deltaPos.x));
    }
    rotateY(acos(deltaPos.z / deltaPos.mag()));
}
let zc = 0;
let yc = 0;
class Molecule {
    constructor() {
        this.scale = 120;
        this.atomRadius = 25;
        this.connectionRadius = 5;
        this.longestChainCNumber = 0;
        this.connectionsA = [];
        this.connectionsB = [];
        this.atoms = [];
        this.middlePosition = createVector();
    }
    /**
     * Connects two atoms
     */
    connect(to, from) {
        while (to > this.connectionsB.length - 1 || from > this.connectionsB.length - 1) {
            this.connectionsA.push([]);
            this.connectionsB.push([]);
        }
        if (!this.isConnected(to, from)) {
            this.connectionsA[to].push(from);
            this.connectionsB[from].push(to);
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
    getOutgoingConnections(index) {
        if (index > this.atoms.length)
            throw new Error("Nem létező atomindex: " + index);
        return this.connectionsB[index];
    }
    getAllConnections(index) {
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
        }
        else if (keyIsDown(UP_ARROW)) {
            yc++;
        }
        else if (keyIsDown(LEFT_ARROW)) {
            zc--;
        }
        else if (keyIsDown(RIGHT_ARROW)) {
            zc++;
        }
        if (mouseIsPressed && mouseButton == LEFT) {
            rotation.add(radians(mouseX - pmouseX) * 0.5, radians(pmouseY - mouseY) * 0.5);
        }
        let r = rotation
            .copy()
            .add(ticks / 200, ticks / 200);
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
    drawPart(deltaPos, atomIndex, nextAtomIndex, isCalcMiddleMode = false) {
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
            fill(this.atoms[nextAtomIndex].color);
        }
        translate(deltaPos);
        if (!isCalcMiddleMode) {
            noStroke();
            if (this.atoms[nextAtomIndex].name == "szén") {
                sphere(this.atomRadius * 1.2);
            }
            else {
                sphere(this.atomRadius);
            }
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
    drawSphere(pos, color) {
        push();
        translate(pos);
        fill(color);
        sphere(this.atomRadius);
        pop();
    }
    startDrawPart(startIndex, isCalcMiddleMode = false) {
        let out = this.getOutgoingConnections(startIndex);
        if (startIndex == 0 && !isCalcMiddleMode) {
            fill(20);
            noStroke();
            sphere(this.atomRadius * 1.2);
        }
        let poses = [];
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
        }
        else if (out.length == 4) {
            poses.push(A.mult(this.scale));
            poses.push(B.mult(this.scale));
            poses.push(C.mult(this.scale));
            poses.push(D.mult(this.scale));
        }
        else if (out.length != 0) {
            throw new Error("Az i" + startIndex + " atom kimeneteinek száma " + out.length + ", ami meghaladja a maximális értéket.");
        }
        poses.forEach((pos, index) => {
            this.drawPart(pos, startIndex, out[index], isCalcMiddleMode);
        });
    }
    getIncomingConnections(index) {
        return this.connectionsA[index];
    }
    fillInWithHydrogen(startIndex, isStarting = false) {
        if (isStarting) {
            this.fillInCheckedAtoms = [0];
        }
        if (!ArrayHelper.contains(this.fillInCheckedAtoms, startIndex) || isStarting) { // Check for circularity
            console.log("asd " + startIndex);
            this.fillInCheckedAtoms.push(startIndex);
            let outgoingConnections = this.getOutgoingConnections(startIndex);
            let numOfConnections = outgoingConnections.length;
            let isCircular = this.getIncomingConnections(0).length > 0;
            if (!isStarting || isCircular)
                numOfConnections++; // +1 stands for the incoming connection
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
    getMassPerMol() {
        let sum = 0;
        this.atoms.forEach(atom => {
            sum += atom.massPerMol;
        });
        return sum;
    }
    static generateMoleculeByName(name) {
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
        let lelogocuccok = [""];
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
                        }
                        else {
                            lelogocuccok[lelogocuccok.length - 1] += c;
                        }
                    }
                    else {
                        lelogocuccok[lelogocuccok.length - 1] += c;
                    }
                }
                else {
                    if (c === "(") {
                        zarojelCount++;
                    }
                    else if (c === ")") {
                        zarojelCount--;
                    }
                    lelogocuccok[lelogocuccok.length - 1] += c;
                }
            }
            else {
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
        lelogocuccok.forEach((lelogocucc) => {
            let split = lelogocucc.split("-");
            let positions = []; // 0-tól számozva
            let lelogocucctenyleg;
            if (split.length < 2) {
                if (longestChainCNumber == 3) {
                    positions.push(1);
                    lelogocucctenyleg = lelogocucc;
                }
                else {
                    throw new Error("Hibás név! Nincs megadva, hogy honnan lóg le a lelógó csoport.");
                }
            }
            else {
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
                        }
                        else {
                            molecule.connect(index, p - 1);
                        }
                    }
                });
            }
            else {
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
class StringHelper {
    /**
     * @param text The long text
     * @param endStrings
     */
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
    /**
     * @param text The long text
     * @param startStrings
     */
    static findLongestStringAtTheBeginning(text, startStrings) {
        let longestStringIndex = null;
        function getLongestStartString() {
            return startStrings[longestStringIndex];
        }
        startStrings.forEach((startString, index) => {
            if (text.startsWith(startString)) {
                if (longestStringIndex == null || getLongestStartString().length < startString.length) {
                    longestStringIndex = index;
                }
            }
        });
        if (longestStringIndex === null) {
            throw new Error("Start not found");
        }
        return startStrings[longestStringIndex];
    }
}
var validate = WebAssembly.validate;
let appMode;
let font;
let m;
let buttonDrawNew;
let rotation;
let isRotating = true;
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    addScreenPositionFunction();
    rotation = createVector();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
let ticks = 0;
function draw() {
    scale(zoom / 100);
    background(0);
    push();
    if (m) {
        try {
            m.draw();
        }
        catch (e) {
            alert(e);
            m = undefined;
        }
    }
    pop();
    if (isRotating) {
        ticks++;
    }
}
function getIupacNameValue() {
    return document.getElementById("iupac-name").value;
}
function onButtonClick(e) {
    if (getIupacNameValue() && getIupacNameValue().trim()) {
        try {
            m = Molecule.generateMoleculeByName(getIupacNameValue());
            document.getElementById("molarMassContainer").innerText = round(m.getMassPerMol() * 1000) / 1000 + "";
        }
        catch (e) {
            alert(e);
        }
    }
    return false;
}
let zoom = 100;
function mouseWheel(event) {
    zoom -= event.delta / 10;
    if (zoom < 0)
        zoom = 0;
    scale(zoom / 100);
}
function onIsRotatingChanged() {
    isRotating = document.getElementById("isRotatingCheckbox").checked;
}
function addScreenPositionFunction(p5Instance) {
    let p = p5Instance || this;
    // find out which context we're in (2D or WEBGL)
    const R_2D = 0;
    const R_WEBGL = 1;
    let context = getObjectName(p._renderer.drawingContext).search("2D") >= 0 ? R_2D : R_WEBGL;
    // the stack to keep track of matrices when using push and pop
    if (context == R_2D) {
        p._renderer.matrixStack = [new p5.Matrix()];
    }
    // replace all necessary functions to keep track of transformations
    if (p.draw instanceof Function) {
        let drawNative = p.draw;
        p.draw = function (...args) {
            if (context == R_2D)
                p._renderer.matrixStack = [new p5.Matrix()];
            drawNative.apply(p, args);
        };
    }
    if (p.resetMatrix instanceof Function) {
        let resetMatrixNative = p.resetMatrix;
        p.resetMatrix = function (...args) {
            if (context == R_2D)
                p._renderer.matrixStack = [new p5.Matrix()];
            resetMatrixNative.apply(p, args);
        };
    }
    if (p.translate instanceof Function) {
        let translateNative = p.translate;
        p.translate = function (...args) {
            if (context == R_2D)
                last(p._renderer.matrixStack).translate(args);
            translateNative.apply(p, args);
        };
    }
    if (p.rotate instanceof Function) {
        let rotateNative = p.rotate;
        p.rotate = function (...args) {
            if (context == R_2D) {
                let rad = p._toRadians(args[0]);
                last(p._renderer.matrixStack).rotateZ(rad);
            }
            rotateNative.apply(p, args);
        };
    }
    if (p.rotateX instanceof Function) {
        let rotateXNative = p.rotateX;
        p.rotateX = (...args) => {
            if (context == R_2D) {
                let rad = p._toRadians(args[0]);
                last(p._renderer.matrixStack).rotateX(rad);
            }
            rotateXNative.apply(p, args);
        };
    }
    if (p.rotateY instanceof Function) {
        let rotateYNative = p.rotateY;
        p.rotateY = function (...args) {
            if (context == R_2D) {
                let rad = p._toRadians(args[0]);
                last(p._renderer.matrixStack).rotateY(rad);
            }
            rotateYNative.apply(p, args);
        };
    }
    if (p.rotateZ instanceof Function) {
        let rotateZNative = p.rotateZ;
        p.rotateZ = function (...args) {
            if (context == R_2D) {
                let rad = p._toRadians(args[0]);
                last(p._renderer.matrixStack).rotateZ(rad);
            }
            rotateZNative.apply(p, args);
        };
    }
    if (p.scale instanceof Function) {
        let scaleNative = p.scale;
        p.scale = function (...args) {
            if (context == R_2D) {
                let m = last(p._renderer.matrixStack);
                let sx = args[0];
                let sy = args[1] || sx;
                let sz = context == R_2D ? 1 : args[2];
                m.scale([sx, sy, sz]);
            }
            scaleNative.apply(p, args);
        };
    }
    // Help needed: don't know what transformation matrix to use
    // Solved: Matrix multiplication had to be in reversed order.
    // Still, this looks like it could be simplified.
    if (p.shearX instanceof Function) {
        let shearXNative = p.shearX;
        p.shearX = function (...args) {
            if (context == R_2D) {
                let rad = p._toRadians(args[0]);
                let stack = p._renderer.matrixStack;
                let m = last(stack);
                let sm = new p5.Matrix();
                sm.mat4[4] = Math.tan(rad);
                sm.mult(m);
                stack[stack.length - 1] = sm;
            }
            shearXNative.apply(p, args);
        };
    }
    if (p.shearY instanceof Function) {
        let shearYNative = p.shearY;
        p.shearY = function (...args) {
            if (context == R_2D) {
                let rad = p._toRadians(args[0]);
                let stack = p._renderer.matrixStack;
                let m = last(stack);
                let sm = new p5.Matrix();
                sm.mat4[1] = Math.tan(rad);
                sm.mult(m);
                stack[stack.length - 1] = sm;
            }
            shearYNative.apply(p, args);
        };
    }
    if (p.applyMatrix instanceof Function) {
        let applyMatrixNative = p.applyMatrix;
        p.applyMatrix = function (...args) {
            if (context == R_2D) {
                let stack = p._renderer.matrixStack;
                let m = last(stack);
                let sm = new p5.Matrix();
                sm.mat4[0] = args[0];
                sm.mat4[1] = args[1];
                sm.mat4[4] = args[2];
                sm.mat4[5] = args[3];
                sm.mat4[12] = args[4];
                sm.mat4[13] = args[5];
                sm.mult(m);
                stack[stack.length - 1] = sm;
            }
            applyMatrixNative.apply(p, args);
        };
    }
    if (p.push instanceof Function) {
        let pushNative = p.push;
        p.push = function (...args) {
            if (context == R_2D) {
                let m = last(p._renderer.matrixStack);
                p._renderer.matrixStack.push(m.copy());
            }
            pushNative.apply(p, args);
        };
    }
    if (p.pop instanceof Function) {
        let popNative = p.pop;
        p.pop = function (...args) {
            if (context == R_2D)
                p._renderer.matrixStack.pop();
            popNative.apply(p, args);
        };
    }
    p.screenPosition = function (x, y, z) {
        if (x instanceof p5.Vector) {
            let v = x;
            x = v.x;
            y = v.y;
            z = v.z;
        }
        else if (x instanceof Array) {
            let rg = x;
            x = rg[0];
            y = rg[1];
            z = rg[2] || 0;
        }
        z = z || 0;
        if (context == R_2D) {
            let m = last(p._renderer.matrixStack);
            // probably not needed:
            // let mInv = (new p5.Matrix()).invert(m);
            let v = p.createVector(x, y, z);
            let vCanvas = multMatrixVector(m, v);
            // console.log(vCanvas);
            return vCanvas;
        }
        else {
            let v = p.createVector(x, y, z);
            // Calculate the ModelViewProjection Matrix.
            let mvp = (p._renderer.uMVMatrix.copy()).mult(p._renderer.uPMatrix);
            // Transform the vector to Normalized Device Coordinate.
            let vNDC = multMatrixVector(mvp, v);
            // Transform vector from NDC to Canvas coordinates.
            let vCanvas = p.createVector();
            vCanvas.x = 0.5 * vNDC.x * p.width;
            vCanvas.y = 0.5 * -vNDC.y * p.height;
            vCanvas.z = 0;
            return vCanvas;
        }
    };
    // helper functions ---------------------------
    function last(arr) {
        return arr[arr.length - 1];
    }
    function getObjectName(obj) {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((obj).constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    }
    ;
    /* Multiply a 4x4 homogeneous matrix by a Vector4 considered as point
     * (ie, subject to translation). */
    function multMatrixVector(m, v) {
        if (!(m instanceof p5.Matrix) || !(v instanceof p5.Vector)) {
            print('multMatrixVector : Invalid arguments');
            return;
        }
        var _dest = p.createVector();
        var mat = m.mat4;
        // Multiply in column major order.
        _dest.x = mat[0] * v.x + mat[4] * v.y + mat[8] * v.z + mat[12];
        _dest.y = mat[1] * v.x + mat[5] * v.y + mat[9] * v.z + mat[13];
        _dest.z = mat[2] * v.x + mat[6] * v.y + mat[10] * v.z + mat[14];
        var w = mat[3] * v.x + mat[7] * v.y + mat[11] * v.z + mat[15];
        if (Math.abs(w) > Number.EPSILON) {
            _dest.mult(1.0 / w);
        }
        return _dest;
    }
}
//# sourceMappingURL=build.js.map