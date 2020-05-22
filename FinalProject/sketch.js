
let width = 1920; //using width and height as references for all other sizes, so that changing the canvas scale 
let height = 1080;//doesnt affect the scale of the image being created

//project scope
//Physics system to handle drawing and calculating objects consistently - 2 hours
//Player ship and movement from initial launch and fuel use - 1 hour
//(w to use fuel, a and d to turn ship)
//Basic static solar system of objects capable of gravitationally influencing the player
//(static meaning none of the objects move) - 3 hours
//Points system to score level(s) - 1 hour
//UI to show fuel amount, time since launch, points - 2 hours
//-----------------------------------------------basic tech demo complete (9-14 hours)
//Add main menu screen and instructions - 3 hours
//Add ability to land safely and get a new target planet to fly to - 2 hours
//Add ability to save and load high scores - 2 hours
//-----------------------------------------------demo complete +(7-11 hours)
//Make solar system dynamic by making planets and moons move on their own predefined rails and spin
// (they wouldn't be actively simulating physics between each other, just moving in predetermined orbits) - 6 hours
//Refine physics and game feel - 3 hours
//Design art to be a little better looking than basic geometry - 3 hours

//Control state vars
let timepause = false;
let launching = true;
let devmode = false;

let mousePress = false;

let gravityScale = 100.0;
let objects = [];


function setup() 
{
	//image loading
	backgroundimage = loadImage('Images/background.png');
	moon = loadImage('Images/moon.png');
	mooninv = loadImage('Images/mooninv.png');
	moonbouncy = loadImage('Images/moonbouncy.png');
	moonglass = loadImage('Images/moonglass.png');
	gasgiant = loadImage('Images/gasgiant.png');
	core = loadImage('Images/core.png');
	star = loadImage('Images/star.png');


	let baseLevel = new Level(1,45); // Level setup and planet stats
	baseLevel.addObj(new CelObj(-1,0,0,0,2500.0,190,[250,250,0],bounce=0.9,friction=0.12,img=star));
	baseLevel.addObj(new CelObj(0,240,0.6,0,800.0,100,col=[190,190,190],bounce=1.005,friction=0.14,img=moon));
	baseLevel.addObj(new CelObj(0,240,0.6,170,800.0,100,col=[120,120,230],bounce=1.005,friction=0.0,img=moonglass));
	// baseLevel.addObj(new CelObj(0,510,0.3,260,10.0,100,col=[50,50,50],bounce=1.0,friction=0.06,img=core));
	baseLevel.addObj(new CelObj(0,510,0.3,260,1400.0,145,col=[200,80,5],bounce=0.1,friction=0.10,img=gasgiant));
	baseLevel.addObj(new CelObj(3,140,0.7,150,400.0,60,col=[200,0,200],bounce=2.3,friction=0.23,img=moonbouncy));
	baseLevel.addObj(new CelObj(3,140,0.7,330,400.0,60,col=[200,0,200],bounce=2.3,friction=0.23,img=moonbouncy));
	baseLevel.addObj(new CelObj(0,510,0.3,90,-600.0,100,col=[230,230,230],bounce=1.005,friction=0.14,img=mooninv));

	// for reference: CelObj constructor(parent,smaxis,ang_vel,init_ang,gscale=1.0,size=100,col=[190,190,190],bounce=1.0,friction=0.06,img=null)

	createCanvas(width, height);

	image(backgroundimage,0,0);
	colorMode(RGB, 255, 255, 255, 1);
	angleMode(DEGREES);

	frameRate(30);

	objects = baseLevel.getObjs();

	for (i=0;i<objects.length;i++)
	{
		objects[i].initialize();
	}

	objects.push(new Player(objects[baseLevel.getStartObj()],baseLevel.startingdirection));
}

function draw()
{
	if (!timepause)
	{
	    angleMode(DEGREES);

		if (devmode) 
			{background(80);}
		else
			{image(backgroundimage,0,0);}

	    for (i=0;i<objects.length;i++) 
	    {
	        objects[i].drawObj();
	        objects[i].update();
	    }
	}
}

function mousePressed() {mousePress = true;}

function mouseReleased() {mousePress = false;}


function keyPressed()
{
  if (keyCode == 27) //hit escape to pause
  {
  	if (timepause)
  		{timepause = false;}
  	else
    {
    	timepause = true;
    	fill('rgba(90,90,90,0.33)');
    	rect(0,0,width,height)
    	textSize(70);
    	fill(255);
    	text("PAUSED",(width/2)-420,200);
  	}
  }
  if (keyCode == 56) //hit 8 to enter devmode
  {
  	if (devmode)
  		{devmode = false;}
  	else
  		{devmode = true; }
  }
}


