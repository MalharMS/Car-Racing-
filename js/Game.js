class Game {
  constructor(){
    this.playerName = "" ;
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 225;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          this.playerName = allPlayers[plr].name;
          stroke(10);
          fill('red');
          ellipse(x,y,70,70);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }


    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 4100){
      gameState = 2;
      player.rank += 1;
      Player.UpdateCarsAtEnd(player.rank);
      player.update();
    };
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    form.Result(player.name,player.rank);
  }

  displayRanks (){
    camera.position.x = 0;
    camera.position.y = 0;

    Player.getPlayerInfo();

    textAlign(CENTER);
    textSize(50);
    fill("black");

    for (var plr in allPlayers ) {
       var element = allPlayers[plr];
       console.log(element)
     switch(element.rank) {
        case 1 : text('First Position : '+ element.name,0,150);
        break;

        case 2 : text('Second Position : '+ element.name,0,200);
        break;

        case 3 : text('Third Position : '+ element.name,0,250);
        break;
        
        case 4 : text('Consolation Position : '+ element.name,0,300);
        break;

        default:break;

      }
    }
  }

}
