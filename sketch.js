var balloon,balloonImage1,balloonImage2;
var bg;
var database,height; 

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }


function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.7;

  var ballonPos = database.ref('ballon/height');
  ballonPos.on("value",readHeight,showError);

  textSize(20); 
}


function draw() {
  background(bg);

  
    if(height!==undefined)
    {
      if(keyDown(LEFT_ARROW)){
        writeHeight(-1,0);
        balloon.addAnimation("hotAirBalloon",balloonImage2);
      }
      else if(keyDown(RIGHT_ARROW)){
        writeHeight(1,0);
        balloon.addAnimation("hotAirBalloon",balloonImage2);
      }
      else if(keyDown(UP_ARROW)){
        writeHeight(0,-1);
        balloon.addAnimation("hotAirBalloon",balloonImage2);
        balloon.scale = balloon.scale -0.01;
      }
      else if(keyDown(DOWN_ARROW)){
        writeHeight(1,0);
        balloon.addAnimation("hotAirBalloon",balloonImage2);
        balloon.scale = balloon.scale +0.01;
      }
    }
  
  
      drawSprites();
      fill(0);
      stroke("white");
      textSize(25);
      text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


function writeHeight(x,y)
{
  database.ref('ballon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })
}


function readHeight(data)
{
  height = data.val();
  console.log(height.x);
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError()
{
  console.log("Error in writting to the database");
}