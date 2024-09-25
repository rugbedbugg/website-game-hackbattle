// Import necessary libraries
import React, { useState, useEffect, useRef } from 'react';

const FlappyBird = () => {
    const boardWidth = 360;
    const boardHeight = 640;

    // Images
    const backgroundImg = new Image();
    backgroundImg.src = './flappybirdbg.png';
    const birdImg = new Image();
    birdImg.src = './flappybird.png';
    const topPipeImg = new Image();
    topPipeImg.src = './toppipe.png';
    const bottomPipeImg = new Image();
    bottomPipeImg.src = './bottompipe.png';

    // Bird
    const birdX = boardWidth / 8;
    const birdY = boardHeight / 2;
    const birdWidth = 34;
    const birdHeight = 24;

    class Bird {
        constructor(img) {
            this.x = birdX;
            this.y = birdY;
            this.width = birdWidth;
            this.height = birdHeight;
            this.img = img;
        }
    }

    // Pipes
    const pipeX = boardWidth;
    const pipeY = 0;
    const pipeWidth = 64;
    const pipeHeight = 512;

    class Pipe {
        constructor(img) {
            this.x = pipeX;
            this.y = pipeY;
            this.height = pipeHeight;
            this.width = pipeWidth;
            this.img = img;
            this.passed = false;
        }
    }

    // Game logic
    const [bird, setBird] = useState(new Bird(birdImg));
    const [pipes, setPipes] = useState([]);
    const [velocityX] = useState(-4);
    const [velocityY, setVelocityY] = useState(0);
    const [gravity] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const gameLoop = setInterval(() => {
            move();
            draw(ctx);
        }, 1000 / 60);

        const placePipesTimer = setInterval(placePipes, 1500);

        return () => {
            clearInterval(gameLoop);
            clearInterval(placePipesTimer);
        };
    }, []);

    const placePipes = () => {
        const randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
        const openingSpace = boardHeight / 4;

        const topPipe = new Pipe(topPipeImg);
        topPipe.y = randomPipeY;

        const bottomPipe = new Pipe(bottomPipeImg);
        bottomPipe.y = topPipe.y + pipeHeight + openingSpace;

        setPipes(prevPipes => [...prevPipes, topPipe, bottomPipe]);
    };

    const draw = (ctx) => {
        ctx.drawImage(backgroundImg, 0, 0, boardWidth, boardHeight);
        ctx.drawImage(bird.img, bird.x, bird.y, bird.width, bird.height);

        pipes.forEach(pipe => {
            ctx.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
        });

        ctx.fillStyle = 'white';
        ctx.font = '32px Arial';
        if (gameOver) {
            ctx.fillText(`Game Over: ${Math.floor(score)}`, 10, 35);
        } else {
            ctx.fillText(Math.floor(score), 10, 35);
        }
    };

    const collision = (a, b) => {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    };

    const move = () => {
        setVelocityY(prevVelocityY => prevVelocityY + gravity);
        setBird(prevBird => ({
            ...prevBird,
            y: Math.max(prevBird.y + velocityY, 0)
        }));

        setPipes(prevPipes => prevPipes.map(pipe => {
            pipe.x += velocityX;

            if (!pipe.passed && bird.x > pipe.x + pipe.width) {
                pipe.passed = true;
                setScore(prevScore => prevScore + 0.5);
            }

            if (collision(bird, pipe)) {
                setGameOver(true);
            }

            return pipe;
        }));

        if (bird.y > boardHeight) {
            setGameOver(true);
        }
    };

    const handleKeyPress = (e) => {
        if (e.code === 'Space') {
            setVelocityY(-9);
            if (gameOver) {
                setBird(new Bird(birdImg));
                setVelocityY(0);
                setPipes([]);
                setScore(0);
                setGameOver(false);
            }
        }
    };

    return (
        <canvas
            ref={canvasRef}
            width={boardWidth}
            height={boardHeight}
            tabIndex="0"
            onKeyDown={handleKeyPress}
        />
    );
};

export default FlappyBird;

