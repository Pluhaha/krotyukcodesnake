const 
	cvs = document.getElementById("canv"),
	ctx = cvs.getContext("2d");

cvs.width = 600;
cvs.height = 650;

function drawGround() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 600, 600);
	ctx.strokeStyle = "gray";
	ctx.beginPath();
	ctx.moveTo(0, 50);
	ctx.lineTo(600, 50);
	ctx.moveTo(0, 100);
	ctx.lineTo(600, 100);
	ctx.moveTo(0, 150);
	ctx.lineTo(600, 150);
	ctx.moveTo(0, 200);
	ctx.lineTo(600, 200);
	ctx.moveTo(0, 250);
	ctx.lineTo(600, 250);
	ctx.moveTo(0, 300);
	ctx.lineTo(600, 300);
	ctx.moveTo(0, 350);
	ctx.lineTo(600, 350);
	ctx.moveTo(0, 400);
	ctx.lineTo(600, 400);
	ctx.moveTo(0, 450);
	ctx.lineTo(600, 450);
	ctx.moveTo(0, 500);
	ctx.lineTo(600, 500);
	ctx.moveTo(0, 550);
	ctx.lineTo(600, 550);
	ctx.moveTo(0, 600);
	ctx.lineTo(600, 600);
	ctx.moveTo(50, 0);
	ctx.lineTo(50, 600);
	ctx.moveTo(100, 0);
	ctx.lineTo(100, 600);
	ctx.moveTo(150, 0);
	ctx.lineTo(150, 600);
	ctx.moveTo(200, 0);
	ctx.lineTo(200, 600);
	ctx.moveTo(250, 0);
	ctx.lineTo(250, 600);
	ctx.moveTo(300, 0);
	ctx.lineTo(300, 600);
	ctx.moveTo(350, 0);
	ctx.lineTo(350, 600);
	ctx.moveTo(400, 0);
	ctx.lineTo(400, 600);
	ctx.moveTo(450, 0);
	ctx.lineTo(450, 600);
	ctx.moveTo(500, 0);
	ctx.lineTo(500, 600);
	ctx.moveTo(550, 0);
	ctx.lineTo(550, 600);
	ctx.moveTo(600, 0);
	ctx.lineTo(600, 600);
	ctx.stroke();
}

let
	size = 50,
	score = 0,
	coords = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550];

// apple
let apple = {
	x: coords[Math.floor(Math.random()*coords.length)],
	y: coords[Math.floor(Math.random()*coords.length)]
};

// snake
let snake = [];
snake[0] = {
	x: coords[Math.floor(Math.random()*coords.length)],
	y: coords[Math.floor(Math.random()*coords.length)]
};

let dir;

document.addEventListener("keydown", function(e) {
	if(e.keyCode == 87 && dir != "down") dir = "up";
	else if(e.keyCode == 65 && dir != "right") dir = "left";
	else if(e.keyCode == 83 && dir != "up") dir = "down";
	else if(e.keyCode == 68 && dir != "left") dir = "right";
	else if(e.keyCode == 37 && dir != "right") dir = "left";
	else if(e.keyCode == 38 && dir != "down") dir = "up";
	else if(e.keyCode == 39 && dir != "left") dir = "right";
	else if(e.keyCode == 40 && dir != "up") dir = "down";
});

function eatTail(head, arr) {
	for(let i = 0; i < arr.length; i++) {
		if(head.x == arr[i].x && head.y == arr[i].y) {
			clearInterval(game);
			alert("Game Over");
			location.reload();	
		}
	}
}

function draw() {
	drawGround();

	ctx.fillStyle = "red";
	ctx.fillRect(apple.x, apple.y, size, size);

	for(let i = 0; i < snake.length; i++) {
		ctx.fillStyle = i == 0 ? "green" : "gray";
		ctx.fillRect(snake[i].x, snake[i].y, size, size);
	}

	ctx.fillStyle = "white";
	ctx.fillRect(0, 600, 600, 50);
	ctx.fillStyle = "black";
	ctx.font = "35px Arial";
	ctx.fillText(`Your score: ${score}`, 0, 630);

	let
		snakeX = snake[0].x,
		snakeY = snake[0].y;

	// game over
	if(snakeX < 0 || snakeX > 600 || snakeY < 0 || snakeY > 600) {
		clearInterval(game);
		alert("Game Over");
		location.reload();
	}

	switch(dir) {
		case "left":
			snakeX -= size;
			break;
		case "right":
			snakeX += size;
			break;
		case "up":
			snakeY -= size;
			break;
		case "down":
			snakeY += size;
			break;
	}

	if(snakeX == apple.x && snakeY == apple.y) {
		score++;
		apple = {
			x: coords[Math.floor(Math.random()*coords.length)],
			y: coords[Math.floor(Math.random()*coords.length)]
		};
	} else {
		snake.pop();
	}

	let newHead = {
		x: snakeX,
		y: snakeY
	};

	eatTail(newHead, snake);

	snake.unshift(newHead);
}

// fps
let game = setInterval(draw, 150);