//Declaration of Global Variables
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var strawberry,strawImage;


//group variables
var FoodGroup, obstacleGroup;
var strawberryGroup;

//score and losing system
var score;
var invisibleground;
var gameover,gameoverImage,restart,restartImage;
var ground;
var survivalTime;
var chances;

//game states
var START=1;
var PLAY=2;
var  END=0;
var gameState=START;

//sound variables
var longjump_sound;
var jumpSound;
var dieSound;
var endsound;

//var fire,fImage;
var edges;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backgroundImage=loadImage("hi.jpg");
  groundImage=loadImage('f.png');
  bananaImage=loadImage('banana.png');
  strawImage=loadImage('strawberry.png');
  obstacleImage=loadImage('obstacle.png');
  gameoverImage=loadImage('gameover.png');
  restartImage=loadImage('restart.png');
//  fImage=loadImage('Picture1.png');
  
  jumpSound=loadSound('cartoon_hop_jump_bounce.mp3');
  longjump_sound=loadSound('sound2.mp3');
  endSound=loadSound('zapsplat_multimedia_game_sound_retro_digital_fifths_descend_lose_negative_002_40600.mp3');
  dieSound=loadSound('zapsplat_multimedia_game_sound_arcade_retro_8_bit_death_lose_life_003_54216.mp3');
}



function setup() {
  createCanvas(600,460);
 

  bground=createSprite(400,230,190,50);
  bground.addImage('background',backgroundImage);
  bground.scale=1.2;
  
  monkey=createSprite(110,350,10,10);  
  monkey.addAnimation("run",monkey_running);
  monkey.scale=0.2;
  monkey.setCollider("rectangle",0,0,220,600);
//  monkey.debug=true;
  
  ground=createSprite(500,430,10,10);
  ground.addImage(groundImage);
  
  
  
  invisibleground=createSprite(500,435,1000,10);
  invisibleground.visible=false;
  
  gameover=createSprite(269,170,1,1);
  gameover.addImage(gameoverImage);
  gameover.scale=0.7;
  
  restart=createSprite(269,350,100,1);
  restart.addImage(restartImage);
  restart.scale=0.5;
  
 //fire=createSprite(300,372,100,10);
 //fire.addImage('fire',fImage);
 //fire.scale=0.8;
  
  score=0;
  survivalTime=10;
  chances=3;
  
  foodGroup=new Group();
  strawberryGroup=new Group();
  obstacleGroup=new Group();
  
  edges=createEdgeSprites();
}


