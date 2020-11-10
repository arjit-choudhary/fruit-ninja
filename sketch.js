var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit ,monster,fruitGroup,enemyGroup, score,randomFruit;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage
var fruits;

function preload(){
  
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
}



function setup() {
  createCanvas(600, 600);
  
  
   sword=createSprite(20,20,20,20);
   sword.addImage(swordImage);
   sword.scale=0.5
  
  
  sword.setCollider("circle",0,0,40);

  enemyGroup=createGroup();
  fruitGroup=createGroup();
  score=0;
  
}



function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Call fruits and Enemy function
    fruits();
    Enemy();
    
    // Move sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score=score+2;
      
    }
    if(score===100){
      gameState=END
      background("lightblue");
      invisiblesword=createSprite(mouseX, mouseY)
      invisible.visible=false
      text("Yay!!"+"YOU DID IT")
      scale=1
    }
    else
    {
      // Go to end state if sword touching enemy
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        gameOverSound.play()
        text("Try it next time", 200, 200)
        scale=3;
        
        if(keyDown("R")){
          gameState=play
          
        }
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        sword.addImage(gameOverImage);
        sword.x=300;
        sword.y=300;
        sword.scale=2
      }
    }
  }
  drawSprites();
  text("Score - " + score, 300, 20)
}
function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,600));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    enemyGroup.add(monster);
  }
}



function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    //fruit.debug=true;
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1);
    } else if (r==2){
      fruit.addImage(fruit2);
    } else if (r==3){
      fruit.addImage(fruit3);
    } else if (r==4){
      fruit.addImage(fruit4);
    }
    
    position=Math.round(random(1,2));
   
    if(position==1)
      {
        fruit.x=400;
        fruit.velocityX=-(7+(score/4));
        }
    else
    {
      if(position==2){
        fruit.x=0;
        fruit.velocityX=(7+(score/4));
      }
    }
    
     
    
    fruit.y=Math.round(random(50,340));

    fruit.setLifetime=100;
    fruitGroup.add(fruit);
  
 
  }
}

