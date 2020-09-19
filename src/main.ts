import validate = WebAssembly.validate;

let appMode: AppMode;

let font: object | string;

let m: Molecule;
let buttonDrawNew: Button;
let rotation: p5.Vector;
let isRotating = true;

function setup() {

    createCanvas(windowWidth, windowHeight, WEBGL);

    addScreenPositionFunction();

    rotation = createVector();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

let ticks: number = 0;

function draw() {
    scale(zoom / 100);

    background(0);
    push();

    if (m) {
        try {
            m.draw();
        } catch (e) {
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
    return (document.getElementById("iupac-name") as HTMLInputElement).value;
}

function onButtonClick(e: any) {
    if (getIupacNameValue() && getIupacNameValue().trim()) {
        try {
            m = Molecule.generateMoleculeByName(getIupacNameValue());
            document.getElementById("molarMassContainer").innerText = round(m.getMassPerMol() * 1000) / 1000 + "";
        } catch (e) {
            alert(e);
        }
    }
    return false;
}

let zoom = 100;

function mouseWheel(event: any) {
    zoom -= event.delta / 10;
    if (zoom < 0) zoom = 0;
    scale(zoom / 100)
}

function onIsRotatingChanged() {
    isRotating = (document.getElementById("isRotatingCheckbox") as HTMLInputElement).checked;
}
