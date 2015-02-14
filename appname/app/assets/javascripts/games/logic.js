turn = 0;
score = [[-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1]];
whereInColumn = [0,0,0,0,0,0,0];
function nextTurn(){
    turn++;
    turn %= 2;
    $("#header").html("Player " + (turn+1) + "'s turn.");
    checkIfNoOneWins();
    checkIfWin();
}

function win(n){
    var winner = score[n[0][0]][n[0][1]];
    $("#header").html("Player " + (winner+1) + " wins.");
    for(var i = 0; i < 6; i++){
      for(var j = 0; j < 7; j++){
        var id = "row"+i+"column"+j;
        var changeButton = document.getElementById(id);
        changeButton.disabled=true;
        changeButton.style.opacity=".2";
        for(var k = 0; k < n.length; k++){
          if(i == n[k][0] && j == n[k][1]){
            changeButton.style.opacity="1.0";
          }
        }
      }
    }
}

function checkIfNoOneWins(){
    var count = 0;
    for(var i = 0; i < score.length; i++){
      for(var j = 0; j < score[i].length; j++){
        if(score[i][j] == -1)
          count++;
      }
    }
    if(count == 0){
      $("#header").html("No one wins.");
      for(var i = 0; i < 6; i++){
        for(var j = 0; j < 7; j++){
          var id = "row"+i+"column"+j;
          var changeButton = document.getElementById(id);
          changeButton.disabled=true;
        }
      }
    }
}

function checkIfWin(){
    for(var i = 0; i < score.length; i++){
      for(var j = 0; j < score[i].length; j++){
        if(j+3 < score[i].length && score[i][j] != -1 && score[i][j] == score[i][j+1] && score[i][j+1] == score[i][j+2] && score[i][j+2] == score[i][j+3]){
          win([[i,j], [i,j+1], [i,j+2], [i,j+3]]);//console.log("ROW");
        }
        if(i+3 < score.length && score[i][j] != -1 && score[i][j] == score[i+1][j] && score[i+1][j] == score[i+2][j] && score[i+2][j] == score[i+3][j]){
          win([[i,j], [i+1,j], [i+2,j], [i+3,j]]);//console.log("COLUMN");
        }
        if(j+3 < score[i].length && i+3 < score.length && score[i][j] != -1 && score[i][j] == score[i+1][j+1] && score[i+1][j+1] == score[i+2][j+2] && score[i+2][j+2] == score[i+3][j+3]){
          win([[i,j], [i+1,j+1], [i+2,j+2], [i+3,j+3]]);//console.log("DIAGONAL UP RIGHT")
        }
        if(j+3 < score[i].length && i-3 >= 0 && score[i][j] != -1 && score[i][j] == score[i-1][j+1] && score[i-1][j+1] == score[i-2][j+2] && score[i-2][j+2] == score[i-3][j+3]){
          win([[i,j], [i-1,j+1], [i-2,j+2], [i-3,j+3]]);//console.log("DIAGONAL DOWN RIGHT")
        }
      }
    }
}

function restart(){
    turn = 0;
    whereInColumn = [0,0,0,0,0,0,0];
    score = [[-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1]];
    $("#header").html("Player " + (turn+1) + "'s turn.");
    for(var i = 0; i < 6; i++){
      for(var j = 0; j < 7; j++){
        var id = "row"+i+"column"+j;
        var changeButton = document.getElementById(id);
        changeButton.style.backgroundColor = "orange";
        changeButton.style.borderColor = "grey";
        changeButton.disabled=false;
        changeButton.style.opacity = "1.0";
      }
    }
}

$(document).ready(
	function(){
        document.getElementById("start").addEventListener('click', restart);
        table = document.getElementById("table");
        for(var i = 5; i >= 0; i--){
            for(var j = 0; j < 7; j++){
              var btn = document.createElement('button');
              var id = "row"+i+"column"+j;
              btn.id = id;
              btn.className = "circle";
              btn.addEventListener('click',function(x){return function(e){
                if(whereInColumn[x] < 6){
                  if(turn == 0){
                    var color = "#00d8ff";
                  }else{
                    var color = "#a500c3";
                  }
                  var get = "row"+whereInColumn[x]+"column"+x;
                  var changeButton = document.getElementById(get);
                  changeButton.style.backgroundColor = color;
                  changeButton.style.borderColor = color;
                  score[whereInColumn[x]][x] = turn;
                  whereInColumn[x]++;
                  nextTurn();
                }
              }}(j));
              table.appendChild(btn);
            }
        table.appendChild(document.createElement("br"));
        }
	}
);