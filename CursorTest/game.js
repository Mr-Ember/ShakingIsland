const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// 马里奥对象
const mario = {
    x: 50,
    y: 500,
    width: 50,
    height: 50,
    speed: 5,
    jumpForce: 15,
    velocityY: 0,
    isJumping: false
};

// 地面
const ground = {
    y: 550,
    height: 50
};

// 游戏循环
function gameLoop() {
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制地面
    ctx.fillStyle = 'green';
    ctx.fillRect(0, ground.y, canvas.width, ground.height);

    // 绘制马里奥
    ctx.fillStyle = 'red';
    ctx.fillRect(mario.x, mario.y, mario.width, mario.height);

    // 应用重力
    mario.velocityY += 0.8;
    mario.y += mario.velocityY;

    // 检测地面碰撞
    if (mario.y + mario.height > ground.y) {
        mario.y = ground.y - mario.height;
        mario.velocityY = 0;
        mario.isJumping = false;
    }

    requestAnimationFrame(gameLoop);
}

// 键盘控制
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            mario.x -= mario.speed;
            break;
        case 'ArrowRight':
            mario.x += mario.speed;
            break;
        case 'ArrowUp':
            if (!mario.isJumping) {
                mario.velocityY = -mario.jumpForce;
                mario.isJumping = true;
            }
            break;
    }
});

// 开始游戏循环
gameLoop();
