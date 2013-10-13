var images = {};  
var entities = [];
var canvas, ctx;
var player;

var MISSILE_SPEED = 3;

function loadImages(directory, fileNames, onComplete) {
    var imagesLeft = fileNames.length;
    
    fileNames.forEach(function(fileName) {
        var img = new Image();
        img.onload = function() {
            imagesLeft--;
            if (imagesLeft <= 0) 
                onComplete();
        };
        img.src = directory + '/' + fileName;
        
        // z "player.png" uzyskamy "player", za pomoca funkcji substring
        var entityName = fileName.substring(0, fileName.lastIndexOf('.')); 
        
        images[entityName] = img;       
    });
};

var EntityPrototype = {
    draw: function(context) {
        context.drawImage(this.img, this.x, this.y);
    },    
    move: function() {
        this.x += this.vx;
        this.y += this.vy;        
    },
    x: 0, y:0, vx:0, vy:0
};

function createEntity(entityName, properties) {
    var entity = Object.create(EntityPrototype);   
    entity.img = images[entityName];

    for (var propertyName in properties) 
        entity[propertyName] = properties[propertyName];
        
    entities.push(entity);
    return entity;
};
 
function initialize() {
    initCanvas();
    console.log('initialize()');
    console.log(images['player']);
    console.log(images['ufo']);    

    player = createEntity('player', {x:300,y:280, speed:4});
    player.input = function(key) {
        switch(key){ 
            case 'left': this.x -= this.speed; break;
            case 'right': this.x += this.speed; break;
            case 'up': this.y -= this.speed; break;
            case 'down': this.y += this.speed; break;            
            case 'fire': 
                var missile = createEntity('missile', {}); 
                missile.x = this.x + this.img.width / 2 - missile.img.width / 2;
                missile.y = this.y - missile.img.height;                
                missile.vy = -MISSILE_SPEED;
                break;

        }
    }

    createEntity('ufo', {x:0, y:20, vx:1, vy:0.1})
    createEntity('ufo', {x:120, y:80, vx:1.1, vy:0})    
    createEntity('ufo', {x:40, y:130, vx:1.05, vy:0})

    setInterval(gameLoop, 1000/60);
};

function gameLoop() {
    ctx.clearRect(0,0,canvas.width, canvas.height);

    entities.forEach(function (entity) {
        entity.move();
    });

    entities.forEach(function (entity) {
        entity.draw(ctx);
    });
    
}

function initCanvas() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
};
 
 
$(document).ready(function() {
    loadImages('images', ['player.png', 'ufo.png', 'missile.png'], initialize);    
    $(document).keydown(function(e) {
        var key = {37: 'left', 38: 'up', 39:'right', 40:'down', 32:'fire'}[e.keyCode];
        player.input(key)
    })
});
