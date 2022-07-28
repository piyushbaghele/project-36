var astronaut_running,astronaut
var scene_image,scene
var obstacle_1 ,obstacle_2 ,obstacle_3 ,obstacle_4,obstacle_5;
var gem_1;
var score = 0;
var gameState = 1


function preload(){
  astronaut_running = loadAnimation("imagess/running-4.png","imagess/running-5.png","imagess/running-6.png")  
  scene_Image = loadImage("imagess/img8.jpg");
  
  obstacle_1 = loadImage("imagess/obstacle-1.png")
  obstacle_2 = loadImage("imagess/obstacle-2.png")
  obstacle_3 = loadImage("imagess/obstacle-3.png")
  obstacle_4 = loadImage("imagess/obstacle-4.png")
  obstacle_5 = loadImage("imagess/obstacle-5.png")

  spaceCraft = loadImage("imagess/rocket.png")
  gem_1 = loadImage("imagess/gem-1.png")
}

function setup() {
  createCanvas(1600, 720);

 scene = createSprite(1400,height/2,1000,800); 
 scene.addImage("background",scene_Image);
 
 scene.scale=2
 
 astronaut = createSprite(150,height-155);
 astronaut.addAnimation("running",astronaut_running);
 astronaut.scale = 0.6;


 obstaclesGroup = createGroup();
 gemsGroup = createGroup()

 invisibleGround = createSprite(200,height - 50,400,10);
 invisibleGround.visible = true


 score = 0;
}

function draw() {
  background(0);
  
  if(gameState == 1){
    scene.velocityX = -5

  if (scene.x < 200){
     scene.x = 1300; 
    }

    console.log(astronaut.y)
    if(keyDown("space")&& astronaut.y >= 548) {
      astronaut.velocityY = -16;
  }
    
  astronaut.velocityY = astronaut.velocityY + 0.4

 if(gemsGroup.isTouching(astronaut)){
    gemsGroup.destroyEach();
    score = score + 5;
 }

 astronaut.collide(invisibleGround);

 spawnObstacles();
 spawnGem();

  astronaut.collide(invisibleGround);

  //gameOver 
  if(obstaclesGroup.isTouching(astronaut)){
    scene.velocityX = 0
    gameState = 2;
    
  }

  //game won
  if(score >= 30){
    scene.visible = false;
    astronaut.changeImage(spaceCraft)
    gameSate = 3
  }

    }

    if(gameSate == 2){
      textSize(50)
      text("GAME OVER",width/2,height/2)

    }

  drawSprites();

  textSize(30);
  fill("black");
  text("If you score more than 30 then astronaut will get the spacecraft to Earth his home.",width/2 -500 ,50)
  text("Score: "+ score, width/2,90);
  
  
}

function spawnObstacles(){
if(frameCount % 110 === 0){
  var obstacle = createSprite(width+50,600)
  obstacle.velocityX = -5

var rand = Math.round(random(1,5));
switch(rand) {
  case 1:
     obstacle.addImage(obstacle_1);
     obstacle.scale = 0.5;
          break;
  case 2:
     obstacle.addImage(obstacle_2);
     obstacle.scale = 0.5;
          break;
  case 3:
     obstacle.addImage(obstacle_3);
     obstacle.scale = 0.5;
          break;
  case 4:
     obstacle.addImage(obstacle_4);
          obstacle.scale = 0.3;
          break;
  case 5:
     obstacle.addImage(obstacle_5);
     obstacle.scale = 0.5;
      break;
  default:
     break;

}

    obstacle.lifetime = 400;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);

  }
    }

function spawnGem(){
  if(frameCount % 180 === 0){
    var gem = createSprite(width+50,600)
    gem.addImage(gem_1);
    gem.scale = 0.10;
    gem.velocityX = -5
    gem.lifetime = 400;
    gemsGroup.add(gem);

  }
}


