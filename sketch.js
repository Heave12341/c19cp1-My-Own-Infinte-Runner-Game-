
var Alien;
var backGround;
var obs;
var gameState = "Play";
var score = 0;

var gameOver;



function preload(){

  obsIMG = loadImage("Obs1.1.png")
  alienIMG = loadAnimation("Alien1.1.png","Alien1.2.png","Alien1.3.png","Alien1.4.png");

  bgIMG = loadImage("BG.jpg");
  gameOverIMG = loadImage("Game Over.png")

  dieSound = loadSound("Die Sound.wav")
 

}

function setup() {
  createCanvas(600, 600);


  backGround = createSprite(175,300,600,600);
  backGround.addImage("bg", bgIMG);
  backGround.velocityY = 1;

  Alien = createSprite(300,300,10,10);
  Alien.addAnimation("alienAni", alienIMG);
  Alien.scale = 0.2;

  gameOver = createSprite(300,300,10,10);
  gameOver.addImage("GameOverIMG", gameOverIMG)
  gameOver.scale = 1

  gameOver.visible = false;



  obsGroup = new Group();
 

}

function draw() {
  background("black");
  

  if(gameState === "Play"){

    Alien.visible = true;

    textSize(12);
    stroke("white");
    strokeWeight(3);
    fill(188, 19, 254);
    text("Score: "+ score, 500,33);
    score = score + Math.round(getFrameRate()/33);

    if(backGround.y > 350 ){
      backGround.y = 300
    }
      


    if(keyDown("RIGHT")){
      Alien.x = Alien.x+3;
    }

    if(keyDown("LEFT")){
      Alien.x = Alien.x-3;
    }

   

    if(keyDown("SPACE")){
      Alien.velocityY = -5;
    }

    Alien.velocityY += 0.1;

    spawnObs();
 
    if(obsGroup.isTouching(Alien)|| Alien.y>595 ){

      gameState = "End";
      
    } 

  }
    else if(gameState === "End"){

      gameOver.visible = true;


      Alien.visible = false;

      backGround.velocityY = 0;

      obsGroup.destroyEach();



    }

    





  drawSprites();
}


function spawnObs(){
  if(frameCount % 100 === 0){

    randomNUM = Math.round(random(100,500));
    obs = createSprite(randomNUM,0,10,10);
    obs.scale = 0.5;
    obs.setCollider("rectangle", 10, 10, 250, 50);
    //obs.debug = true;
    obs.addImage("obstacle", obsIMG);
    obs.velocityY = 3;
    obsGroup.add(obs);
    
    obs.depth = Alien.depth;
    Alien.depth++;
   
  
  }
} 

