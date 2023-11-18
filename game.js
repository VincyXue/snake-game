let gameInterval;
let startBtn = document.querySelector('#startBtn');

startBtn.addEventListener('click', ()=>{
    if (gameInterval) clearInterval(gameInterval);
    let oldBarriers = document.querySelectorAll('.barriersEle');
    oldBarriers.forEach(ele => ele.remove());
    startGame();
});


let startGame = () => {
    const gameBoard = document.getElementById('game-board');
    let direction = 'right';
    let scores = document.querySelector('#scores'), score = 1;
    let faces = ["😄","😱","😍","😢","😂","😣"], face = faces[0];
    let showAwesome = [false, false, false, false];
    let snakes = [{ x: 0, y: 0}];
    let food = generateFoodPosition();
    let barriers = [generateBarriers()];
    let reason;

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

    function drawBarriers(){
        let {x, y} = barriers[barriers.length - 1];
        let barrEle = document.createElement('div');
        barrEle.innerHTML = "🍄";
        barrEle.className = 'barriersEle';
        barrEle.style.top = `${x * 20}px`;
        barrEle.style.left = `${y * 20}px`;
        // if (score >= 2 && score <= 5) {
        //     barrEle.style.width = '20px';
        //     barrEle.style.height = '20px';
        // }
        // else if (score > 5){
        //     barrEle.style.width = '50px';
        //     barrEle.style.height = '50px';
        // }
        gameBoard.appendChild(barrEle);
    }

    function generateBarriers(){
        let xLen = 20, yLen = 20;
        // if (score >= 2 && score <= 5){
        //     xLen = 20;
        //     yLen = 20;
        // }
        // else if (score > 5){
        //     xLen = 10;
        //     yLen = 10;
        // }
        let x = Math.floor(Math.random() * xLen);
        let y = Math.floor(Math.random() * yLen);
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
            reason = "You hit the wall!"
            resetGame();
            return;
        }

        // Check for collisions with itself
        for (let i = 1; i < snakes.length; i++){
            if (head.x === snakes[i].x && head.y === snakes[i].y){
                reason = "You eat yourself!"
                resetGame();
                return;
            }
        }

        // Check for collisions with food
        if (head.x === food.x && head.y === food.y){
            score++;
            face = faces[Math.floor(Math.random()*faces.length)];
            food = generateFoodPosition();
            drawFood();
            barriers.push(generateBarriers());
            drawBarriers();
        }
        else {
            snakes.pop();
        }

        // Check for hitting barriers
        for (let ele of barriers) {
            if (head.x === ele.x && head.y === ele.y){
                reason = "You hit barriers!"
                resetGame();
                return;
            }
        }

        //show awesome if score is 5, 10, 15, 20

        if (!showAwesome[0] && score === 5){
            showAwesome[0] = true;
            alert("Great! You got 5 points!");
        }
        if (!showAwesome[1] && score === 10){
            showAwesome[1] = true;
            alert("10 point!? Can't believe it! More challenges are coming!");
        }
        if (!showAwesome[2] && score === 15){
            showAwesome[2] = true;
            alert("You're amazing! Big challenges, bigger wins. Show what you've got—keep being awesome!");
        }
        if (!showAwesome[3] && score === 20){
            showAwesome[3] = true;
            alert("You're a legend! Crush it! Harder challenges, but you're tougher. Keep shining and winning!");
        }

        //update socres and snake body;
        scores.textContent =`Scores: ${score}`;
        snakes.unshift(head);
        drawSnake();
    }

    function resetGame() {
        alert (`${reason} Game Over.`);
        showAwesome = [false, false, false, false];
        snakes = [{x: 0, y:0}];
        score = 1;
        food = generateFoodPosition();
        direction = 'right';
        barriers = [generateBarriers()];
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
    drawBarriers();
    gameInterval = setInterval(updateGame, 200);
}
