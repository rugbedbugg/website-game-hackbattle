// Note: This JavaScript version uses HTML5 Canvas instead of Swing
// You'll need to set up an HTML file with a canvas element to run this

class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class SnakeGame {
    constructor(boardWidth, boardHeight) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.tileSize = 25;

        // Snake
        this.snakeHead = new Tile(5, 5);
        this.snakeBody = [];

        // Food
        this.food = new Tile(10, 10);

        // Game Logic
        this.velocityX = 0;
        this.velocityY = 0;
        this.gameOver = false;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.boardWidth;
        this.canvas.height = this.boardHeight;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.placeFood();

        document.addEventListener('keydown', this.keyPressed.bind(this));
        this.gameLoop = setInterval(this.update.bind(this), 100);
    }

    draw() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.boardWidth, this.boardHeight);

        // Food
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.food.x * this.tileSize, this.food.y * this.tileSize, this.tileSize, this.tileSize);

        // Snake Head
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(this.snakeHead.x * this.tileSize, this.snakeHead.y * this.tileSize, this.tileSize, this.tileSize);

        // Snake Body
        for (let snakePart of this.snakeBody) {
            this.ctx.fillRect(snakePart.x * this.tileSize, snakePart.y * this.tileSize, this.tileSize, this.tileSize);
        }

        // Score
        this.ctx.fillStyle = 'white';
        this.ctx.font = '16px Arial';
        if (this.gameOver) {
            this.ctx.fillStyle = 'red';
            this.ctx.fillText(`Game Over: ${this.snakeBody.length}`, this.tileSize - 16, this.tileSize);
        } else {
            this.ctx.fillText(`Score: ${this.snakeBody.length}`, this.tileSize - 16, this.tileSize);
        }
    }

    placeFood() {
        this.food.x = Math.floor(Math.random() * (this.boardWidth / this.tileSize));
        this.food.y = Math.floor(Math.random() * (this.boardHeight / this.tileSize));
    }

    collision(tile1, tile2) {
        return tile1.x === tile2.x && tile1.y === tile2.y;
    }

    move() {
        // Eat food
        if (this.collision(this.snakeHead, this.food)) {
            this.snakeBody.push(new Tile(this.food.x, this.food.y));
            this.placeFood();
        }

        // Snake Body
        for (let i = this.snakeBody.length - 1; i >= 0; i--) {
            const snakePart = this.snakeBody[i];
            if (i === 0) {
                snakePart.x = this.snakeHead.x;
                snakePart.y = this.snakeHead.y;
            } else {
                const prevSnakePart = this.snakeBody[i - 1];
                snakePart.x = prevSnakePart.x;
                snakePart.y = prevSnakePart.y;
            }
        }

        // Snake Head
        this.snakeHead.x += this.velocityX;
        this.snakeHead.y += this.velocityY;

        // Game over conditions
        for (let snakePart of this.snakeBody) {
            if (this.collision(this.snakeHead, snakePart)) {
                this.gameOver = true;
            }
        }

        if (
            this.snakeHead.x * this.tileSize < 0 ||
            this.snakeHead.x * this.tileSize >= this.boardWidth ||
            this.snakeHead.y * this.tileSize < 0 ||
            this.snakeHead.y * this.tileSize >= this.boardHeight
        ) {
            this.gameOver = true;
        }
    }

    update() {
        this.move();
        this.draw();

        if (this.gameOver) {
            clearInterval(this.gameLoop);
        }
    }

    keyPressed(e) {
        switch (e.key) {
            case 'ArrowUp':
                if (this.velocityY !== 1) {
                    this.velocityX = 0;
                    this.velocityY = -1;
                }
                break;
            case 'ArrowDown':
                if (this.velocityY !== -1) {
                    this.velocityX = 0;
                    this.velocityY = 1;
                }
                break;
            case 'ArrowLeft':
                if (this.velocityX !== 1) {
                    this.velocityX = -1;
                    this.velocityY = 0;
                }
                break;
            case 'ArrowRight':
                if (this.velocityX !== -1) {
                    this.velocityX = 1;
                    this.velocityY = 0;
                }
                break;
        }
    }
}

// Usage:
// const game = new SnakeGame(400, 400);