function draw() {
 background('black');
  
    ground.velocityX = -3;

    if(ground.x<0)
  {
    //To give infinite scrolling effect to ground
    ground.x=ground.width/2;
  }
  monkey.velocityY=monkey.velocityY+2;
  
  monkey.collide(invisibleground);
  
   if(gameState===START)
  {
   //To make restart & game Over invisible
   gameover.visible=false;
   restart.visible=false;
    
   //Instructions for playing this game/USER GUIDE
   background("black");
   fill("grey");
   textSize(20);
   text("Read all the instructions carefully before playing:",50,110);
   fill("red");
   textSize(18);
   text("1.Press Space Key to Start the Game.",50,140);
   fill("cyan");
   text("2.Press UP Arrow Key for long jump.",50,170);
   fill('yellow');
   text("3.Press Space Key to Jump.",50,200);
   fill('orange');
   text("4.Try to collect max strawberries to get more survival time.",50,230);
    fill('pink');
   text("5.Don't Let Survival Time 0 otherwise game will end.",50,260);
    fill('purple');
   text("6.Collect bananas to score and get survival time.",50,290);
    fill('green');
   text("7.Avoid the obstacles otherwise you will lose 1 chance out of 3.",50,320);
    fill('blue');
   text("8.Try to Score high,as the score increases game will get more difficult.",50,350);
    fill('white');
   text("9.Avoid Long Jump unnecessary as it decrease survival time.",50,380);
    
   textSize(60);
    fill('cyan');
   text("ALL THE BEST!!~",70,450);
    
    textSize(40);
    text('INSTRUCTIONS',100,80);
    
   
    bground.visible=false;
    ground.visible=false;
    monkey.visible=false;
    
    if(keyDown('space')){
      gameState=PLAY;
    }
   
  }
  
  
  if (gameState===PLAY){
    ground.visible=true;
    monkey.visible=true;
    bground.visible=true;
    //fire.visible=true;
     ground.velocityX=-(4+score/10);
    
   gameover.visible=false;
   restart.visible=false;
    
    monkey.bounceOff(edges);
    
     if(keyDown('space')&&monkey.y>=100){
       monkey.velocityY=-19;
       jumpSound.play();
       
     }
     else if(keyDown("UP_ARROW")&&monkey.y>100)
    {
      //To make monkey move up
      monkey.velocityY=-25;
      //Monkey get hungry and survival time decrease with long jump
      survivalTime=survivalTime-1;
      //adding sound
      longjump_sound.play();
      
    } 
     if(monkey.isTouching(foodGroup))
    {
      foodGroup.destroyEach();
      score=score+2;
      survivalTime=survivalTime+5;
    }
     if(monkey.isTouching(strawberryGroup))
    {
      strawberryGroup.destroyEach();
      score=score+5;
      survivalTime=survivalTime+10;
    } 
    if(frameCount%100===0)
    {
      survivalTime=survivalTime-1;
    }
    if(monkey.isTouching(obstacleGroup))
    {
      chances=chances-1;
      obstacleGroup.destroyEach();
      score=score-1;
      dieSound.play();
    }
    food();
  bonusfood();
  obstacles();
    if(chances===0||survivalTime===0)
  {
    gameState=END;
    endSound.play();
  }
  }
    
      if(gameState===END){
  
    ground.velocityX=0
    foodGroup.setVelocityEach(0);
    foodGroup.destroyEach();
    strawberryGroup.setVelocityEach(0);
    strawberryGroup.destroyEach();
    obstacleGroup.setVelocityEach(0);
    obstacleGroup.destroyEach();
   // invisibleground.destroy();
    
        monkey.visible=false;
        gameover.visible=true;
        restart.visible=true;
        bground.visible=false;
        ground.visible=false;
        
        
        
         if(mousePressedOver(restart))
  {
    //Calling restart function
    reset();
  }
  }
  drawSprites();
   fill('yellow');
  textSize(20);
  text('score:'+score,500,35);
  text("Survival Time: "+survivalTime,230,35);
  text('chances:'+chances,10,35);
   
 
}

function food(){

  //To make banana appear at interval of 150 frames
  if(frameCount%180===0)
  {
    //To create banana sprite
    banana=createSprite(600,Math.round(random(80,270)),10,10);
    //To add image to banana
    banana.addImage(bananaImage);
    //To assign velocity to banana
    banana.velocityX=-(4.5+score/10);
    //Scaling to adjust image
    banana.scale=0.5/2;
    //To assign lifetime to banana
    banana.lifetime=width/banana.velocity;
    //Add banana to foodgroup
    foodGroup.add(banana);
  }
  
}
function bonusfood()
{
  
  if(frameCount%200===0)
  {
  
  strawberry=createSprite(width,Math.round(random(200,80)),10,10);
  strawberry.addImage(strawImage);
  strawberry.scale=0.1;
  strawberry.velocityX=-(9+score/8);
  strawberry.lifetime=width/strawberry.velocity;
  strawberryGroup.add(strawberry);
  }
}

function obstacles()
{
  
  if(frameCount%170===0)
  {
  
  obstacle=createSprite(width,height-56,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.11 ;
  obstacle.velocityX=-(4+score/15);
  obstacle.lifetime=width/obstacle.velocity;
  obstacleGroup.add(obstacle);
  }
}

function reset()
{
  //Initial 
  gameState=PLAY;
  score=0;
  chances=3;
  survivalTime=10;
  gameover.visible=false;
  restart.visible=false;
  monkey.visible=true;
}
