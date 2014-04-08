function $(str) {
	return document.getElementById(str);
}

function $tag(str, target) {
	target = target || document;
	return target.getElementsByTagName(str);
}

var WIDTH = 20, HEIGHT = 20, SAY = ["hi..."];
var len = 3, speed, gridElems = multiArray(WIDTH, HEIGHT), carrier, snake, info, btnStart, topScore = len, snakeTimer, brakeTimers = [], skateTimers = [], directkey;

window.onload = function() {
	info = $("say");
	btnStart = $("btnStart");
	initGrid();
	document.onkeydown = attachEvents;
	btnStart.onclick = function(e) {
		btnStart.blur();
		start();
		btnStart.setAttribute("disabled", true);
		btnStart.style.color = "#aaa";
	};
};

function start() {
	len = 1;
	speed = 10;
	directkey = 39;
	carrier = multiArray(WIDTH, HEIGHT);
	snake = new Array();
	clear();
	initSnake();
	walk();
}

function initGrid() {
	var body = $tag("body")[0];
	var table = document.createElement("table"), tbody = document.createElement("tbody")
	for (var j = 0; j < HEIGHT; j++) {
		var col = document.createElement("tr");
		for (var i = 0; i < WIDTH; i++) {
			var row = document.createElement("td");
			gridElems[i][j] = col.appendChild(row);
		}
		tbody.appendChild(col);
	}
	table.appendChild(tbody);
	$("snakeWrap").appendChild(table);
}

function initSnake() {
	var pointer = randomPointer(len - 1, len - 1, WIDTH / 2);
	for (var i = 0; i < len; i++) {
		var x = pointer[0] - i, y = pointer[1];
		snake.push([x, y]);
		carrier[x][y] = "cover";
	}
}

function attachEvents(e) {
	e = e || event;
	directkey = Math.abs(e.keyCode - directkey) != 2 && e.keyCode > 36 && e.keyCode < 41 ? e.keyCode : directkey;
	return false;
}

function walk() {
	if (snakeTimer)
		window.clearInterval(snakeTimer);
	snakeTimer = window.setInterval(step, Math.floor(3000 / speed));
}

function step() {
	var headX = snake[0][0], headY = snake[0][1];
	switch(directkey) {
		case 37:
			headX -= 1;
			break;
		case 38:
			headY -= 1;
			break;
		case 39:
			headX += 1;
			break;
		case 40:
			headY += 1;
			break;
	}
	if (headX >= WIDTH || headX < 0 || headY >= HEIGHT || headY < 0) {
		if (headX >= WIDTH) {
			headX = 0;
		}
		else if (headX < 0) {
			headX = WIDTH;
		}
		else if (headY >= HEIGHT) {
			headY = 0;
		}
		else if (headY < 0) {
			headY = HEIGHT;
		}
		else{
			
		}
	}

	if (carrier[headX][headY] == "block" || carrier[headX][headY] == "cover") {
		btnStart.removeAttribute("disabled");
		btnStart.style.color = "#000";
		window.clearInterval(snakeTimer);
		for (var i = 0; i < brakeTimers.length; i++)
			window.clearTimeout(brakeTimers[i]);
		for (var i = 0; i < skateTimers.length; i++)
			window.clearTimeout(skateTimers[i]);
		return;
	}

	if (len % 4 == 0 && speed < 60 && carrier[headX][headY] == "food") {
		speed += 5;
		walk();

	}

	if (carrier[headX][headY] == "brake") {
		speed = 5;
		walk();
	}

	if (carrier[headX][headY] == "skate") {
		speed += 20;
		walk();
	}

	if (len <= 40 && len % 10 == 0) {
		var cheer = SAY[len / 10 - 1];
	}

	var lastX = snake[snake.length-1][0], lastY = snake[snake.length-1][1];
	carrier[lastX][lastY] = false;
	gridElems[lastX][lastY].className = "";
	snake.pop();

	snake.unshift([headX, headY]);
	carrier[headX][headY] = "cover";
	gridElems[headX][headY].className = "cover";

	len = snake.length;
}

function getText(target) {
	if (document.all)
		return target.innerText;
	else
		return target.textContent;
}

function multiArray(m, n) {
	var arr = new Array(n);
	for (var i = 0; i < m; i++)
		arr[i] = new Array(m);
	return arr;
}

function clear() {
	for (var y = 0; y < gridElems.length; y++) {
		for (var x = 0; x < gridElems[y].length; x++) {
			gridElems[x][y].className = "";
		}
	}
}

function randomPointer(startX, startY, endX, endY) {
	startX = startX || 0;
	startY = startY || 0;
	endX = endX || WIDTH;
	endY = endY || HEIGHT;
	var p = [], x = Math.floor(Math.random() * (endX - startX)) + startX, y = Math.floor(Math.random() * (endY - startY)) + startY;
	if (carrier[x][y])
		return randomPointer(startX, startY, endX, endY);
	p[0] = x;
	p[1] = y;
	return p;
}

function randowNum(start, end) {
	return Math.floor(Math.random() * (end - start)) + start;
}
