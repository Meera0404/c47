var redhat, enemy;
var redhatimg ,enemyimg;
var background, backgroundimg;
var invisibleg;
var arrow,shovel,sword,axe,obstacle,obstacleGroup;
var score = 0;
var gameState = "play";
var fallimg;


function preload(){
backgroundimg = loadImage("backg2.jpg");
redhatimg     = loadAnimation("run1.png","run2.png");
enemyimg      = loadAnimation("attack(1).png","attack(2).png","attack(3).png");
arrow         = loadImage("arrow.png");
shovel        = loadImage("shovel.png");
axe           = loadImage("axe.png");
sword         = loadImage("sword.png");
fallimg       = loadAnimation("slide.png");


}


function setup() {
  createCanvas(800, 500);

  background=createSprite(0,0,800,500);
  background.addImage(backgroundimg);
  background.scale=6;

  redhat = createSprite(20,150,10,10);
  redhat.addAnimation("jump",redhatimg);
  redhat.addAnimation("fall",fallimg);
  redhat.scale = 0.2;

  enemy  = createSprite(700,150,20,20);
  enemy.addAnimation("attack",enemyimg);
  enemy.scale = 0.2;

  invisibleg = createSprite(20,450,1600,10);
  invisibleg.visible = false;

  obstacleGroup = new Group();

  //redhat.debug = true;
  obstacleGroup.debug = true;
  
  
  
}

function draw() {
  
  score = score+Math.round(frameCount/150);

 // background.velocityX = -3;
 if(gameState === "play"){

  if (background.x < 0){
    background.x = background.width/2;
  }


  if(keyDown("space")){
    redhat.velocityY = -3;
  }
  redhat.velocityY += 0.8;
  redhat.collide(invisibleg);
  if(frameCount%150 === 0){
  obstacles();
}

if(obstacleGroup.isTouching(redhat)){
  gameState = "end";
}
 }

 if(gameState === "end"){
   obstacleGroup.setLifetimeEach(-1);
   redhat.changeAnimation("fall",fallimg);
   redhat.y = 420;  
   redhat.velocityY= 0;
 }

  drawSprites();

  stroke("blue");

  textSize(20);
  text("Survival Time:"+score,500,40);

  
}

function obstacles(){
  obstacle = createSprite(700,150,20,20);
 // obstacle.velocityX = -2;
 var rand = Math.round(random(1,4));

 switch(rand){
   case 1 : obstacle.addImage(arrow);
   obstacle.y = 120;
   enemy.y    = obstacle.y;
   obstacle.velocityX = -2;
   obstacle.lifetime = 350;
   break;

   case 2 : obstacle.addImage(axe);
   obstacle.y = 200;
   enemy.y    = obstacle.y;
   obstacle.velocityX = -4;
   obstacle.lifetime = 175;

   break;

   case 3 : obstacle.addImage(sword);
   obstacle.y = 100;
   enemy.y    = obstacle.y;
   obstacle.velocityX = -3;
   obstacle.lifetime  = 234 ;

   break;

   case 4 : obstacle.addImage(shovel);
   obstacle.y = 220;
   enemy.y    = obstacle.y;
   obstacle.velocityX = -2;
   obstacle.lifetime = 350;

   break;
   default:break;
 }

  obstacle.scale = 0.5;

  obstacleGroup.add(obstacle);

  obstacle.setCollider("circle",0,0,40);
  obstacle.debug = true;     





}