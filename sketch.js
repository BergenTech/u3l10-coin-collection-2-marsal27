// Game variables 
let playerX, playerY;
let coinX, coinY;
let obstacleX, obstacleY;
let score = 0;
let gameOver = false;
let obstacleSpeed = 3
let coinCollected=false
let obstacleHits =0

function setup() {
  createCanvas(400, 400);
  initializeGame();
}

function initializeGame() {
  // Initialize player position (bottom center)
  playerX = width/2;
  playerY = height - 20;
  
  // Initialize coin position
  newCoin();
  
  // Initialize obstacle position
  obstacleX = random(0,width);
  // obstacleY = random(20, height-20);
  obstacleY=0
}

function draw() {
  background(220);
  
  if (gameOver) {
    displayGameOver();
  } else {
    // Draw game elements
    drawPlayer();
    drawCoin();
    drawObstacle();
    
    // Handle movement
    movePlayer();
    moveObstacle();
    
    // Check for collisions
    checkCoinCollection();
    checkCollisions();
    
    // Display game stats
    displayStats();
  }
}

function drawPlayer() {
  fill(0, 0, 255);  // Blue player
  circle(playerX, playerY, 20);
}

function drawCoin() {
  if(!coinCollected){
    fill(255, 255, 0);  // Yellow coin
    circle(coinX, coinY, 10);
  }
}

function drawObstacle() {
  fill(255, 0, 0);  // Red obstacle
  rect(obstacleX, obstacleY, 20, 20);
}

// Basic left/right movement provided
function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) {
    playerX -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerX += 5;
  }
  
  // TODO: Add up/down movement
  // HINT: Use UP_ARROW and DOWN_ARROW keys
  // Movement should be 5 pixels per frame
  if(keyIsDown(UP_ARROW)){
    playerY-=5
  }
  if(keyIsDown(DOWN_ARROW)){
    playerY+=5
  }
  // TODO: Add boundary checking
  // HINT: Keep player within canvas bounds
  // Check against 0, width, and height
  
}

function moveObstacle() {
  // TODO: Move obstacle from left to right
  // HINT: Increase obstacleX by obstacleSpeed
  obstacleY+=obstacleSpeed
  if(obstacleY>height){
    obstacleY=0
  }
  // TODO: Reset obstacle when it goes off screen
  // HINT: Check if obstacleX > width
  // Reset to left side and new random Y position
}

function checkCoinCollection() {
  // TODO: Check if player touches coin
  // HINT: Use dist(playerX, playerY, coinX, coinY)
  // If distance < 15:
  //   - Increase score
  //   - Create new coin
  //   - Increase obstacle speed slightly
  if(dist(playerX,playerY,coinX,coinY)<=20){
    initializeGame()
    obstacleSpeed+=0.5
    score+=1
  }
}

function checkCollisions() {
  // TODO: Check if player hits obstacle
  // HINT: Similar to coin collection
  // If hit (distance < 20):
  //   - Increase hits
  //   - Check for game over (hits >= 3)
  //   - Reset positions
  if(dist(playerX,playerY,obstacleX,obstacleY)<20){
    obstacleHits=obstacleHits+1
    initializeGame()
  }
  if (obstacleHits>=3){
    gameOver = true
    resetGame()
    displayGameOver()
  }
}

function displayStats() {
  fill(0);
  textSize(16);
  text("Score: " + score, 10, 20);
  text("Hits: " + obstacleHits, 150, 20);
  text("Speed: " + obstacleSpeed, 290, 20);
  // TODO: Add display for hits and speed
}

function displayGameOver() {
  // TODO: Show game over screen
  // HINT: Use textAlign(CENTER, CENTER)
  // Show:
  //   - "Game Over" message
  //   - Final score
  //   - "Press R to Restart"
  textAlign(CENTER,CENTER)
  textSize(45)
  text("GAME OVER", width/2,height/2)
  textSize(25)
  text("Final score: " + score, width/2,height/2+50)
  text(`Press "R" to restart`)
  resetGame()
}

function newCoin() {
  // Generate random position for coin
  coinX = random(20, width-20);
  coinY = random(20, height-20);
}

function resetGame() {
  // TODO: Reset all game variables
  // HINT: Reset score, hits, speed
  // Set gameOver to false
  // Call initializeGame()
  if(gameOver){
    score=0
    obstacleHits=0
    obstacleSpeed=3
    gameOver=false
    initializeGame()
  }
}

function keyPressed() {
  // TODO: Check for 'R' key to restart game
  // HINT: Use key === 'r' || key === 'R'
  // Only works when game is over
  if (key === 'r' || key === 'R'){
    if(gameOver){
      resetGame()
    }
  }
}

// Helper function you might need
function distance(x1, y1, x2, y2) {
  return dist(x1, y1, x2, y2);
}

// function resetScreen(){
//   if (obstacleHits>=3){
//     textSize(45)
//     text("GAME OVER",width/2,height/2)
//   }
// }