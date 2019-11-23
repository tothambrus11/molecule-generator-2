class DrawByNameMode implements AppMode {
    m: Molecule;
    buttonDrawNew: Button;
    rotation: p5.Vector;

    setup() {
        this.buttonDrawNew = new Button(20, 100, 240, 50, "Új szénhidrogén beírása", ColorSchemes.lightTheme);
        this.buttonDrawNew.setOnClickListener(() => {
            let name = prompt("Írd be a szénhidrogén nevét!");
            try {
                this.m = Molecule.generateMoleculeByName(name);
            } catch (e) {
                alert(e.toString());
            }
        });

        this.rotation = createVector();
        this.buttonDrawNew.onClick();
    }

    draw() {
        background(0);
        push();

        if (this.m) {
            this.m.draw();
        }
        pop();

        //this.buttonDrawNew.draw();
    }

    mousePressed() {
        this.buttonDrawNew.mousePressed();
    }
}
