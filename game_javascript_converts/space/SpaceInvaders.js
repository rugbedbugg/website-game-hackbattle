import { useEffect, useRef, useState } from 'react';

const SpaceInvaders = () => {
    class Block {
        constructor(x, y, width, height, img) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.img = img;
            this.alive = true; // used for aliens
            this.used = false; // used for bullets
        }
    }

    //board
    const tileSize = 32;
    const rows = 16;
    const columns = 16;
    const boardWidth = tileSize * columns; //32*16
    const boardHeight = tileSize * rows;

    const [shipImg, setShipImg] = useState(null);
    const [alienImgArray, setAlienImgArray] = useState([]);
    const [alienArray, setAlienArray] = useState([]);
    const [bulletArray, setBulletArray] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const canvasRef = useRef(null);
    const shipWidth = tileSize * 2; //64px
    const shipHeight = tileSize;  //32px
    const shipX = tileSize * columns / 2 - tileSize;
    const shipY = boardHeight - tileSize * 2;
    const shipVelocityX = tileSize;

    const [ship, setShip] = useState(new Block(shipX, shipY, shipWidth, shipHeight, shipImg));

    //aliens
    const alienWidth = tileSize * 2;
    const alienHeight = tileSize;
    const alienX = tileSize;
    const alienY = tileSize;

    const alienRows = 2;
    const alienColumns = 3;
    let alienCount = 0; //number of aliens to defeat
    let alienVelocityX = 3; //alien moving speed

    //bullets
    const bulletWidth = tileSize / 8;
    const bulletHeight = tileSize / 2;
    const bulletVelocityY = -10; //bullet moving speed

    useEffect(() => {
        const loadImages = () => {
            const shipImage = new Image();
            shipImage.src = './ship.png';
            const alienImage = new Image();
            alienImage.src = './alien.png';
            const alienCyanImage = new Image();
            alienCyanImage.src = './alien-cyan.png';
            const alienMagentaImage = new Image();
            alienMagentaImage.src = './alien-magenta.png';
            const alienYellowImage = new Image();
            alienYellowImage.src = './alien-yellow.png';

            setShipImg(shipImage);
            setAlienImgArray([alienImage, alienCyanImage, alienMagentaImage, alienYellowImage]);
        };

        loadImages();
    }, []);

    const createAliens = () => {
        const newAliens = [];
        for (let r = 0; r < alienRows; r++) {
            for (let c = 0; c < alienColumns; c++) {
                const randomImgIndex = Math.floor(Math.random() * alienImgArray.length);
                const alien = new Block(
                    alienX + c * alienWidth,
                    alienY + r * alienWidth,
                    alienWidth,
                    alienHeight,
                    alienImgArray[randomImgIndex]
                );
                newAliens.push(alien);
            }
        }
        alienCount = newAliens.length;
        setAlienArray(newAliens);
    };

    const detectCollision = (a, b) => {
        return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height;
    };

    const move = () => {
        const newAliens = [...alienArray];
        //aliens
        newAliens.forEach(alien => {
            if (alien.alive) {
                alien.x += alienVelocityX;

                // if alien touches the borders
                if (alien.x + alien.width >= boardWidth || alien.x <= 0) {
                    alienVelocityX *= -1.1;
                    alien.x += alienVelocityX * 2;

                    //move aliens down by one row
                    newAliens.forEach(a => {
                        a.y += alienHeight;
                    });
                }

                if (alien.y >= ship.y) {
                    setGameOver(true);
                }
            }
        });

        //bullet
        const newBullets = [...bulletArray];
        newBullets.forEach(bullet => {
            bullet.y += bulletVelocityY;

            //bullet collision with aliens
            newAliens.forEach(alien => {
                if (!bullet.used && alien.alive && detectCollision(bullet, alien)) {
                    bullet.used = true;
                    alien.alive = false;
                    alienCount--;
                    setScore(prevScore => prevScore + 100);
                }
            });
        });

        setBulletArray(newBullets.filter(bullet => !bullet.used && bullet.y >= 0));

        //next level
        if (alienCount === 0) {
            setScore(prevScore => prevScore + alienColumns * alienRows * 100);
            alienColumns = Math.min(alienColumns + 1, columns / 2 - 2); //cap column at 16/2 -2 = 6
            alienRows = Math.min(alienRows + 1, rows - 6); //  cap row at 16-6 = 10
            setAlienArray([]);
            setBulletArray([]);
            alienVelocityX = 3;
            createAliens();
        }
    };

    const draw = (ctx) => {
        // ship
        ctx.drawImage(ship.img, ship.x, ship.y, ship.width, ship.height);

        //aliens
        alienArray.forEach(alien => {
            if (alien.alive) {
                ctx.drawImage(alien.img, alien.x, alien.y, alien.width, alien.height);
            }
        });

        //bullets
        ctx.fillStyle = 'white';
        bulletArray.forEach(bullet => {
            if (!bullet.used) {
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            }
        });

        //score
        ctx.fillStyle = 'white';
        ctx.font = '32px Arial';
        ctx.fillText(gameOver ? `Game Over: ${score}` : `${score}`, 10, 35);
    };

    const gameLoop = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, boardWidth, boardHeight);
        draw(ctx);
        move();
        if (!gameOver) {
            requestAnimationFrame(gameLoop);
        }
    };

    useEffect(() => {
        if (shipImg) {
            setShip(new Block(shipX, shipY, shipWidth, shipHeight, shipImg));
            createAliens();
            gameLoop();
        }
    }, [shipImg]);

    const handleKeyDown = (e) => {
        if (gameOver) {
            setShip(new Block(shipX, shipY, shipWidth, shipHeight, shipImg));
            setAlienArray([]);
            setBulletArray([]);
            setScore(0);
            alienVelocityX = 3;
            alienColumns = 3;
            alienRows = 2;
            setGameOver(false);
            createAliens();
            gameLoop();
        }
        if (e.key === 'ArrowLeft' && ship.x - shipVelocityX >= 0) {
            ship.x -= shipVelocityX; // move left one tile
        } else if (e.key === 'ArrowRight' && ship.x + ship.width + shipVelocityX <= boardWidth) {
            ship.x += shipVelocityX; // move right one tile
        } else if (e.key === ' ') {
            const bullet = new Block(ship.x + shipWidth * 15 / 32, ship.y, bulletWidth, bulletHeight, null);
            setBulletArray(prev => [...prev, bullet]);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [gameOver, ship]);

    return (
        <canvas ref={canvasRef} width={boardWidth} height={boardHeight} style={{ backgroundColor: 'black' }} />
    );
};

export default SpaceInvaders;

