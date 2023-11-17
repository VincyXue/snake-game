let gameInterval;
let startBtn = document.querySelector('#startBtn');
let scores = document.querySelector('#scores');
let score = 1;
let showAwesome = [false, false, false, false];
let faces = ["😄","😱","😍","😢","😂","😣"];
let face = faces[0];

startBtn.addEventListener('click', ()=>{
    if (gameInterval) clearInterval(gameInterval);
    startGame();
});


let startGame = () => {
    const gameBoard = document.getElementById('game-board');
    let snakes = [{ x: 0, y: 0}];
    let food = generateFoodPosition();
    let direction = 'right';

    function drawSnake() {
        let oldSnake = document.querySelectorAll('.snake');
        oldSnake.forEach(ele => ele.remove());

        for (let ele of snakes){
            let snake = document.createElement('div');
            snake.innerHTML = face;
            snake.className = 'snake';
            snake.style.top = `${ele.x * 20}px`;
            snake.style.left = `${ele.y * 20}px`;
            gameBoard.appendChild(snake);
        }
    }

    function drawFood() {
        let oldFood = document.querySelector('.food');
        if (oldFood) oldFood.remove();

        let {x, y} = food;
        let newfood = document.createElement('div');
        newfood.innerHTML = "🍎";
        newfood.className = 'food';
        newfood.style.top = `${x * 20}px`;
        newfood.style.left = `${y * 20}px`;
        gameBoard.appendChild(newfood);
    }


    function generateFoodPosition() {
        let x = Math.floor(Math.random() * 25);
        let y = Math.floor(Math.random() * 25);
        return {x, y};
    }

    function updateGame() {
        // Move the snake
        let head  = Object.assign({}, snakes[0]);
        switch(direction) {
            case 'up':
                head.x--;
                break;
            case 'down':
                head.x++;
                break;
            case 'left':
                head.y--;
                break;
            case 'right':
                head.y++;
        }

        // Check for collisions with walls
        if (head.x >= 25 || head.y >=25 || head.x < 0 || head.y < 0){
            resetGame();
            return;
        }

        // Check for collisions with itself
        for (let i = 1; i < snakes.length; i++){
            if (head.x === snakes[i].x && head.y === snakes[i].y){
                resetGame();
                return;
            }
        }

        // Check for collisions with food
        if (head.x === food.x && head.y === food.y){
            score++;
            // snakes.unshift(food); //double increase the length of snake

            face = faces[Math.floor(Math.random()*faces.length)];
            food = generateFoodPosition();
            drawFood();
        }
        else {
            snakes.pop();
        }

        //show awesome if score is 5, 10, 15, 20
        if (!showAwesome[0] && score === 5){
            showAwesome[0] = true;
            alert("Keep trying! Learning is winning. You're getting better with every go—awesome job!");
        }
        if (!showAwesome[1] && score === 10){
            showAwesome[1] = true;
            alert("You're great! Challenges make you stronger. Keep it up—victory is just around the corner!");
        }
        if (!showAwesome[2] && score === 15){
            showAwesome[2] = true;
            alert("You're amazing! Big challenges, bigger wins. Show what you've got—keep being awesome!");
        }
        if (!showAwesome[3] && score === 20){
            showAwesome[3] = true;
            alert("You're a legend! Crush it! Harder challenges, but you're tougher. Keep shining and winning!");
        }


        //update socres
        scores.textContent =`Scores: ${score}`;
        snakes.unshift(head);
        drawSnake();
    }

    function resetGame() {
        alert ('Game Over');
        showAwesome = [false, false, false, false];
        snakes = [{x: 0, y:0}];
        score = 1;
        food = generateFoodPosition();
        direction = 'right';
        gameInterval = clearInterval(gameInterval);
    }

    document.addEventListener('keydown', (event) => {
        switch(event.keyCode){
            case 37:
                direction = 'left';
                break;
            case 38:
                direction = 'up';
                break;
            case 39:
                direction = 'right';
                break;
            case 40:
                direction = 'down';
                break;
            default:
                break;
        }
    });

    drawSnake();
    drawFood();
    gameInterval = setInterval(updateGame, 200);
}
