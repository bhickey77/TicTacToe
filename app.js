/*==============
app object
===============*/

var APP = APP || {
  // initialize array of squares
  initializeSquares: function(){
    APP.squares = [];
    for(var i = 0; i < 9; i++){
      APP.squares.push({charInside: i});
    }
  },

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
    this.initializeSquares();
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
          setTimeout(function(){
            if(APP.currentPlayer == APP.p2){
              APP.computerMove();
            }
          }, (Math.random()*1000 + 1000));
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
  if(APP.checkWinningMoves() !== undefined){
    APP.squares[APP.checkWinningMoves()].elementIs.click();
    return;
  }
  if(APP.checkLosingMoves() !== undefined){
    APP.squares[APP.checkLosingMoves()].elementIs.click();
    return;
  }
  // APP.determineNonWinOrLoseMove();
  if(APP.totalMoves == 1){
    if(!APP.squares[4].played){
      APP.squares[4].elementIs.click();
      return;
    } else {
      APP.squares[0].elementIs.click();
      return;
    }
  }

  if(APP.totalMoves == 3){
    if(APP.squares[4].charInside == APP.p2){
      if(!APP.squares[1].played){
        APP.squares[1].elementIs.click();
        return;
      }
      if(!APP.squares[3].played){
        APP.squares[3].elementIs.click();
        return;
      }
      if(!APP.squares[5].played){
        APP.squares[5].elementIs.click();
        return;
      }
      if(!APP.squares[7].played){
        APP.squares[7].elementIs.click();
        return;
      }
    }
    if(APP.squares[4].charInside == APP.p1){
      if(!APP.squares[0].played){
        APP.squares[0].elementIs.click();
        return;
      }
      if(!APP.squares[2].played){
        APP.squares[2].elementIs.click();
        return;
      }
      if(!APP.squares[6].played){
        APP.squares[6].elementIs.click();
        return;
      }
      if(!APP.squares[8].played){
        APP.squares[8].elementIs.click();
        return;
      }
    }
  }
  APP.squares[APP.randomMove()].elementIs.click();
},

checkWinningMoves: function(){
  var move;
  APP.winningCombos.some(function(combo){
    if(APP.squares[combo[0]].charInside == APP.squares[combo[1]].charInside && !APP.squares[combo[2]].played && APP.squares[combo[0]].charInside == APP.p2){
      move = combo[2];
    }
    if(APP.squares[combo[0]].charInside == APP.squares[combo[2]].charInside && !APP.squares[combo[1]].played && APP.squares[combo[0]].charInside == APP.p2){
      move = combo[1];
    }
    if(APP.squares[combo[1]].charInside == APP.squares[combo[2]].charInside && !APP.squares[combo[0]].played && APP.squares[combo[1]].charInside == APP.p2){
      move = combo[0];
    }
  });
  return move;
},

checkLosingMoves: function(){
  var move;
  APP.winningCombos.some(function(combo){
    if(APP.squares[combo[0]].charInside == APP.squares[combo[1]].charInside && !APP.squares[combo[2]].played && APP.squares[combo[0]].charInside == APP.p1){
      move = combo[2];
    }
    if(APP.squares[combo[0]].charInside == APP.squares[combo[2]].charInside && !APP.squares[combo[1]].played && APP.squares[combo[0]].charInside == APP.p1){
      move = combo[1];
    }
    if(APP.squares[combo[1]].charInside == APP.squares[combo[2]].charInside && !APP.squares[combo[0]].played && APP.squares[combo[1]].charInside == APP.p1){
      move = combo[0];
    }
  });
  return move;
}

};

$(document).ready(function(){
  APP.initApp();
});
