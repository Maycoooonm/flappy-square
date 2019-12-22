let player;
let blocks = [];
let currIdx = 0;
let points = 0;
// para passar 4x maior que o player
function setup() {
	createCanvas(500, 500);
	background(100);
	textSize(32);
	player = new Player(100, 250);
	blocks[0] = new Block(250, 3);
	
	setInterval(function() {
		currIdx++;
		if(currIdx > 2) currIdx = 0;
		blocks[currIdx] = new Block(floor(random(100, 400)), 3);
	}, 1000)
}

function draw() {
	background(100);
	text(`Pontos: ${points}`, 10, 30);
	player.draw();
	player.applyGravity();	
	console.log(points)
	blocks.forEach(b => {
		b.draw();
		b.update();
		text(`Pontos: ${points}`, 10, 30);
		if(player.checkPass(b)) points++;
		if(player.loss(b)) gameReset(player, blocks);
	})

}
function keyPressed() {
	if(keyCode == 38 || keyCode == 32) player.jump();
}
function gameReset(player, blocks) {
	background(100);
	points = 0;
	player.reset();
	blocks = blocks.splice(0, blocks.length);
	blocks[0] = new Block(250, 3);
	
}
class Player {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.speed = 0;
	}
	applyGravity() {
		if(this.speed < 10) this.speed += 0.25;
		this.y += this.speed
	}
	jump() {
		this.speed = -5;
	}
	draw() {
		rect(this.x, this.y, 20, 20);
	}
	reset() {
		this.y = 250;
		this.speed = 0;
	}
	checkPass(block) {
		if(this.x > block.x+40 && this.x < block.x+45) return true;
	}
	loss(block) {
		if(this.x+20 > block.x && this.x < block.x+40) {
			 if(this.y > block.sizeY-80 && this.y < block.sizeY) return false;
			return true;
		}
	}
}
class Block {
	constructor(sizeY, speed) {
		this.sizeY = sizeY;		// tamanho bloco de baixo
		this.x = 495;
		this.speed = speed;
	}
	draw() {
		strokeWeight(4);

		rect(this.x, this.sizeY, 40, 500);
		rect(this.x, 0, 40, this.sizeY-80);
	}
	update() {
		this.x -= this.speed;
	}
}