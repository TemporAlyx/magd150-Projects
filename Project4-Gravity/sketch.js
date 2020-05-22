
let width = 1920; //using width and height as references for all other sizes, so that changing the canvas scale 
let height = 1080;//doesnt affect the scale of the image being created

function setup() 
{
	createCanvas(width, height);
  background(25);
  colorMode(RGB, 255, 255, 255, 1);
  angleMode(DEGREES);

  frameRate(30);
}

//Asignment 4 scope:
//have a star in the middle of the screen that rotates around
//and have the user able to add planets that orbit around it based on
//the trajectory that the user sets.
//gravity will be approximated
//NOTE: I am an idiot and am starting this at 7:50 on thursday
//so only as a stretch goal will I add gravity between the planets
//But i can see the potential for a game where you have to 
//add as many planets around the star/star system without it becoming unstable

let gravityScale = 100.0;
let objects = [];

function draw()
{
  background(25);
  angleMode(DEGREES);
  fill(255,255,0);
  // translate(width/2, height/2);
  // rotate(framecount / 50);                 //I still have no idea why but rotation still doesnt work
  // star(0,0,width/20,width/16,24);          //despite practically copying https://p5js.org/examples/form-star.html
  //so for now the star does not rotate
  star(width/2,height/2,width/20,width/16,24);

  for (i=0;i<objects.length;i++) 
  {
    disttostar = dist(width/2,height/2,objects[i].xPos,objects[i].yPos) / 3;
    acc = gravityScale / pow(disttostar,2);
    angletostar = createVector(1,0).angleBetween(createVector(objects[i].xPos-(width/2),objects[i].yPos-(height/2)));

    if (angletostar > 90)
    {
      angletostar = abs(angletostar - 180);
    }

    changex = cos(angletostar) * acc;
    changey = sin(angletostar) * acc;

    changex *= -1;

    if (objects[i].yPos>height/2)
    {
      changey *= -1;
    }

    objects[i].xVel += changex;
    objects[i].yVel += changey;

    objects[i].xPos += objects[i].xVel;
    objects[i].yPos += objects[i].yVel;


    fill(120,120,120);
    ellipse(objects[i].xPos,objects[i].yPos,width/30);
  }
}

let placingObject = false;
let placex = 0;
let placey = 0;

function mouseClicked() //click once to set starting position, and then clicking again further away to give it initial velocity
{
  angleMode(DEGREES);
  if(placingObject)
  {
    placingObject = false;

    print(placex,placey,mouseX,mouseY);
    disttoobj = dist(placex,placey,mouseX,mouseY);
    initvelocity = disttoobj / 100;
    angletoobj = createVector(1,0).angleBetween(createVector(mouseX-placex,mouseY-placey));
    print(angletoobj);

    if (angletoobj > 90)
    {
      angletoobj = abs(angletoobj - 180);
    }

    changex = cos(angletoobj) * initvelocity;
    changey = sin(angletoobj) * initvelocity;

    if (mouseX<placex)
    {
      changex *= -1;
    }
    if (mouseY<placey)
    {
      changey *= -1;
    }

    if (isNaN(changex))
    {
      changex = 0
    }
    if (isNaN(changey))
    {
      changey = 0
    }

    var newobj = {};
    newobj.xPos = placex;
    newobj.yPos = placey;

    newobj.xVel = changex;
    newobj.yVel = changey;

    objects.push(newobj);
  }
  else
  {
    placex = mouseX;
    placey = mouseY;
    placingObject = true;
  }
}

// function derive_components(x1,y1,x2,y2)
// { //I was going to go through the effort of making a separate function for this
      //but then I didn't.

// }

function keyPressed() //hit escape to restart
{
  if (keyCode === ESCAPE) 
  {
    placingObject = false;
  }
}

function star(x, y, radius1, radius2, npoints) 
{ //star function shamelessly copied from examples
  angleMode(RADIANS);
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


//PROPER GRAVITY IS MUCH HARDER TO CODE THAN I THOUGHT IT WOULD BE
//In hindsight I probably should have gone with building a force based system,
//so that in the future I could use differently massed objects
//and also prevent the sun from adding energy to the system by being stationary