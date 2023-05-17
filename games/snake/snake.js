// Initialize the canvas and game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 10;
let snake = [{ x: 10, y: 10 }];
let food = {};
let direction = 'right';
let score = 0;

// Create the initial food location
createFood();

// Add an event listener for arrow keys to change the direction of the snake
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
  }
});



 // Add an event listener for the "Start game" button
 const startButton = document.getElementById('startButton');
 startButton.addEventListener('click', () => {
   startButton.style.display = 'none';
   gameLoop = setInterval(() => {
     // Move the snake in the current direction
     const head = snake[0];
     let x = head.x;
     let y = head.y;

     switch (direction) {
       case 'up':
         y -= gridSize;
         break;
       case 'down':
         y += gridSize;
         break;
       case 'left':
         x -= gridSize;
         break;
       case 'right':
         x += gridSize;
         break;
     }
    });

  // Check if the snake has collided with the edge of the canvas
  if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
    endGame();
    return;
  }

  // Check if the snake has collided with itself
  if (snake.some(segment => segment.x === x && segment.y === y)) {
    endGame();
    return;
  }

  // Check if the snake has collided with the food
  if (x === food.x && y === food.y) {
    // Add a new segment to the snake and create a new food location
    snake.unshift({ x, y });
    createFood();
    score++;
  } else {
    // Remove the last segment of the snake and add a new segment at the front
    snake.pop();
    snake.unshift({ x, y });
  }

  // Clear the canvas and redraw the snake and food
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
  ctx.fillStyle = '#f00';
  ctx.fillRect(food.x, food.y, gridSize, gridSize);

  // Update the score on the page
  document.getElementById('score').textContent = `Score: ${score}`;
}, 100);

function createFood() {
  // Generate a random location for the food that is not on the snake
  let x, y;
  do {
    x = Math.floor(Math.random() * canvas.width / gridSize) * gridSize;
    y = Math.floor(Math.random() * canvas.height / gridSize) * gridSize;
  } while (snake.some(segment => segment.x === x && segment.y === y));
  food.x = x;
  food.y = y;
}

function endGame() {
  // Stop the game loop and display a game over message
  clearInterval(gameLoop);
  alert(`Game over! Your score was ${score}.`);
}


