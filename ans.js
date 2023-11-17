document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    let snake = [{ x: 0, y: 0 }];
    let food = generateFoodPosition();
    let direction = 'right';

    function drawSnake() {
        const snakeElements = document.querySelectorAll('.snake');
        snakeElements.forEach(element => element.remove());

        snake.forEach(segment => {
            const snakeSegment = document.createElement('div');
            snakeSegment.className = 'snake';
            snakeSegment.style.left = segment.x * 20 + 'px';
            snakeSegment.style.top = segment.y * 20 + 'px';
            gameBoard.appendChild(snakeSegment);
        });
    }

    function drawFood() {
        const foodElement = document.querySelector('.food');
        if (foodElement) foodElement.remove();

        const foodSegment = document.createElement('div');
        foodSegment.className = 'food';
        foodSegment.style.left = food.x * 20 + 'px';
        foodSegment.style.top = food.y * 20 + 'px';
        gameBoard.appendChild(foodSegment);
    }

    function generateFoodPosition() {
        const x = Math.floor(Math.random() * 15);
        const y = Math.floor(Math.random() * 15);
        return { x, y };
    }

    function updateGame() {
        // Move the snake
        const head = Object.assign({}, snake[0]);
        switch (direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }

        // Check for collisions with walls
        if (head.x < 0 || head.x >= 15 || head.y < 0 || head.y >= 15) {
            alert('Game Over!');
            resetGame();
            return;
        }

        // Check for collisions with itself
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                alert('Game Over!');
                resetGame();
                return;
            }
        }

        // Check for collisions with food
        if (head.x === food.x && head.y === food.y) {
            snake.unshift(food);
            food = generateFoodPosition();
            drawFood();
        } else {
            snake.pop();
        }

        snake.unshift(head);
        drawSnake();
    }

    function resetGame() {
        snake = [{ x: 0, y: 0 }];
        food = generateFoodPosition();
        direction = 'right';
        drawSnake();
        drawFood();
    }

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

    drawSnake();
    drawFood();
    setInterval(updateGame, 200);
});
