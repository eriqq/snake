var d = "right";
document.addEventListener("keydown",function(e){
  if(e.keyCode == 37 && d!="right") d = "left"
  else if (e.keyCode == 38 && d!="down") d="up"
  else if (e.keyCode == 39 && d!="left") d="right"
  else if (e.keyCode == 40 && d!="up") d="down"
});

//loop
var now;
var then = Date.now();
var fps = 15;
var interval = 1000/fps;
var delta;
var scoreID = document.getElementById('score');
var levelID = document.getElementById('level');
var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');
var foodImg = new Image();
var snakeImg = new Image();
var snakeBodyImg = new Image();
foodImg.src = "applered.png";
var velX = 0;
var velY = 0;
var snakeX = 0;
var snakeY = 0;
var snakeSize = 32;
var box = 32;
var canvasSize = 640;
var snake;
var food;
var d = "";
var level = 1;
var score = 0;
var refreshInterval;
var drawModule = (function(){


var updateFaster = function(){

}
var update = function(){

  draw();

  snakeX = snake[0].x;
  snakeY = snake[0].y;

  // remove the tail

  if(d=="right") snakeX += snakeSize;
  if(d=="left") snakeX -= snakeSize;
  if(d=="up") snakeY -= snakeSize;
  if(d=="down") snakeY += snakeSize;

  if(food.x == snakeX && food.y ==snakeY){
    makeFood();
    score++;
  } else {
    snake.pop();
  }

  var newHead = { // add new head
    x: snakeX,
    y: snakeY
  }




  if(collision(newHead,snake) || wrapper(snakeX,snakeY)) {
    clearInterval(refreshInterval);
  }

  snake.unshift(newHead); // add head to array
}





var draw = function(){
  drawCanvas();
  drawSnake();
  drawFood();
  drawText();
}



var wrapper = function(x,y){
  if(x>canvasSize-snakeSize || x<0 || y<0 || y>canvasSize-snakeSize) return true
  return false;
}

var drawCanvas = function(){
  ctx.fillStyle = '#353535';
  ctx.fillRect(0,0,canvasSize,canvasSize);
}

var drawText = function(){
  if(score%10 == 0 && score != 0){
    level += 1;
    score += 1;
    for (var i = 0; i < 4; i++) {
      snake.pop();
    }
  }
  scoreID.innerHTML = "Score:"+score;
  levelID.innerHTML = "Level:"+level;
}

var makeFood = function(){
  food = {
    x:Math.floor(Math.random() * (19)) *box,
    y:Math.floor(Math.random() * (19)) *box,
  }
}

var drawSnake = function(){
  for (var i = 0; i < snake.length; i++) {
    ctx.fillStyle = "#38ed59";
    ctx.fillRect(snake[i].x,snake[i].y,snakeSize,snakeSize);
    ctx.strokeStyle = "#232323";
    ctx.strokeRect(snake[i].x,snake[i].y,snakeSize,snakeSize);
  }
}

var drawFood = function(){
  ctx.fillStyle = "#ef2f4c";
  ctx.fillRect(food.x,food.y, 32, 32);
}

var snakeBody = function(){
  snake = [];
  snake[0] = {x:9*snakeSize, y:10*snakeSize}; // position for first cell

}

var collision = function(head,arr){
  for (var i = 0; i < arr.length; i++) {
    if(arr[i].x == head.x && arr[i].y == head.y){
      return true;
    }
  }
  return false;
}


return{
  init:function(){
    snakeBody();
    makeFood();
    refreshInterval = setInterval(update,1000/fps);
  }

};

})();

drawModule.init();
