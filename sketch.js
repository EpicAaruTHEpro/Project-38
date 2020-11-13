var monkey, monkeyAnimated, stillMonkey;
var bananaImg;
var BananaGroup;
var rockImg;
var RockGroup;
var invisibleGround;
var backGround;
var jungle;
var score;
var restart, restartImg;
var RestartGroup;
var gameState;
var PLAY, END, RESTART;

function preload() {
  monkeyAnimated = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImg = loadImage("banana.png");
  rockImg = loadImage("rock.png");
  restartImg = loadImage("restart.png");
  jungle = loadImage("jungle2.png");
  
  
  
}


function setup() {
  var canvas =createCanvas(600, 200);
  
  //creates background sprite
  backGround = createSprite(300,100,600,200);
  backGround.addImage("jungle",jungle);
  backGround.velocityX = -6;
  backGround.x = camera.position.x;

  //creates game state
  PLAY = 1;
  END = 0;
  RESTART = 2;
  gameState = PLAY;

  //creates monkey
  monkey = createSprite(50, 150, 20, 50);
  monkey.addAnimation("monkey", monkeyAnimated);
  monkey.scale = 0.05;
  
  //invisible Ground to support Monkey
  invisibleGround = createSprite(300, 197, 600, 5);
  invisibleGround.visible = false;
  invisibleGround.velocityX = -6;
  invisibleGround.x = camera.position.x;

  //creates groups
  BananaGroup = new Group();
  RockGroup = new Group();

  //reset button
  RestartGroup = new Group();

  //score
  score = 0;

  textSize(18);
  textFont("Comic Sans");



}

function draw() {
  background(220);
  
  //console.log(frameCount);
  
  if (gameState === PLAY) {
    
    camera.position.x=monkey.x;
    
    backGround.velocityX = -6;
    
    if (backGround.x < camera.position.x-300){
      backGround.x = camera.position.x;
    }

    invisibleGround.velocityX = -6;
    
    if (invisibleGround.x < camera.position.x-300){
      invisibleGround.x = camera.position.x;
    }

    monkey.velocityX=6;
    monkey.velocityY+=0.8;
    
    if (keyDown("space") && monkey.y >= 163) {
      monkey.velocityY = -15;
    }
    
    
    if (BananaGroup.isTouching(monkey)) {
      //playSound("sound://category_achievements/vibrant_game_postive_achievement_4.mp3",false);
      score += 2;
      BananaGroup.destroyEach();
    }
    
    if (RockGroup.isTouching(monkey)) {
      //playSound("Jingle-(Death)---Donkey-Kong-Country-Tropical-Freeze---Music.mp3",false);
      gameState = END;
    }
    
    switch(score) {
      case 10: monkey.scale = 0.06;
      break;
      case 20: monkey.scale = 0.07;
      break;
      case 30: monkey.scale = 0.08;
      break;
      case 40: monkey.scale = 0.09;
      break;
      case 50: monkey.scale = 0.1;
      break;
      default:
      break;
    }
    
    spawnRocks();
    spawnBananas();
    
  }
  
  else if (gameState === END) {
    backGround.velocityX = 0;
    invisibleGround.velocityX=0;
    monkey.velocityX=0;
    monkey.velocityY = 0;
    RockGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
    
    RockGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
    
    restart = createSprite(camera.position.x,100,50,50);
    restart.addAnimation("restart", restartImg);
    restart.scale = 0.2;
    RestartGroup.add(restart);
  }
  
  if (mousePressedOver(restart) && gameState === END) {
    RestartGroup.destroyEach();
    score = 0;
    gameState = RESTART;
  }
  
  else if (gameState === RESTART) {
    monkey.scale = 0.05;
    BananaGroup.destroyEach();
    RockGroup.destroyEach();
    gameState = PLAY;
    score = 0;
  }
  
  //stop monkey from falling down
  monkey.collide(invisibleGround);
  
  RockGroup.setColliderEach("circle",0,0,180);

  
  
  drawSprites();

  if (score >= 100) {
    text("You Won!", camera.position.x, 20);
    gameState = END;
  }
  text("Banana Score: "+ score, camera.position.x+150, 50);
}

function spawnRocks() {
  if (camera.position.x % 400 ===0) {
    var rock = createSprite(camera.position.x+300,160,40,40);
    //rock.velocityX = -6;
    rock.addAnimation("rock", rockImg);
    rock.scale = 0.2;
    rock.lifetime = 200;
    RockGroup.add(rock);
  }
}

function spawnBananas() {
  if (camera.position.x % 200 ===0) {
    var banana = createSprite(camera.position.x+300, 110, 20, 20);
    banana.y = random(15,50);
    banana.addAnimation("Banana", bananaImg);
    //banana.velocityX = -6;
    banana.scale = 0.05;
    banana.lifetime = 200;
    BananaGroup.add(banana);
  }
}