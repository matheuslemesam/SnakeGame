const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
let snake = [{ x: 200, y: 200 }];
let direction = "right";
let food = {
  x: Math.floor(Math.random() * (canvasSize / box)) * box,
  y: Math.floor(Math.random() * (canvasSize / box)) * box,
};

function drawGame() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // desenha a cobra
  snake.forEach((segment, i) => {
    ctx.fillStyle = i === 0 ? "#4caf50" : "#8bc34a";
    ctx.fillRect(segment.x, segment.y, box, box);
  });

  // desenha a comida
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // movimenta a cobra
  const head = { ...snake[0] };

  if (direction === "right") head.x += box;
  if (direction === "left") head.x -= box;
  if (direction === "up") head.y -= box;
  if (direction === "down") head.y += box;

  // colisão com parede
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvasSize ||
    head.y >= canvasSize ||
    snake.some((seg, i) => i !== 0 && seg.x === head.x && seg.y === head.y)
  ) {
    alert("Game Over!");
    snake = [{ x: 200, y: 200 }];
    direction = "right";
    food = {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box,
    };
    return;
  }

  snake.unshift(head);

  // se comer a comida
  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box,
    };
  } else {
    snake.pop();
  }
}

document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase(); // deixa minúsculo para comparar
  
    if ((key === "arrowup" || key === "w") && direction !== "down") {
      direction = "up";
    } else if ((key === "arrowdown" || key === "s") && direction !== "up") {
      direction = "down";
    } else if ((key === "arrowleft" || key === "a") && direction !== "right") {
      direction = "left";
    } else if ((key === "arrowright" || key === "d") && direction !== "left") {
      direction = "right";
    }
  });

setInterval(drawGame, 100);
