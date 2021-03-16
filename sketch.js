
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, bg, backgroundImage
var gameState = "PLAY"
var strikes
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  backgroundImage = loadImage ("jungle.jpg");
 bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  // createCanvas(600, 600);
  bg = createSprite (200, 200, 1, 1)
bg.addImage("background", backgroundImage)

  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  ground = createSprite(400,370,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible = false;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
  strikes = 0
 
  
}


function draw() {
  
  background(255);
  
  if (gameState = "PLAY"){
    ground.velocityX = -4;
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
camera.position.x = displayWidth/2
 camera.position.y = monkey.y
   
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 160,50);        
  
  if (FoodGroup.isTouching(monkey)){
    score= score + 1;  
    FoodGroup.destroyEach()
      }
    if(obstaclesGroup.isTouching(monkey)){
        obstaclesGroup.destroyEach();
      strikes = strikes + 1
    }
      stroke("black");
  textSize(20);
  fill("black");
  
  switch(score){
  case 10: monkey.scale = 0.12
    break;
    case 20: monkey.scale = 0.14
    break;
    case 30: monkey.scale = 0.16
    break;
    case 40: monkey.scale = 0.18
    break;
}
    switch(strikes){
      case 1: monkey.scale = 0.05
        break;
        case 2: gameState === 2
        break;
    }
  }
if (gameState === 2){
end();
}
   
    }
  
  




function spawnFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
     banana.addImage(bananaImage);
     banana.scale=0.05;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 10 === 0) {
    obstacle = createSprite(800,340,20,30);
    obstacle.velocityX = -6;
     
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
        
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
    
  }
}
function end(){
  ground.velocity = 0
 FoodGroup.destroyEach();
obstaclesGroup.destroyEach();
        FoodGroup.setVelocityXEach(0);
obstaclesGroup.setVelocityXEach(0);
  stroke("yellow");
  text ("TRY AGAIN? Refresh!", 100, 200)
  console.log("Game Ended");
}