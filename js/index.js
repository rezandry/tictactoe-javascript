const player_x = "x"
const player_o = "o"
var size = getSizeBoardGame();

$(document).ready(function () {
  var count = 0;
  var o_win = 0;
  var x_win = 0;
  setBoardGame(size);
  addRow(size ** 2);

  $('#game li').click(function () {
    if (count == size ** 2) {
      alert('The game tie. Start a new game')
      count = resetGame()
    } else if ($(this).hasClass('disable')) {
      alert('Already selected')
    } else if (count % 2 == 0) {
      count++
      insertObject(this, player_o)
      if (hasWon(player_o)) {
        alert('O wins')
        count = resetGame();
        updateScore(player_o, ++o_win);
      }
    } else {
      count++
      insertObject(this, player_x)
      if (hasWon(player_x)) {
        alert('X wins')
        count = resetGame();
        updateScore(player_x, ++x_win);
      }
    }
  });
  $("#reset").click(function () {
    count = resetGame();
  });
});

function addRow(sizeBoard) {
  for (row = 0; row < sizeBoard; row++) {
    var li = document.createElement('li');
    li.setAttribute("id", row);
    li.setAttribute("class", "btn span1");
    li.innerHTML = "+";
    document.getElementById("game").appendChild(li);
  }
}

function resetGame() {
  $("#game li").text("+");
  $("#game li").removeClass('disable')
  $("#game li").removeClass('o')
  $("#game li").removeClass('x')
  $("#game li").removeClass('btn-primary')
  $("#game li").removeClass('btn-info')
  return 0
}

function hasWon(player) {
  return rowWin(player) || colWin(player) || diagonalWin(player) || reverseDiagonalWin(player);
}

function rowWin(player) {
  var win = false;
  for (x = 0; x < size; x++) {
    var eachWin = true;
    for (y = 0; y < size; y++) {
      currentId = y + (size * x)
      eachWin = eachWin && $("#" + currentId).hasClass(player);
    }
    win = win || eachWin
  }
  return win
}

function colWin(player) {
  var win = false;
  for (x = 0; x < size; x++) {
    var eachWin = true;
    for (y = 0; y < size; y++) {
      currentId = x + (size * y)
      eachWin = eachWin && $("#" + currentId).hasClass(player);
    }
    win = win || eachWin
  }
  return win
}

function diagonalWin(player) {
  var win = true;
  add = 0
  for (x = 0; x < size; x++) {
    currentId = (size * x) + add
    win = win && $("#" + currentId).hasClass(player);
    add++
  }
  return win
}

function reverseDiagonalWin(player) {
  var win = true;
  reduction = 1
  for (x = 0; x < size; x++) {
    currentId = ((size * x) + (size - reduction))
    win = win && $("#" + currentId).hasClass(player);
    reduction++
  }
  return win
}

function insertObject(state, player) {
  $(state).text(player)
  if (player == player_x) {
    $(state).addClass('disable x btn-info')
  } else if (player == player_o) {
    $(state).addClass('disable o btn-primary')
  }
}

function updateScore(player, score) {
  console.log(score)
  if (player == player_x) {
    $('#x_win').text(score)
  } else if (player == player_o) {
    $('#o_win').text(score)
  }
}

function setBoardGame(size) {
  document.getElementById("board-game").style.width = 80 * size + "px";
  document.getElementById("game").style.display = "block";
}

function getSizeBoardGame() {
  return prompt("Please enter your game board size", 3);
}