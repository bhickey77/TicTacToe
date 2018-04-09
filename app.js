/*==============
app object
===============*/

var APP = APP || {
  // initialize array of squares
  squares: [
    {
      id: 1,
      col: 1,
      row: 1,
      played: false,
      playedBy: "",
      //char inside might be used if there are custom player characters in the future
      charInside: "0",
      elementIs: $("#1a")
    },
    {
      id: 2,
      col: 2,
      row: 1,
      played: false,
      playedBy: "",
      charInside: "1",
      elementIs: $("#1b")
    },
    {
      id: 3,
      col: 3,
      row: 1,
      played: false,
      playedBy: "",
      charInside: "2",
      elementIs: $("#1c")
    },
    {
      id: 4,
      col: 1,
      row: 2,
      played: false,
      playedBy: "",
      charInside: "3",
      elementIs: $("#2a")
    },
    {
      id: 5,
      col: 2,
      row: 2,
      played: false,
      playedBy: "",
      charInside: "4",
      elementIs: $("#2b")
    },
    {
      id: 6,
      col: 3,
      row: 2,
      played: false,
      playedBy: "",
      charInside: "5",
      elementIs: $("#2c")
    },
    {
      id: 7,
      col: 1,
      row: 3,
      played: false,
      playedBy: "",
      charInside: "6",
      elementIs: $("#3a")
    },
    {
      id: 8,
      col: 2,
      row: 3,
      played: false,
      playedBy: "",
      charInside: "7",
      elementIs: $("#3b")
    },
    {
      id: 9,
      col: 3,
      row: 3,
      played: false,
      playedBy: "",
      charInside: "8",
      elementIs: $("#3c")
    },
  ],
  totalMoves: 0,
  numHumans: 0,
  p1: "X",
  p2: "O",
  currentPlayer: "X",
  winningCombos: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [0, 3, 6],
    [2, 5, 8],
  ],

  initApp: function(){
    this.addSelectorsToAppObject();
    this.applyListeners();
    // this.promptNumHumans();
    // request type of game (one human or two humans)
    // request characters for each player X or O
    // prompt start
    // apply onclicks
  },
  addSelectorsToAppObject: function(){
    // to set elements to the squares array after HTML rendering
    for(var i = 0; i < APP.squares.length; i++){
      APP.squares[i].elementIs = $("td:eq("+i+")");
    }
  },

  applyListeners: function(){
    for(let i = 0; i < this.squares.length; i++){
      this.squares[i].elementIs.click(function(){
        if(!APP.squares[i].played){
          APP.squares[i].playedBy = APP.currentPlayer;
          APP.squares[i].charInside = APP.currentPlayer;
          APP.squares[i].elementIs.text(APP.currentPlayer);
          APP.squares[i].elementIs.addClass("x");
          APP.totalMoves++;
          if(APP.checkWinner()){
            $("h2").text(APP.currentPlayer + " won!");
            APP.endGame();
            return;
          }
          if(APP.totalMoves == 9){
            $("h2").text("Draw!");
            return;
          }
          APP.currentPlayer = (APP.currentPlayer == APP.p1) ? APP.p2 : APP.p1;
          APP.squares[i].played = true;
          // add class to make text visible;
          if(APP.currentPlayer == APP.p2){
            APP.computerMove();
          }
        }
      });
    }
  },

  promptNumHumans: function(){
    this.numHumans = Number(prompt("how many players?"));
  },

  checkWinner: function(){
    var winner = false;
    APP.winningCombos.some(function(combo){
      winner = APP.squares[combo[0]].charInside == APP.squares[combo[1]].charInside && APP.squares[combo[1]].charInside == APP.squares[combo[2]].charInside;
      if(winner){return winner;};
    });
    return winner;
  },

  endGame: function(){
    APP.squares.forEach(function(square){
      square.played = true;
    });
  },

  /* ================
    COMPUTER PLAYER
  =================*/

randomMove: function(){
    var randSquare = Math.floor(Math.random() * 9);
    if(!APP.squares[randSquare].played){
      return randSquare;
    }
    return APP.randomMove();
},

computerMove: function(){
  APP.squares[APP.randomMove()].elementIs.click();
  // if(APP.checkWinningMoves()){
  //   return APP.checkWinningMoves();
  // }
  // if(APP.checkLosingMoves()){
  //   return APP.checkLosingMoves();
  // }
  // APP.determineNonWinOrLoseMove();
},

checkWinningMoves: function(){
  APP.winningCombos.some(function(combo){
    if(APP.squares[combo[0]].charInside == APP.squares[combo[1]].charInside && !APP.squares[combo[2]].played && APP.squares[combo[0]].charInside == APP.p2){
      return APP.squares[combo[2]];
    }
    if(APP.squares[combo[0]].charInside == APP.squares[combo[2]].charInside && !APP.squares[combo[1]].played && APP.squares[combo[0]].charInside == APP.p2){
      return APP.squares[combo[1]];
    }
    if(APP.squares[combo[1]].charInside == APP.squares[combo[2]].charInside && !APP.squares[combo[0]].played && APP.squares[combo[1]].charInside == APP.p2){
      return APP.squares[combo[0]];
    }
  });
  return false;
},

checkLosingMoves: function(){
  APP.winningCombos.some(function(combo){
    if(APP.squares[combo[0]].charInside == APP.squares[combo[1]].charInside && !APP.squares[combo[2]].played && APP.squares[combo[0]].charInside == APP.p1){
      return APP.squares[combo[2]];
    }
    if(APP.squares[combo[0]].charInside == APP.squares[combo[2]].charInside && !APP.squares[combo[1]].played && APP.squares[combo[0]].charInside == APP.p1){
      return APP.squares[combo[1]];
    }
    if(APP.squares[combo[1]].charInside == APP.squares[combo[2]].charInside && !APP.squares[combo[0]].played && APP.squares[combo[1]].charInside == APP.p1){
      return APP.squares[combo[0]];
    }
  });
  return false;
}

};

$(document).ready(function(){
  APP.initApp();
});
