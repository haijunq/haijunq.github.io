
var c = undefined; 
var ctx = undefined;

$(document).ready(function() {
	c = document.getElementById("canvas");
	ctx = c.getContext("2d");
	drawTriangle(50,400,1100,400,600,50);
});


/*
 * Draw a triangle. 
 * By Haijun
 */
function drawTriangle(x0, y0, x1, y1, x2, y2) {
	var stage = new createjs.Stage("canvas");
	var triangle = new createjs.Shape();
	triangle.graphics.beginStroke("black");
	triangle.graphics.moveTo(x0,y0).lineTo(x1,y1).lineTo(x2,y2).lineTo(x0,y0);
	triangle.graphics.endStroke("black");
	stage.addChild(triangle);
	stage.update();
}

