/**
 * LISTENER
 */

document.addEventListener("keydown", keyPush);


// canvas
const canvas = document.querySelector("canvas");
const h1 = document.querySelector('h1')
const ctx = canvas.getContext("2d");


let isGameRunning = true;

// player


let snakeSize = 50;
let snakeSpeed = snakeSize;

let tail = []


let snakePosX = 0
let snakePosY = canvas.height/2 ;

let velocityX = 1;
let velocityY = 0;

let foodPosX = 0;
let foodPosY = 0;

let snakeTail = 1;

const tileCountX = canvas.width / snakeSize;
const tileCountY = canvas.height / snakeSize;


let score = 0;

// loop

function gameLoop() {
    if(isGameRunning){
    drawStuff();
    moveStuff();
    setTimeout(gameLoop, 1000/15);
    }
}
gameLoop();

resetFood()

// DRAW EVERYTHING

function drawStuff () {

rectangle("#303030", 0, 0, canvas.width, canvas.height);

drawGrid();

//FOOD
rectangle("aqua", foodPosX, foodPosY, snakeSize, snakeSize);

tail.forEach( snakePart => 
    rectangle('#f8f', snakePart.x, snakePart.y, snakeSize, snakeSize))

rectangle("black", snakePosX, snakePosY, snakeSize, snakeSize);

}


// DRAW RECTANGLE
function rectangle(color, x, y, width, height) {

    ctx.fillStyle = color;
    ctx.fillRect (x, y, width, height)
}

//MOVE EVERYTHING

function moveStuff() {

    snakePosX += snakeSpeed * velocityX;
    snakePosY += snakeSpeed * velocityY;

//wall collision

    //RIGHT
    if (snakePosX > canvas.width - snakeSize ) {
        snakePosX = 0 
       
        }
          
    
   //LEFT
    if (snakePosX < 0 - snakeSize) {
        snakePosX = canvas.width
    }
    //BOTTOM
    if (snakePosY > canvas.height - snakeSize) {
        snakePosY = 0 
    }
    //TOP
    if (snakePosY < 0 - snakeSize) {
        snakePosY = canvas.height
    }

    tail.forEach( snakePart =>{
        if (snakePosX === snakePart.x && snakePosY === snakePart.y){
           
           h1.innerHTML = ` 💀💀<strong> ${score} </strong>  💀💀`;
           isGameRunning = false;
        }
    })


    //tail
    tail.push({ x: snakePosX, y: snakePosY})

    //forget earliest parts of snake

    tail = tail.slice(-1 * snakeTail);

  //food collision
  if (snakePosX === foodPosX && snakePosY === foodPosY){
   
    snakeTail++
    score++;
   h1.textContent = score
    resetFood()
 
  }

  

}


//random food poss


       //mobile
       function rightArrow(){
        if ( velocityX!== -1){
            velocityX = 1;
            velocityY = 0;
            }
           
       }
       function upArrow(){
        if ( velocityY !== 1){
            velocityX = 0;
            velocityY = -1;
            
            }
           
       }
     
       function downArrow(){
        if ( velocityY !== -1){
            velocityX = 0;
            velocityY = 1;
            }
           
       }
     
       function leftArrow(){
        if ( velocityX !== 1){
            velocityX = -1;
        velocityY = 0;
            }
           
       }
     
     

/**
 * KEYBOARD
 */
function keyPush(event){
    switch(event.key) {
        case "ArrowUp":
        if ( velocityY !== 1){
        velocityX = 0;
        velocityY = -1;
        upArrow();
        }
      
        break;

        case "ArrowLeft":
            if ( velocityX !== 1){
            velocityX = -1;
        velocityY = 0;
            }
            break;
         

        case "ArrowDown":
            if ( velocityY !== -1){
            velocityX = 0;
            velocityY = 1;
            }
        break;

     

        case "ArrowRight":
            if ( velocityX!== -1){
            velocityX = 1;
            velocityY = 0;
            }
        break;
    }
}

/** DRAW
 * GRID
 */ 
function drawGrid(){
    for (let i = 0; i < tileCountX ; i++ ){
        for (let j = 0; j < tileCountY ; j++ ){
    
        rectangle("#FFF", 
        snakeSize * i,
        snakeSize * j,
        snakeSize - 1,
        snakeSize - 1
        );
    }}
    }
    function resetFood(){

        foodPosX =  Math.floor(Math.random() * tileCountX) * snakeSize;
        foodPosY =  Math.floor(Math.random() * tileCountY) * snakeSize;

       
       }



