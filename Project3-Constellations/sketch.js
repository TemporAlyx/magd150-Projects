
linestarted = false
linex = 0
liney = 0



function setup() 
{
	width = 1920; //using width and height as references for all other sizes, so that changing the canvas scale 
	height = 1080;//doesnt affect the scale of the image being created
	num_stars = 2000;
	// randomSeed(42); //comment out for randomness

	createCanvas(width, height);
	background(25);
    colorMode(RGB, 255, 255, 255, 1);
    angleMode(DEGREES);
 
    frameRate(30);

	for (i=0;i<=num_stars;i++)
	{
		randomx = random(width);
		randomy = random(height);

    randomsize = random(width/200,width/100);

    colorshift = random(0,100);
    transparency = random(0.4,1);
    rotation = random(360);

    noStroke();
    rotate(rotation);
    fill(255-(colorshift*random(0.4)),255-(colorshift*random(0.5,1.5)),255-(colorshift*random(0.1)),transparency); 
    if (i%3 == 0) // creating a random starry backdrop out of triangles, quads, and hexagons
    {
      triangle(randomx,randomy,randomx+randomsize,randomy,randomx+(randomsize/2),randomy+((1/2)*sqrt(3)*randomsize));
    }
    else if (i%3 == 2)
    {
      randomsize = randomsize * 0.66;
      quad(randomx,randomy,randomx+randomsize,randomy,randomx+((randomsize*3)/2),randomy+((1/2)*sqrt(3)*randomsize),randomx+(randomsize/2),randomy+((1/2)*sqrt(3)*randomsize));    //comment out this one and uncomment 
      // quad(randomx,randomy,randomx+randomsize,randomx+(randomsize/2),randomy+((1/2)*sqrt(3)*randomsize),randomy,randomx+((randomsize*3)/2),randomy+((1/2)*sqrt(3)*randomsize));// this one for a trippy bug I ran across
    }
    else
    {
      randomsize = randomsize * 0.4;
      beginShape();
      vertex(randomx,randomy);
      vertex(randomx-(randomsize/2),randomy+(randomsize));
      vertex(randomx,randomy+(randomsize*2));
      vertex(randomx+randomsize,randomy+(randomsize*2));
      vertex(randomx+((randomsize*3)/2),randomy+(randomsize));
      vertex(randomx+randomsize,randomy);
      endShape(CLOSE);
    }
	}
}


function draw()
{
  
}

//since my intent last time in creating a random constellation generator turned out to be too ambitous, this time
//I built in functionality for the user to make the constellations.

function mouseClicked() //draw a line by clicking where you want the start, and then clicking where you want the line to end
{
  if(linestarted)
  {
    linestarted = false;

    greyscale = pow(pmouseX / pmouseY,2) + 255; //needed to use pmouseX/Y and another math for points, but didnt actually want it to do anything... ¯\_(ツ)_/¯
    stroke(greyscale);
    // stroke(255);
    strokeWeight(2);
    line(linex,liney,mouseX,mouseY);
  }
  else
  {
    linex = mouseX;
    liney = mouseY;
    linestarted = true;
  }

  print("hello_world");
}

function keyPressed() //hit escape to restart
{
  if (keyCode === ESCAPE) 
  {
    linestarted = false;
  }
}
