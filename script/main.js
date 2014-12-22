var position = [500, 460];
var vx = 0, vy = 0;
var xTracker = 0;
var running = false;
var runcount = 0;

var game, ctx;
var bg = new Image();
bg.src = "images/game-bg2.jpg";
var background = new Background();

var clouds = [new Cloud(500, 100, .3),
              new Cloud(800, 100, .5)
             ];
var blocks = [new Block('dirt_block', 20, 20),
              new Block('moss_stone', 20, 20),
              new Block('stone_indoor', 20, 20)
             ];
var buildings = [new Building('big_mossy_building1', 20, 20)];


function init() {
    game = document.getElementById('camera');
    ctx = game.getContext('2d');

    window.setInterval(animate, 25);
}

function keyHandler(event) {
    var key = event.keyCode;
    if(key == 68) {  // W
        vx = -3;
        running = true;
    } else if(key == 65) { // A
        vx = 3;
        running = true;
    }
}

function keyUp(event) {
    var key = event.keyCode;
    if(key == 68) {
        vx = 0;
        running = false;
    } else if(key == 65) {
        vx = 0;
        running = false;
    }
}

function run() {
    var img = new Image();
    img.src = "images/running_sprite.png"
    if(running) {
        switch(runcount) {
            case 0:
                ctx.drawImage(img, 40, 0, 20, 40, 500, 420, 20, 40);
                runcount = 1;
                break;
            case 1:
                ctx.drawImage(img, 61, 0, 20, 40, 500, 420, 20, 40);
                runcount = 0;
                break;

        }
    } else {
        ctx.drawImage(img, 0, 0, 20, 40, 500, 420, 20, 40);
    }
}

function Background() {
    this.x = -250;
    this.y = -500;
    this.h = bg.height;
    this.w = bg.width;

    this.render = function() {
        ctx.drawImage(bg, this.x, this.y-= .03);
        if(this.y <= -1500) {
            this.y = 0;
        }
    }
    this.time = function(time) {
        switch(time) {
            case 'morning':
                this.y =  -910;
                break;
            case 'day':
                this.y = -1200;
                break;
            case 'evening':
                this.y = 0;
                break;
            case 'night':
                this.y = -500;
                break;
        }
    }
}

function Cloud(x, y, vx) {
    this.x = x;
    this.y = y;

    this.render = function() {
        ctx.beginPath();
        if(background.y < -280 && background.y > -1000) {
            ctx.fillStyle = "gray";
        } else {
            ctx.fillStyle = "white";
        }
        ctx.ellipse(this.x - 80, this.y, 40, 25, 0, 0, 2*Math.PI);
        ctx.ellipse(this.x + 80, this.y, 40, 25, 0, 0, 2*Math.PI);
        ctx.ellipse(this.x-= vx, this.y, 80, 40, 0, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
        if(this.x + 155 <= 0) {
            this.x = 1130;
        }
    }
}

function Block(type, w, h) {
    var img = new Image();
    this.type = type;
    this.w = w;
    this.h = h;

    this.render = function(x, y) {
        this.x = x;
        this.y = y;
        switch(this.type) {
            case 'dirt_block':
                img.src = "images/dirt_block1.jpg";
                img.width = this.w;
                img.height = this.h;
                break;
            case 'moss_stone':
                img.src = "images/mossy_stone.jpg";
                img.width = this.w;
                img.height = this.h;
                break;
            case 'stone_indoor':
                img.src = "images/stone_indoor.jpg";
                img.width = this.w;
                img.height = this.h;
                break;
        }
        ctx.drawImage(img, this.x, this.y);
    }

}

function Building(type, w, h) {
    var img = new Image();
    var img2 = new Image();
    this.w = w;
    this.h = h;

    this.render = function(x, y) {
        this.x = position[0] + xTracker + x;
        this.y = position[1] + y;
        switch(type) {
            case 'big_mossy_building1':
                img.width = this.w;
                img.height = this.h;
                img.src = 'images/mossy_stone.jpg';
                for(var i = 0; i < 100; i += 20) {
                    ctx.drawImage(img, this.x, 440 - i);
                    ctx.drawImage(img, this.x + 80, 440 - i);
                    ctx.drawImage(img, this.x + i, 360);
                }
                
                img2.width = this.w;
                img2.height = this.h;
                img2.src = "images/stone_indoor.jpg";
                for(var i = 0; i < 80; i += 20) {
                    ctx.drawImage(img2, this.x + 20, 440 - i);
                    ctx.drawImage(img2, this.x + 40, 440 - i);
                    ctx.drawImage(img2, this.x + 60, 440 - i);
                }
                break;
        }
    }

}

function animate() {
    position[0] += vx;
    position[1] += vy;
    xTracker += vx;

    ctx.clearRect(0, 0, 1000, 500);
    background.render();
    for(var i = 0; i < clouds.length; i++) {
        clouds[i].render();
    }
    for(var i = 0; i < 1000; i+= 10) {
        blocks[0].render(i, 480);
        blocks[0].render(i, 460);
    }
    
    buildings[0].render(0, 100);
    run();
}