var dora,doraAnimation,cake,cakeIMG,rat,ratIMG;
var backIMG,cakeGroup,obstacleGroup,dora_collided,score;
var ground,restart,gameOver,restartIMG,gameOverIMG;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
function preload(){
 doraAnimation=loadAnimation("doraemon1.png","doraemon2.png")
backImg=loadImage("backg.jpg")
   cakeIMG = loadImage("doracake.png")
  ratIMG = loadImage("rat-removebg-preview.png")
  dora_collided = loadAnimation("doraemon_collided.png")
  restartIMG = loadImage("rest-1.png")
  gameOverIMG = loadImage("gameOverImage-1.jpg")
}

function setup() {
  createCanvas(600,600);
  background=createSprite(300,200 );
  background.addImage(backImg)
  background.scale=1
  
 dora=createSprite(100,340);
 dora.addAnimation("runnning",doraAnimation);
  dora.addAnimation("collided",dora_collided);  
  dora.scale=0.5;
  ground=createSprite(200,380,1500,20);
  
  restart = createSprite(300,280);
  restart.addImage(restartIMG)
  restart.scale = 0.2;
  
  gameOver = createSprite(300,200);
  gameOver.addImage(gameOverIMG)
  gameOver.scale=0.2;
  
  
  
  cakeGroup = new Group();
  obstacleGroup = new Group();
  
  dora.setCollider("rectangle",0,0,100,130)
  dora.debug = false;
  console.log(END )
  
  score = 0;
}




function draw() {
  
  ground.visible = false;
  
  
  
  dora.collide(ground);
   
  if(cakeGroup.isTouching(dora))
    {
      cakeGroup.destroyEach();
      score=score+1; 
    }
 
  if(obstacleGroup.isTouching(dora))
    {
      gamestate = END;
      
    }
  
  if(gamestate == PLAY)
    {
      
       background.velocityX = -3;
      
  
  if(background.x < 0)
    {
      background.x = background.width/2 ;
    }
       dora.changeAnimation("runnning",doraAnimation);
      
      spawnCake();
      spawnObstacles();  
      
      gameOver.visible = false;
       restart.visible = false;
      
      if(keyDown("space"))
    
    {
      dora.velocityY  = -14 ;
    }
  
  dora.velocityY = dora.velocityY + 0.8;
      
    }else if (gamestate == END)
      {
          background.velocityX = 0;
        
         gameOver.visible = true;
        restart.visible = true;
        
        if(mousePressedOver(restart))
          {
            Reset();
          }
        
        obstacleGroup.setLifetimeEach(-1);
    cakeGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     cakeGroup.setVelocityXEach(0);    
        
        dora.changeAnimation("collided",dora_collided);     
       
        dora.velocityY = 0;         
        
      }
 drawSprites();
   textSize(18)
  fill(50)
  text("score = "+score,450,100)
 
}

function spawnCake()
{
  if(frameCount % 120 === 0)
    {
      cake = createSprite(500,Math.round(random(100,200)));
      cake.addImage(cakeIMG)
      cake.scale=0.3;
      cake.velocityX = -3;
      cake.lifetime = 150;
      cakeGroup.add(cake);
    }
}

function spawnObstacles()
{
  if(frameCount % 300 === 0)
    {
      rat = createSprite(500,340);
      rat.addImage(ratIMG)
      rat.scale=0.3;
      rat.velocityX = -4  ;
      rat.lifetime = 150;
      obstacleGroup.add(rat)
    }
}

function Reset()
{
  gamestate = PLAY;
  
  obstacleGroup.destroyEach();
  cakeGroup.destroyEach();
  
  score=0; 
  
}