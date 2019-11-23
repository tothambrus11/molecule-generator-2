let appMode: AppMode;

let font: object | string;


function setup() {

    createCanvas(windowWidth, windowHeight, WEBGL);

    appMode = new DrawByNameMode();
    appMode.setup();

    addScreenPositionFunction();
    //textFont(font, 100);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


let c = 0;

function preload() {
    font = loadFont(
        "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf"
    );
}

function draw() {
    /* background(0);

     fill(0, 0);
     stroke(0, 255, 255);
     strokeWeight(1);

     circle(30 + cos(radians(c)) * 15, 30 + sin(radians(c)) * 15, 6);
     circle(30 + cos(radians(c + 180)) * 15, 30 + sin(radians(c + 180)) * 15, 6);
     strokeWeight(0.5);
     circle(30, 30, 30);
     circle(30, 30, 4);

     strokeWeight(0.25);
     fill(0, 150, 150);
     textSize(20);
     textAlign(LEFT, CENTER);
     text("Alkánia 2.0", 60, 35);

     strokeWeight(0.5);
     for (let i = 0; i < width; i++) {
         stroke(0, cos(0.5 * radians(-c + i)) * 255, cos(0.5 * radians(-c + i)) * 255);
         point(i, 60);
     }

     let m = createVector(mouseX, mouseY);
     if (m.x >= 270 && m.y <= 60 && m.x < 465) {
         fill(0, cos(0.5 * radians(c + 80 + 180)) * 32 + 128, cos(0.5 * radians(c + 80 + 180)) * 32 + 128);
         noStroke();
         rect(270, 0, 195, 60);

         noStroke();
         fill(0, cos(0.5 * radians(c + 80 + 180)) * 35, (cos(0.5 * radians(c + 80 + 180)) * 35));
         textSize(18);
         textAlign(CENTER, CENTER);
         text("Rajzolás", 270, 0, 195, 65);
     }
     else{
         noStroke();
         fill(0, cos(0.5 * radians(c + 80 + 180)) * 32 + 128, cos(0.5 * radians(c + 80 + 180)) * 32 + 128);
         textSize(18);
         textAlign(CENTER, CENTER);
         text("Rajzolás", 270, 0, 195, 65);
     }



 */
    scale(zoom/100)

    appMode.draw();
    c++;
}

let zoom = 100;

function mouseWheel(event: any) {
    zoom -= event.delta /10;
    if(zoom < 0) zoom = 0;
    scale(zoom/100)
}

function mousePressed() {
    appMode.mousePressed();
}
