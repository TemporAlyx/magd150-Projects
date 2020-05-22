
let width = 800; //using width and height as references for other sizes, so that changing the canvas scale 
let height = 600;//doesnt affect the scale of the image being created
//NOTE: for this assignment changing width and height could break stuff

Game = true; //var to see if youve lost or not
score = 0;  //

//assignment 6 idea:
//theme is supposed to be weather or retro game
//why not weather AND game

//shape can be a cloud that moves from side to side, and occasionally zaps
//The player has a square that they can move from 
//side to side with arrow keys to dodge the lightning
//score is number strikes the player dodges

var character = 
{
  x : width/2,
  y : height-80,
  speed : 10,
  moveleft : function()
  {
    if (this.x-this.speed > 0)
    {
      this.x -= this.speed;
    }
  },
  moveright : function()
  {
    if (this.x+100+this.speed < width)
    {
      this.x += this.speed;
    }
  },
  drawcharacter : function()
  {
    push();
    fill(230,0,0);
    rect(this.x,this.y,80,80);
    pop();
  }
};

function checkCollision(x)
{
  if (x < character.x+79 && x > character.x)
  {
    Game = false;
  }
}

var Clouds = [];

function newCloud()
{
  var Cloud = 
  {
    x : random(50,width-50),
    y : random(80,250),
    size : random(1.2,2,0),
    speed : random(2,10),
    direction : random([1,-1]),
    zap : random(5,10),
    moveCloud : function()
    {
      this.x += this.speed * this.direction;
      if (this.x > (width - 50) || this.x < 50)
      {
        this.direction *= -1;
      }
      this.zap -= 1/30;
      if (this.zap <= 0)
      {
        if (this.zap <= -0.06)
        {
          this.zap = random(3,8);
          score += 1;
        }
        push();
        strokeWeight(3);
        stroke(255,255,0);
        line(this.x+25,this.y,this.x+25,height);
        pop();
        checkCollision(this.x+25)
      } 
    },
    draw : function()
    {
      push();
      if (this.zap < 3)
      {
        fill(195,195,(this.zap/3)*195);
      }
      else
      {
        fill(195,195,195);
      }
      arc(this.x, this.y, 25 * this.size, 20 * this.size, PI + TWO_PI, TWO_PI);
      arc(this.x + 10, this.y, 25 * this.size, 45 * this.size, PI + TWO_PI, TWO_PI);
      arc(this.x + 25, this.y, 25 * this.size, 35 * this.size, PI + TWO_PI, TWO_PI);
      arc(this.x + 40, this.y, 30 * this.size, 20 * this.size, PI + TWO_PI, TWO_PI);
      pop();
    } // cloud function by jackiezen, modified
  };

  Clouds.push(Cloud);
}



function setup() 
{
  colorMode(RGB, 255, 255, 255, 1);
  createCanvas(width,height);
  background(250);
  frameRate(60);

  for(i = 0;i<5;i++)
  {
    newCloud();
  }
}

function draw()
{
  if (Game)
  {
    background(230);

    character.drawcharacter();
    print(score);
    for (i=0;i<Clouds.length;i++)
    {
      Clouds[i].moveCloud();
      Clouds[i].draw();
    }

    if (keyIsDown(RIGHT_ARROW))
    {  
      character.moveright();
    }

    if (keyIsDown(LEFT_ARROW))
    {  
      character.moveleft();
    }

    push();
    textSize(32);
    fill(215,215,215);
    text(score,width/2,height/2);
    pop();
  }
  else
  {
    background(0);
    textSize(32);
    fill(255,255,0);
    text(score,width/2,height/2);
  }
}