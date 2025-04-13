let gameContainer = document.querySelector(".game_container");
let scoreContainer = document.querySelector(".score_container");


let foodX,foodY;
let headX=12;
let headY=12;
let velocityX=0,velocityY=0;
let score=0;
let snakeBody = [];


function generateFood() {
    foodX=Math.floor((Math.random()*25)+1);
    foodY=Math.floor((Math.random()*25)+1);
    for(let i=0;i<snakeBody.length;i++) {
        if(snakeBody[i][0] == foodX && snakeBody[i][1] == foodY) {
            generateFood();  //This is for if the snake become big then the food will 
                             // not generate inside the snake.
        }  
    }
}

function gameOver() {
    headX=12;
    headY=12;
    generateFood();
    velocityX=0;
    velocityY=0;
    snakeBody =[];
    score =0;
    scoreContainer.innerHTML = "Score:" + score;
    alert("GAME OVER!!!");
}

function renderGame() {
    let upadtedGame=`<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`
    if(headX == foodX && headY == foodY) {
     snakeBody.push([foodX,foodY]);
     generateFood();
     score+=10;
     scoreContainer.innerHTML = "Score:" + score;
    }
    snakeBody.pop();
    headX+=velocityX;
    headY+=velocityY;
    snakeBody.unshift([headX,headY]);
    if(headX == 0 || headY == 0 || headX == 26 || headY == 26) {
        gameOver();
    }
   for(let i=1;i<snakeBody.length;i++) {
    if(snakeBody[0][0] == snakeBody[i][0] && snakeBody[0][1] == snakeBody[i][1]) {
        gameOver(); // this condition works when the body of snake hits itself then the game is Over.
    }
   }
    for(let i=0;i<snakeBody.length;i++) {
        upadtedGame+=`<div class="head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`
    }
    gameContainer.innerHTML = upadtedGame;
}

generateFood();
setInterval(renderGame,150);
if(score > 120){
    clearInterval(renderGame);
    setInterval(renderGame,90);
}
document.addEventListener("keydown",function(e){
    console.log(e.key);
    let key=e.key;
    if(key == "ArrowUp" && velocityY!=1) {
        velocityX=0;
        velocityY=-1;
    }else if(key == "ArrowDown" && velocityY!=-1) {
        velocityX=0;
        velocityY=1;
    }
        else if(key == "ArrowLeft" && velocityX!=1) {
            velocityY=0;
            velocityX=-1;
        }
    else if(key == "ArrowRight" && velocityX!=-1) {
        velocityY=0;
        velocityX=1;
    }
});

