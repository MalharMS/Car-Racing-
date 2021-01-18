class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = 0;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      rank:this.rank
    });
  };

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  };

  removePlayers(){
    var ref = database.ref('players');
    ref.remove();
    for (let index = 1; index < 12; index++) {
      var Playerindex = 'player' + index
      database.ref(Playerindex).remove();
    }
  };

  getCarsAtEnd (){
    var Carref = database.ref('carsAtEnd');
    Carref.on("value",(data)=>{
      this.rank = data.val();
    })
  };

 static UpdateCarsAtEnd (rank){
    database.ref('/').update({
      carsAtEnd:rank
    })
  };

};