class CelObj //celestial object, used for stars/planets/moons
{	
	parent;
	smaxis;
	ang_vel;
	ang;

	bounce;
	friction;

	size;
	pos = [width/2,height/2];
	gscale;
	col;

	lastg = 0;

	objimage;

	constructor(parent,smaxis,ang_vel,init_ang,gscale=1.0,size=100,col=[190,190,190],bounce=1.0,friction=0.06,img=null)
	{
		this.parent = parent;
		if (parent != -1)
		{
			this.smaxis = smaxis;
			this.ang_vel = ang_vel;
			this.ang = init_ang;
		}
		else
		{
			this.smaxis = 0;
			this.ang_vel = 0;
			this.ang = 0;
		}
		this.gscale = gscale;
		this.size = size;
		this.col = col;

		this.bounce = bounce;
		this.friction = friction;

		this.img = img;
	}

	initialize()
	{		
		if (this.parent != -1)
		{
			this.pos[0] = (cos(this.ang) * this.smaxis) + objects[this.parent].getPos()[0];
			this.pos[1] = (sin(this.ang) * this.smaxis) + objects[this.parent].getPos()[1];
		}
		else
		{
			this.pos = [width/2,height/2];
		}
	}

	getPos() 
		{return this.pos;}

	getSize() 
		{return this.size;}

	getG() 
		{return this.gscale;}

	getBounce() 
		{return this.bounce;}

	getFriction() 
		{return this.friction;}

	setLastg(val) 
		{this.lastg = val}

	drawObj()
	{
		if (this.img==null || devmode)
		{
		fill(this.col[0],this.col[1],this.col[2]);
		ellipse(this.pos[0],this.pos[1],this.size);
		fill(0);
		textSize(36);
		text(str(this.lastg),this.pos[0]-43,this.pos[1]+15);
		}
		else
		{
			image(this.img,this.pos[0]-(this.size/2),this.pos[1]-(this.size/2),this.size,this.size);
		}
	}

	update()
	{
		if (this.parent != -1)
		{
			this.ang += this.ang_vel;
			if (this.ang > 360)
				{this.ang -= 360;}

			this.update_position();
		}
	}

	update_position()
	{
		if (this.parent != -1)
		{
			this.pos[0] = (cos(this.ang) * this.smaxis) + objects[this.parent].getPos()[0];
			this.pos[1] = (sin(this.ang) * this.smaxis) + objects[this.parent].getPos()[1];
		}
	}

	calcRelVel()
	{

		if (this.parent != -1)
		{
			var newpos = [0,0];
			newpos[0] = (cos(this.ang + this.ang_vel) * this.smaxis) + objects[this.parent].getPos()[0];
			newpos[1] = (sin(this.ang + this.ang_vel) * this.smaxis) + objects[this.parent].getPos()[1];

			return [newpos[0] - this.pos[0], newpos[1] - this.pos[1]];
		}
		else
		{
			return [0,0];
		}
	}
}

class Level // Class for holding relavent data for a Level
{
	CelObjs = [];
	startingObj;
	startingdirection;
	constructor(startingObj,startingdirection)
	{
		this.startingObj = startingObj;
		this.startingdirection = startingdirection;
	}

	addObj(obj) 
		{this.CelObjs.push(obj);}

	getObjs() 
		{return this.CelObjs;}

	getStartObj() 
		{return this.startingObj;}
}

class Player //Class for handling player code
{
	attachedObj;
	attacheddirection;
	direction;
	pos = [0,0];
	pos2 = [0,0];
	vel = [0,0];

	constructor(startingObj,startingdirection)
	{
		this.attachedObj = startingObj;
		this.attacheddirection = startingdirection;
		this.direction = startingdirection;
		var add = position_from_angle(startingObj.getSize()/2,startingdirection);
		this.pos = [startingObj.getPos()[0]+add[0],startingObj.getPos()[1]+add[1]];
		add = position_from_angle(16,this.attacheddirection);
		this.pos2 = [this.pos[0]+add[0],this.pos[1]+add[1]]

		this.vel = startingObj.calcRelVel();
	}

	getPos() {return this.pos;}	

	drawObj()
	{
		strokeWeight(1);
		fill(220,0,0);
		ellipse(this.pos[0],this.pos[1],16);
		ellipse(this.pos2[0],this.pos2[1],12);
		strokeWeight(3);
		if (devmode)
		{
			stroke(255,0,0);
			strokeWeight(5);
			line(this.pos[0],this.pos[1],this.pos[0]+(this.vel[0]*15),this.pos[1]);
			stroke(0,0,255);
			line(this.pos[0],this.pos[1],this.pos[0],this.pos[1]+(this.vel[1]*15));
			strokeWeight(3);
			stroke(0,0,0);

			textSize(33);
			fill(0);
			text("Player position: " + str(this.pos[0].toFixed(4)) + ', ' + str(this.pos[1].toFixed(4)),50,50);
			text("Player velocity: "+str(this.vel[0].toFixed(4))+', ' + str(this.vel[1].toFixed(4)),50,100);
			// text("Lauchable: "+ str(launching), 50,150);
		}
	}

