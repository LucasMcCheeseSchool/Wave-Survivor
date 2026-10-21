const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const keys = {};

window.addEventListener("keydown", e => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", e => {
    keys[e.key.toLowerCase()] = false;
});

const player = {
    x: 400,
    y: 300,
    width: 16,
    height: 24,
    speed: 4,
    hp: 100,
    maxHp: 100
};

function update() {

    if(keys["w"]) player.y -= player.speed;
    if(keys["s"]) player.y += player.speed;
    if(keys["a"]) player.x -= player.speed;
    if(keys["d"]) player.x += player.speed;

    player.x = Math.max(
        20,
        Math.min(canvas.width - 20, player.x)
    );

    player.y = Math.max(
        20,
        Math.min(canvas.height - 20, player.y)
    );
}

function drawBackground() {

    ctx.fillStyle = "#2e3b24";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    for(let i = 0; i < 300; i++) {

        const x = (i * 57) % canvas.width;
        const y = (i * 91) % canvas.height;

        ctx.fillStyle = "#37492b";

        ctx.fillRect(
            x,
            y,
            2,
            2
        );
    }
}

function drawPlayer() {

    // body
    ctx.fillStyle = "#5b3a1e";

    ctx.fillRect(
        player.x - 8,
        player.y - 8,
        16,
        18
    );

    // hood
    ctx.fillStyle = "#7a1f1f";

    ctx.fillRect(
        player.x - 8,
        player.y - 18,
        16,
        10
    );

    // face
    ctx.fillStyle = "#d8c19a";

    ctx.fillRect(
        player.x - 4,
        player.y - 12,
        8,
        8
    );
}

function drawHUD() {

    ctx.fillStyle = "black";
    ctx.fillRect(20,20,204,24);

    ctx.fillStyle = "red";
    ctx.fillRect(
        22,
        22,
        (player.hp / player.maxHp) * 200,
        20
    );

    ctx.strokeStyle = "white";
    ctx.strokeRect(
        20,
        20,
        204,
        24
    );
}

function draw() {

    drawBackground();
    drawPlayer();
    drawHUD();
}

function loop() {

    update();
    draw();

    requestAnimationFrame(loop);
}

loop();
