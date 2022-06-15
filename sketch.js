

var bow , arrow,  background, redB, pinkB, greenB ,blueB ,arrowGroup;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var burst;
var gameOverImg, gameOver;
var PLAY=1,END=0,gameState=1;
var bg;

function preload(){
  
  backgroundImage = loadImage("https://img.freepik.com/free-vector/stock-market-economic-graph-with-diagrams-business-financial-concepts-reports-abstract-technology-communication-concept-background_29865-1321.jpg?size=626&ext=jpg");
  
  arrowImage = loadImage("https://www.freeiconspng.com/uploads/bullet-png-31.png");
  
  bowImage = loadImage("http://www.pngall.com/wp-content/uploads/5/Money-Heist-TV-Series-PNG-Download-Image.png");
  
  red_balloonImage = loadImage("https://www.buybitcoinworldwide.com/img/kb/crypto/crypto.png");
  
  green_balloonImage = loadImage("https://www.buybitcoinworldwide.com/img/kb/crypto/crypto.png");
  
  pink_balloonImage = loadImage("https://s3.amazonaws.com/gameartpartnersimagehost/wp-content/uploads/2016/11/GAP_feature2.png");
  
  blue_balloonImage = loadImage("https://s3.amazonaws.com/gameartpartnersimagehost/wp-content/uploads/edd/2016/03/Royalty-Free-Game-Art-Tiny-Army-Soldier-Featured2.png");
 
  burst=loadSound("https://static.wixstatic.com/mp3/bc193a_ac4e2b9865df4fa29d4af30179ff7569.mp3");
  
  gameOverImg=loadImage("http://img05.deviantart.net/fb16/i/2012/279/0/2/game_over_logo_by_mohanmadabd-d5gz4mj.png")
  
 bg= loadSound("bg.wav");
}



function setup() {
  createCanvas(600, 600);
  //creating background
  background = createSprite(0,0,600,600);
  background.addImage(backgroundImage);
  background.scale = 3.5
  
  // creating bow to shoot arrow
  bow = createSprite(480,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 0.1;
  
 gameOver=createSprite(300,200,0,0);
  gameOver.addImage("over",gameOverImg);
  gameOver.visible=false;
  
   score = 0  
  redB= new Group();
  greenB= new Group();
  blueB= new Group();
  pinkB= new Group();
  arrowGroup= new Group();
 
  bg.play();
  
}

function draw() {
   
if(gameState==PLAY)
  {
   
  // moving ground
    background.velocityX = -3 
    if (background.x < 0){
      background.x = background.width/2;
    }
  
  //moving bow
  bow.y = World.mouseY
  
   // release arrow when space key is pressed
  if (keyDown("space")) {
    createArrow();
    
  }
  
  //creating continous enemies
  var select_balloon = Math.round(random(1,4));
  
  if (World.frameCount % 100 == 0) {
    if (select_balloon == 1) {
      redBalloon();
    } else if (select_balloon == 2) {
      greenBalloon();
    } else if (select_balloon == 3) {
      blueBalloon();
    } else {
      pinkBalloon();
    }
  }
  
  if (arrowGroup.isTouching(redB)) {
    burst.play()
  redB.destroyEach();
  arrowGroup.destroyEach();
    score=score+1;
}




 if (arrowGroup.isTouching(greenB)) {
   burst.play();
  greenB.destroyEach();
  arrowGroup.destroyEach();
  score=score+3;
}
    
    if (arrowGroup.isTouching(blueB)) {
   burst.play();
  gameState=END;
}
    
    if (arrowGroup.isTouching(pinkB)) {
   burst.play();
   gameState=END;
}

  }
else if(gameState==END)
  {
  
 if (arrowGroup.isTouching(blueB)||arrowGroup.isTouching(pinkB) ) {
   burst.play();
   gameState=0;
   gameOver.visible=true;
   gameOver.scale=0.5;
  blueB.destroyEach ();
    pinkB.destroyEach();
   greenB.destroyEach();
   redB.destroyEach();
  arrowGroup.destroyEach();
}

  }
  
  drawSprites();
    text("Score: "+ score, 500,50);
}


function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.1;
  redB.add(red);
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.2;
  blueB.add(blue);
}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.1;
  greenB.add(green);
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 150;
   pink.scale = 0.2 ;  
  pinkB.add(pink);
}


// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(5, 5, 20, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.2;
  arrowGroup.add(arrow);
   
}