	update()
	{
		this.direction = properAngleBetween(this.pos,[mouseX,mouseY]);

		if (launching)
		{
			var linecomp = position_from_angle(14,this.direction);
			linecomp[0] += this.pos[0];
			linecomp[1] += this.pos[1];
			var magnitude = min(dist(this.pos[0],this.pos[1],mouseX,mouseY) / 3,150);
			var linecomp2 = position_from_angle(magnitude,this.direction);
			linecomp2[0] += this.pos[0];
			linecomp2[1] += this.pos[1];

			stroke(255,255,255);
			strokeWeight(max(1,magnitude/40));
			line(linecomp[0],linecomp[1],linecomp2[0],linecomp2[1]);
			strokeWeight(3);
			stroke(0,0,0);
		}

		if (mousePress)
		{
			if (launching)
			{
				launching = false;
				var magnitude = min(dist(this.pos[0],this.pos[1],mouseX,mouseY) / 3,150) / 25;
				var components = position_from_angle(magnitude,this.direction); //thrust //////////////////////
				this.vel[0] += components[0];
				this.vel[1] += components[1];
			}
			else
			{
				var components = position_from_angle(0.10,this.direction); //thrust //////////////////////
				this.vel[0] += components[0];
				this.vel[1] += components[1];

				stroke(255,255,0);
				strokeWeight(5);
				var diffx = this.pos[0] - this.pos2[0];
				var diffy = this.pos[1] - this.pos2[1];
				line(this.pos[0]+diffx,this.pos[1]+diffy,this.pos[0]+(diffx*2),this.pos[1]+(diffy*2));
				strokeWeight(3);
				stroke(0,0,0);
			}
		}

		this.applyGravity();
		this.checkCollisions();

		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];

		var add = position_from_angle(8,this.direction);
		this.pos2 = [this.pos[0]+add[0],this.pos[1]+add[1]]
	}

	applyGravity()
	{
		for (i=0;i<objects.length-1;i++) 
		{
			var add = gravity_towards(this.pos,objects[i]);

			this.vel[0] += add[0];
			this.vel[1] += add[1];
		}
	}

	checkCollisions()
	{
		var hascollidedthisframe = false;
		for (i=0;i<objects.length-1;i++) 
		{
			var objectpos = objects[i].getPos();
			var distto = dist(this.pos[0]+this.vel[0],this.pos[1]+this.vel[1],objectpos[0],objectpos[1]);

			if (distto < objects[i].getSize()/2)
			{
				hascollidedthisframe = true;

				var diff = objects[i].getSize()/2 - distto;
				var angle = properAngleBetween(this.pos,objectpos);

				this.vel[0] += min(cos(angle) * -diff,abs(this.vel[0])) * objects[i].getBounce();
				this.vel[1] += min(sin(angle) * -diff,abs(this.vel[1])) * objects[i].getBounce();

				var relvel = objects[i].calcRelVel();

				this.vel[0] -= (this.vel[0] - relvel[0]) * objects[i].getFriction();
				this.vel[1] -= (this.vel[1] - relvel[1]) * objects[i].getFriction();

				if ((abs(this.vel[0] - relvel[0]) < 0.1) && (abs(this.vel[1] - relvel[1]) < 0.1))
					{launching = true;}
				else
					{launching = false;}
			}
		}
		if (!hascollidedthisframe)
			{launching = false;}
	}

	initialize() {}
}

//////////////////////////////
//utility functions
//////////////////////////////
function properAngleBetween(from,to) //from [x,y] to [x,y]
{
   	angle = createVector(1,0).angleBetween(createVector(from[0]-to[0],from[1]-to[1]));

   	if (from[1]<to[1])
    {
      angle -= 360;
      angle = abs(angle);
    }

    angle += 180; // This should not be this crazy complicated but it works and thats what matters
    if (angle > 360) 
    	{angle -= 360;}

    return angle;
}

function gravity_towards(from,to) //from [x,y] to obj
{
	angleMode(DEGREES);
	topos = to.getPos();
   	distto = dist(topos[0],topos[1],from[0],from[1]);

   	acc = to.getG() / pow(distto,2);
   	angle = properAngleBetween(from,topos);

    changex = cos(angle) * acc;
    changey = sin(angle) * acc;

    to.setLastg(acc.toFixed(4));

    return [changex,changey];
}

function position_from_angle(fullvalue,angle) 
	{return [cos(angle) * fullvalue, sin(angle) * fullvalue];}