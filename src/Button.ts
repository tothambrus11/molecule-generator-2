class Button {
    onClick: () => void;
    x: number;
    y: number;
    w: number;
    h: number;
    text: string;
    colorScheme: ColorScheme;


    constructor(x: number, y: number, w: number, h: number, text: string, colorScheme: ColorScheme) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.colorScheme = colorScheme;
    }

    setOnClickListener(onClick: () => void) {
        this.onClick = onClick;
    }

    public mousePressed() {
        if (this.checkMousePos() && this.onClick) {
            this.onClick();
        }
    }

    draw(): void {
        if(this.checkMousePos()){
            cursor(HAND);
        }
        else{
            cursor(ARROW);
        }

        if (this.checkMousePos()) {
            fill(this.colorScheme.hoverFillColor);
        } else {
            fill(this.colorScheme.fillColor);
        }
        noStroke();
        rect(this.x, this.y, this.w, this.h);


        if (this.checkMousePos()) {
            fill(this.colorScheme.hoverTextColor);
        } else {
            fill(this.colorScheme.textColor);
        }
        textAlign(CENTER, CENTER);
        text(this.text, this.x, this.y, this.w, this.h);
    }

    private checkMousePos() {
        return mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h;
    }
}

class ColorSchemes {
    static lightTheme: ColorScheme = {
        fillColor: [0, 255, 255],
        hoverFillColor: [0, 200, 200],
        textColor: [0, 0, 0],
        hoverTextColor: [0, 0, 0]
    };
    static darkTheme: ColorScheme = {
        fillColor: [50, 50, 50],
        hoverFillColor: [70, 70, 70],
        textColor: [0, 0, 0],
        hoverTextColor: [0, 0, 0]
    }
}

interface ColorScheme {
    fillColor: number[],
    hoverFillColor: number[],
    textColor: number[],
    hoverTextColor: number[]
}
