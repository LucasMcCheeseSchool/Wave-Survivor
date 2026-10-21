const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();

window.addEventListener("resize", resize);

const mouse = {
    x: 0,
    y: 0
};

window.addEventListener("mousemove", (e)=>{
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

const keys = {};

window.addEventListener("keydown",(e)=>{
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup",(e)=>{
    keys[e.key.toLowerCase()] = false;
});

const player = {
    x: canvas.width/2,
    y: canvas.height/2,
    size: 24,
    speed: 5
};

function update(){

    if(keys["w"]){
        player.y -= player.speed;
    }

    if(keys["s"]){
        player.y += player.speed;
    }

    if(keys["a"]){
        player.x -= player.speed;
    }

    if(keys["d"]){
        player.x += player.speed;
    }

    player.x = Math.max(
        player.size,
        Math.min(canvas.width-player.size, player.x)
    );

    player.y = Math.max(
        player.size,
        Math.min(canvas.height-player.size, player.y)
    );
}

function drawBackground(){

    ctx.fillStyle = "#050505";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle = "#101010";

    for(let x=0;x<canvas.width;x+=50){
        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x,canvas.height);
        ctx.stroke();
    }

    for(let y=0;y<canvas.height;y+=50){
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(canvas.width,y);
        ctx.stroke();
    }
}

function drawPlayer(){

    const angle = Math.atan2(
        mouse.y-player.y,
        mouse.x-player.x
    );

    ctx.save();

    ctx.translate(player.x, player.y);
    ctx.rotate(angle);

    ctx.shadowColor = "#00ff99";
    ctx.shadowBlur = 20;

    ctx.fillStyle = "#00ff99";

    ctx.beginPath();

    ctx.moveTo(24,0);
    ctx.lineTo(-18,-14);
    ctx.lineTo(-10,0);
    ctx.lineTo(-18,14);

    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

function draw(){

    drawBackground();
    drawPlayer();
}

function gameLoop(){

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();
